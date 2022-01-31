import { List } from "immutable";
import { Reactronica } from "lib/reactronica";
import { FileRecord } from "models/file-record";
import { InstrumentRecord } from "models/instrument-record";
import { TrackRecord } from "models/track-record";
import { useMemo } from "react";
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
    const { onStepPlay } = useReactronicaState();
    const { state } = useWorkstationState();
    const { state: trackSections } = useTrackSectionsState({
        trackId: track.id,
    });

    const trackSectionSteps = useMemo(() => {
        const trackSectionIds = trackSections.map(
            (trackSection) => trackSection.id
        );
        return state.trackSectionSteps.filter((trackSectionStep) =>
            trackSectionIds.includes(trackSectionStep.track_section_id)
        );
    }, [state.trackSectionSteps, trackSections]);

    const instrument = useMemo(
        () =>
            instrument_id != null
                ? instruments.find(
                      (instrument) => instrument.id === instrument_id
                  )
                : undefined,
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
    const steps = useMemo(
        () =>
            track.isSequencer()
                ? toSequencerStepTypes(trackSections, trackSectionSteps, files)
                : toInstrumentStepTypes(
                      trackSections,
                      trackSectionSteps,
                      instrument
                  ),
        [files, instrument, track, trackSectionSteps, trackSections]
    );

    const instrumentOptions = useMemo(() => {
        if (instrument == null) {
            return undefined;
        }

        const { curve, release } = instrument;

        return { curve, release };
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
