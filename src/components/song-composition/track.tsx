import { List } from "immutable";
import { Reactronica } from "lib/reactronica";
import { pick } from "lodash";
import { FileRecord } from "models/file-record";
import { InstrumentRecord } from "models/instrument-record";
import { TrackRecord } from "models/track-record";
import { TrackSectionRecord } from "models/track-section-record";
import { TrackSectionStepRecord } from "models/track-section-step-record";
import { useMemo } from "react";
import { intersectionWith } from "utils/collection-utils";
import { getFileById, toInstrumentMap, toSequencerMap } from "utils/file-utils";
import { useReactronicaState } from "utils/hooks/use-reactronica-state";
import { useTrackSectionsState } from "utils/hooks/use-track-sections-state";
import { useWorkstationState } from "utils/hooks/use-workstation-state";
import {
    toInstrumentStepTypes,
    toSequencerStepTypes,
} from "utils/track-section-step-utils";

interface TrackProps {
    files: List<FileRecord>;
    instruments: List<InstrumentRecord>;
    track: TrackRecord;
}

const Track: React.FC<TrackProps> = (props: TrackProps) => {
    const { track, files, instruments } = props;
    const { mute, solo, instrument_id } = track;
    const { onStepPlay, state: reactronicaState } = useReactronicaState();
    const { startIndex, endIndex } = reactronicaState;
    const { state: workstationState } = useWorkstationState();
    const { state: trackSections } = useTrackSectionsState({
        trackId: track.id,
    });

    const trackSectionSteps = useMemo(
        () =>
            intersectionWith(
                workstationState.trackSectionSteps,
                trackSections,
                (
                    trackSectionStep: TrackSectionStepRecord,
                    trackSection: TrackSectionRecord
                ) => trackSectionStep.track_section_id === trackSection.id
            ),
        [trackSections, workstationState.trackSectionSteps]
    );

    const instrument = useMemo(
        () => instruments.find((instrument) => instrument.id === instrument_id),
        [instrument_id, instruments]
    );
    const instrumentFile = useMemo(
        () => getFileById(instrument?.file_id, files),
        [files, instrument]
    );

    const samples = useMemo(
        () =>
            track.isSequencer()
                ? toSequencerMap(files)
                : toInstrumentMap(instrumentFile),
        [files, instrumentFile, track]
    );
    const steps = useMemo(() => {
        const steps = track.isSequencer()
            ? toSequencerStepTypes(trackSections, trackSectionSteps, files)
            : toInstrumentStepTypes(
                  trackSections,
                  trackSectionSteps,
                  instrument
              );

        if (startIndex != null) {
            return steps.slice(
                startIndex,
                endIndex != null ? endIndex + 1 : undefined
            );
        }

        return steps;
    }, [
        endIndex,
        files,
        instrument,
        startIndex,
        track,
        trackSectionSteps,
        trackSections,
    ]);

    const instrumentOptions = useMemo(() => {
        if (instrument == null) {
            return undefined;
        }

        return pick(instrument, "curve", "release");
    }, [instrument]);

    return (
        <Reactronica.Track
            mute={mute}
            onStepPlay={onStepPlay}
            solo={solo}
            steps={steps}
            subdivision="8n">
            <Reactronica.Instrument
                options={instrumentOptions}
                samples={samples}
                type="sampler"
            />
        </Reactronica.Track>
    );
};

export { Track };
