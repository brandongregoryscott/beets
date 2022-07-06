import type { Project } from "generated/interfaces/project";
import { List, Map } from "immutable";
import type { ToneState } from "interfaces/tone-state";
import type { ToneStepGroup } from "interfaces/tone-step-group";
import type { ToneTrack } from "interfaces/tone-track";
import { isEmpty, pick } from "lodash";
import type { FileRecord } from "models/file-record";
import type { InstrumentRecord } from "models/instrument-record";
import type { TrackRecord } from "models/track-record";
import type { TrackSectionRecord } from "models/track-section-record";
import type { TrackSectionStepRecord } from "models/track-section-step-record";
import { useCallback, useEffect, useRef, useState } from "react";
import * as Tone from "tone";
import { intersectionWith } from "utils/collection-utils";
import { getFileById, toInstrumentMap, toSequencerMap } from "utils/file-utils";
import { useToneBpmEffect } from "utils/hooks/use-tone-bpm-effect";
import { useTonePlayingEffect } from "utils/hooks/use-tone-playing-effect";
import { useToneSwingEffect } from "utils/hooks/use-tone-swing-effect";
import { useToneVolumeEffect } from "utils/hooks/use-tone-volume-effect";
import {
    toInstrumentStepTypes,
    toSequencerStepTypes,
} from "utils/track-section-step-utils";
import type { OpusMediaRecorderWorkerOptions } from "opus-media-recorder";
import MediaRecorder from "opus-media-recorder";
import type OpusMediaRecorder from "opus-media-recorder";
import { toaster } from "evergreen-ui";
import { env } from "utils/env";
import { useWillUnmount } from "rooks";
import { isEqual } from "utils/core-utils";
import type { MidiNote } from "types/midi-note";

interface UseToneAudioOptions
    extends Pick<ToneState, "isPlaying" | "isRecording" | "subdivision">,
        Partial<Pick<Project, "bpm" | "swing" | "volume">> {
    endIndex?: number;
    files?: List<FileRecord>;
    instruments?: List<InstrumentRecord>;
    lengthInMs?: number;
    loop?: boolean;
    mimeType?: string;
    onRecordingComplete?: (recording: Blob) => void;
    startIndex?: number;
    tracks?: List<TrackRecord>;
    trackSections?: List<TrackSectionRecord>;
    trackSectionSteps?: List<TrackSectionStepRecord>;
}

interface UseToneAudioResult {
    /**
     * Disposes all tracks/channels/etc. Useful if audio needs to be manually cut off
     */
    dispose: () => void;
    isLoading: boolean;
}

const opusMediaRecorderPath = `${env.PUBLIC_URL}/opus-media-recorder`;
const workerOptions: OpusMediaRecorderWorkerOptions = {
    encoderWorkerFactory: () =>
        new Worker(`${opusMediaRecorderPath}/encoderWorker.umd.js`),
    OggOpusEncoderWasmPath: `${opusMediaRecorderPath}/OggOpusEncoder.wasm`,
    WebMOpusEncoderWasmPath: `${opusMediaRecorderPath}/WebMOpusEncoder.wasm`,
};

