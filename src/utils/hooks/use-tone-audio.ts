import { List, Map } from "immutable";
import { ToneStep } from "interfaces/tone-step";
import { ToneTrack } from "interfaces/tone-track";
import { useAtomValue } from "jotai/utils";
import { pick } from "lodash";
import { FileRecord } from "models/file-record";
import { InstrumentRecord } from "models/instrument-record";
import { TrackRecord } from "models/track-record";
import { TrackSectionRecord } from "models/track-section-record";
import { useEffect, useRef } from "react";
import * as Tone from "tone";
import { ToneStateAtom } from "utils/atoms/tone-state-atom";
import { intersectionWith } from "utils/collection-utils";
import { getFileById, toInstrumentMap, toSequencerMap } from "utils/file-utils";
import { useWorkstationState } from "utils/hooks/use-workstation-state";
import {
    toInstrumentStepTypes,
    toSequencerStepTypes,
} from "utils/track-section-step-utils";

interface UseToneAudioOptions {
    files?: List<FileRecord>;
    instruments?: List<InstrumentRecord>;
}

interface UseToneAudioResult {}

const useToneAudio = (options: UseToneAudioOptions): UseToneAudioResult => {
    const {
        files = List<FileRecord>(),
        instruments = List<InstrumentRecord>(),
    } = options;
    const toneTracksRef = useRef<Map<string, ToneTrack>>(Map());
    const { isPlaying } = useAtomValue(ToneStateAtom);
    const { state: workstationState } = useWorkstationState();
    const { tracks, trackSections, trackSectionSteps } = workstationState;

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
                    (time: number, step: ToneStep) => {
                        console.log("attempting to trigger", step);
                        try {
                            sampler.triggerAttackRelease(
                                step.note,
                                step.duration ?? 0.5
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

    return {};
};

export { useToneAudio };
