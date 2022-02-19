import { List, Map } from "immutable";
import { ToneState } from "interfaces/tone-state";
import { ToneStep } from "interfaces/tone-step";
import { ToneTrack } from "interfaces/tone-track";
import { pick } from "lodash";
import { FileRecord } from "models/file-record";
import { InstrumentRecord } from "models/instrument-record";
import { TrackRecord } from "models/track-record";
import { TrackSectionRecord } from "models/track-section-record";
import { TrackSectionStepRecord } from "models/track-section-step-record";
import { useEffect, useRef, useState } from "react";
import * as Tone from "tone";
import { intersectionWith } from "utils/collection-utils";
import { getFileById, toInstrumentMap, toSequencerMap } from "utils/file-utils";
import { useTonePlayingEffect } from "utils/hooks/use-tone-playing-effect";
import {
    toInstrumentStepTypes,
    toSequencerStepTypes,
} from "utils/track-section-step-utils";

interface UseToneAudioOptions
    extends Pick<ToneState, "isPlaying" | "subdivision"> {
    files?: List<FileRecord>;
    instruments?: List<InstrumentRecord>;
    trackSectionSteps?: List<TrackSectionStepRecord>;
    trackSections?: List<TrackSectionRecord>;
    tracks?: List<TrackRecord>;
}

interface UseToneAudioResult {
    isLoading: boolean;
}

const useToneAudio = (options: UseToneAudioOptions): UseToneAudioResult => {
    const {
        isPlaying = false,
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
    const toneTracksRef = useRef<Map<string, ToneTrack>>(Map());

    useEffect(() => {
        let updatedLoadingState: Map<string, boolean> = Map(loadingState);
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

            const steps = track.isSequencer()
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

            const sampleMap = track.isSequencer()
                ? toSequencerMap(files)
                : toInstrumentMap(getFileById(instrument?.file_id, files));

            const toneTrack = toneTracksRef.current.get<ToneTrack | undefined>(
                track.id,
                undefined
            );

            const channel = toneTrack?.channel ?? new Tone.Channel();
            channel.set(pick(track, "volume", "pan", "mute", "solo"));

            const sampler =
                toneTrack?.sampler ??
                new Tone.Sampler(sampleMap, () =>
                    setLoadingState((prev) => prev.set(track.id, false))
                ).chain(channel, Tone.Destination);

            const isLoading = toneTrack?.sampler == null;
            if (isLoading) {
                updatedLoadingState = updatedLoadingState.set(track.id, true);
            }

            const sequence =
                toneTrack?.sequence ??
                new Tone.Sequence(
                    (_time: number, step: ToneStep) => {
                        sampler.triggerAttackRelease(
                            step.note,
                            step.duration ?? 0.5
                        );
                    },
                    steps,
                    subdivision
                );

            sequence.events = steps;
            sequence.loop = true;

            const updatedToneTrack: ToneTrack = {
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
        setLoadingState(updatedLoadingState);
    }, [
        files,
        instruments,
        loadingState,
        subdivision,
        trackSectionSteps,
        trackSections,
        tracks,
    ]);

    useTonePlayingEffect(isPlaying);

    useEffect(() => {
        toneTracksRef.current.forEach((toneTrack) => {
            if (isPlaying) {
                toneTrack.sequence.start(0);
                return;
            }

            toneTrack.sequence.stop();
        });
    }, [isPlaying]);

    const isLoading = loadingState.some((loading) => loading);

    return {
        isLoading,
    };
};

export { useToneAudio };