const useToneAudio = (options: UseToneAudioOptions): UseToneAudioResult => {
    const {
        bpm,
        swing,
        volume,
        lengthInMs,
        loop = true,
        startIndex,
        endIndex,
        isPlaying = false,
        isRecording = false,
        mimeType,
        onRecordingComplete,
        subdivision = "8n",
        tracks = List<TrackRecord>(),
        trackSections = List<TrackSectionRecord>(),
        trackSectionSteps = List<TrackSectionStepRecord>(),
        files = List<FileRecord>(),
        instruments = List<InstrumentRecord>(),
    } = options;
    const [loadingState, setLoadingState] = useState<Map<string, boolean>>(
        Map()
    );
    const recorderRef = useRef<OpusMediaRecorder>();
    const recordingIdRef = useRef<NodeJS.Timeout>();
    const toneTracksRef = useRef<Map<string, ToneTrack>>(Map());

    useToneSwingEffect(swing);
    useToneBpmEffect(bpm);
    useToneVolumeEffect(volume);

    useEffect(() => {
        let updatedToneTracks: Map<string, ToneTrack> = Map();

        tracks.forEach((track: TrackRecord) => {
            const trackSectionsForTrack = trackSections.filter(
                (trackSection: TrackSectionRecord) =>
                    trackSection.track_id === track.id
            );

            const trackSectionStepsForTrack = intersectionWith(
                trackSectionSteps,
                trackSectionsForTrack,
                (trackSectionStep, trackSection) =>
                    trackSectionStep.track_section_id === trackSection.id
            );
            const instrument = instruments.find(
                (instrument) => instrument.id === track.instrument_id
            );

            let steps = track.isSequencer()
                ? toSequencerStepTypes(
                      trackSectionsForTrack,
                      trackSectionStepsForTrack,
                      files
                  )
                : toInstrumentStepTypes(
                      trackSectionsForTrack,
                      trackSectionStepsForTrack,
                      instrument
                  );

            if (startIndex != null) {
                steps = steps.slice(
                    startIndex,
                    endIndex != null ? endIndex + 1 : undefined
                );
            }

            // Only map up samples that this specific Track uses to prevent collisions
            const sequencerFiles = intersectionWith(
                files,
                trackSectionStepsForTrack,
                (file, trackSectionStep) => file.id === trackSectionStep.file_id
            );

            const sampleMap = track.isSequencer()
                ? toSequencerMap(sequencerFiles)
                : toInstrumentMap(getFileById(instrument?.file_id, files));

            // If there's no samples to play yet, don't bother initializing a track etc.
            if (isEmpty(sampleMap)) {
                return;
            }

            const toneTrack = toneTracksRef.current.get<ToneTrack | undefined>(
                track.id,
                undefined
            );

            const channel = toneTrack?.channel ?? new Tone.Channel();
            channel.set(pick(track, "volume", "pan", "mute", "solo"));

            const sampler =
                toneTrack?.sampler ??
                new Tone.Sampler(sampleMap, () => {
                    setLoadingState((prev) => prev.set(track.id, false));
                }).chain(channel, Tone.Destination);

            sampler.set({
                curve: instrument?.curve,
                release: instrument?.release,
            });

            const sampleMapIsDirty =
                toneTrack != null && !isEqual(sampleMap, toneTrack.sampleMap);
            if (sampleMapIsDirty) {
                Object.entries(sampleMap).forEach(([note, value]) => {
                    sampler.add(note as MidiNote, value);
                });
            }

            const isLoading = toneTrack?.sampler == null;
            if (isLoading) {
                setLoadingState((prev) => prev.set(track.id, true));
            }

            const sequence =
                toneTrack?.sequence ??
                new Tone.Sequence(
                    (time: number, stepGroup: ToneStepGroup) => {
                        stepGroup.steps.forEach((step) => {
                            try {
                                sampler.triggerAttackRelease(
                                    step.note,
                                    step.duration ?? 0.5,
                                    time
                                );
                            } catch (error) {
                                console.error(
                                    error instanceof Error
                                        ? error.message
                                        : `Failed to play ${step.note} for Track ${track.id}`,
                                    error
                                );
                            }
                        });
                    },
                    steps,
                    subdivision
                );

            sequence.events = steps;
            sequence.loop = loop;

            const updatedToneTrack: ToneTrack = {
                sampleMap,
                channel,
                sampler,
                sequence,
            };

            updatedToneTracks = updatedToneTracks.set(
                track.id,
                updatedToneTrack
            );
        });

        toneTracksRef.current = updatedToneTracks;
    }, [
        endIndex,
        files,
        instruments,
        loop,
        startIndex,
        subdivision,
        trackSectionSteps,
        trackSections,
        tracks,
    ]);

    useTonePlayingEffect(isPlaying);

    useEffect(() => {
        updateTracks({ isPlaying }, toneTracksRef.current);
    }, [isPlaying]);

    useEffect(() => {
        if (isRecording) {
            const streamDestination =
                Tone.getContext().createMediaStreamDestination();
            Tone.getDestination().connect(streamDestination);
            recorderRef.current = new MediaRecorder(
                streamDestination.stream,
                { mimeType },
                workerOptions
            );

            recorderRef.current?.start();

            recorderRef.current.addEventListener("error", (event) => {
                toaster.danger("There was an error recording.");
                // eslint-disable-next-line no-console
                console.log("Recording error", event);
            });

            recorderRef.current?.addEventListener("dataavailable", (event) => {
                onRecordingComplete?.(event.data);
            });

            Tone.Transport.start();

            updateTracks(
                { isPlaying: true, loop: false },
                toneTracksRef.current
            );

            recordingIdRef.current = setTimeout(() => {
                recorderRef.current?.stop();
                Tone.Transport.stop();
            }, lengthInMs ?? 0);

            return;
        }

        if (recordingIdRef.current != null) {
            clearTimeout(recordingIdRef.current);
        }
        updateTracks({ isPlaying: false, loop: true }, toneTracksRef.current);
    }, [isRecording, lengthInMs, mimeType, onRecordingComplete]);

    const dispose = useCallback(() => {
        cleanupTracks(toneTracksRef.current);
        toneTracksRef.current = Map();
        Tone.Transport.stop();
    }, []);

    useWillUnmount(dispose);

    const isLoading = loadingState.some((loading) => loading);

    return {
        dispose,
        isLoading,
    };
};

const cleanupTracks = (tracks: Map<string, ToneTrack>): void => {
    tracks.forEach((toneTrack) => {
        const { channel, sampler, sequence } = toneTrack;
        channel.dispose();
        sampler.dispose();
        sequence.dispose();
    });
};

const updateTracks = (
    options: Pick<UseToneAudioOptions, "isPlaying" | "loop">,
    tracks: Map<string, ToneTrack>
): void => {
    const { loop, isPlaying } = options;
    tracks.forEach((toneTrack) => {
        if (loop != null) {
            toneTrack.sequence.loop = loop;
        }

        if (isPlaying === true) {
            toneTrack.sequence.start(0);
            return;
        }
        toneTrack.sequence.stop();
    });
};

export { useToneAudio };
