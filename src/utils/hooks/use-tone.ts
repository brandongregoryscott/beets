import { Project } from "generated/interfaces/project";
import { List, Map } from "immutable";
import { ToneState } from "interfaces/tone-state";
import { useAtom } from "jotai";
import { merge, pick } from "lodash";
import { FileRecord } from "models/file-record";
import { TrackRecord } from "models/track-record";
import { TrackSectionRecord } from "models/track-section-record";
import { useCallback, useEffect, useRef } from "react";
import { ToneStateAtom } from "utils/atoms/tone-state-atom";
import { useToneBpmEffect } from "utils/hooks/use-tone-bpm-effect";
import { useToneMuteEffect } from "utils/hooks/use-tone-mute-effect";
import { useTonePlayingEffect } from "utils/hooks/use-tone-playing-effect";
import { useToneSwingEffect } from "utils/hooks/use-tone-swing-effect";
import { useToneVolumeEffect } from "utils/hooks/use-tone-volume-effect";
import { useWorkstationState } from "utils/hooks/use-workstation-state";
import { intersectionWith } from "utils/collection-utils";
import {
    toInstrumentStepTypes,
    toSequencerStepTypes,
} from "utils/track-section-step-utils";
import { InstrumentRecord } from "models/instrument-record";
import * as Tone from "tone";
import { getFileById, toInstrumentMap, toSequencerMap } from "utils/file-utils";
import { ToneTrack } from "interfaces/tone-track";

interface UseToneOptions extends Pick<Project, "bpm" | "swing" | "volume"> {
    files?: List<FileRecord>;
    instruments?: List<InstrumentRecord>;
}

interface UseToneResult extends ToneState {
    setIsPlaying: (isPlaying: boolean) => void;
    setMute: (isMuted: boolean) => void;
    toggleIsPlaying: () => void;
    toggleMute: () => void;
}

const useTone = (options: UseToneOptions): UseToneResult => {
    const {
        bpm,
        swing,
        volume,
        instruments = List<InstrumentRecord>(),
        files = List<FileRecord>(),
    } = options;
    console.log("files in useTone", files);
    const [state, setState] = useAtom(ToneStateAtom);
    const toneTracksRef = useRef<Map<string, ToneTrack>>(Map());
    const { mute, isPlaying } = state;
    const { state: workstationState } = useWorkstationState();
    const { tracks, trackSections, trackSectionSteps } = workstationState;

    useToneSwingEffect(swing);
    useToneBpmEffect(bpm);
    useToneVolumeEffect(volume);
    useTonePlayingEffect(isPlaying);
    useToneMuteEffect(mute);

    const setIsPlaying = useCallback(
        (isPlaying: boolean) =>
            setState((prev) => mergeState(prev, { isPlaying })),
        [setState]
    );

    const setMute = useCallback(
        (mute: boolean) => setState((prev) => mergeState(prev, { mute })),
        [setState]
    );

    const toggleIsPlaying = useCallback(
        () =>
            setState((prev) =>
                mergeState(prev, { isPlaying: !prev.isPlaying })
            ),
        [setState]
    );

    const toggleMute = useCallback(
        () => setState((prev) => mergeState(prev, { mute: !prev.mute })),
        [setState]
    );

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

            const toneTrack = toneTracksRef.current.get(track.id);
            const channel = toneTrack?.channel ?? new Tone.Channel();
            channel.set(pick(track, "volume", "pan", "mute", "solo"));
            const sampler =
                toneTrack?.sampler ??
                new Tone.Sampler(sampleMap).chain(channel, Tone.Destination);

            const sequence =
                toneTrack?.sequence ??
                new Tone.Sequence(
                    (time: number, step: any) => {
                        console.log("attempting to trigger", step);
                        try {
                            sampler.triggerAttackRelease(
                                step.name,
                                step.duration ?? 0.5,
                                undefined,
                                step.velocity
                            );
                        } catch (error) {
                            console.log("error triggering", step, error);
                            console.log("sampleMap", sampleMap);
                            console.log("--- track", track);
                            console.log(
                                "files",
                                files,
                                getFileById(instrument?.file_id, files)
                            );
                        }
                    },
                    steps,
                    "8n"
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
    }, [files, instruments, trackSectionSteps, trackSections, tracks]);

    useEffect(() => {
        toneTracksRef.current.forEach((toneTrack) => {
            if (isPlaying) {
                toneTrack.sequence.start(0);
                return;
            }

            toneTrack.sequence.stop();
        });
    }, [isPlaying]);

    return { ...state, setIsPlaying, setMute, toggleIsPlaying, toggleMute };
};

const mergeState = (previousState: ToneState, update: Partial<ToneState>) =>
    merge({}, previousState, update);

export { useTone };
