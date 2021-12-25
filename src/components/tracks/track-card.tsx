import { EditableParagraph } from "components/editable-paragraph";
import {
    Card,
    DeleteIcon,
    IconButton,
    majorScale,
    minorScale,
    Pane,
    PlusIcon,
    PropertiesIcon,
    PropertyIcon,
    Tooltip,
    VolumeOffIcon,
    VolumeUpIcon,
} from "evergreen-ui";
import React, { useCallback, useMemo } from "react";
import {
    Track as ReactronicaTrack,
    Instrument,
    StepNoteType,
} from "reactronica";
import { TrackRecord } from "models/track-record";
import { TrackSectionCard } from "components/tracks/track-section-card";
import { useTheme } from "utils/hooks/use-theme";
import { useTracksState } from "utils/hooks/use-tracks-state";
import { useTrackSectionsState } from "utils/hooks/use-track-sections-state";
import {
    toInstrumentStepTypes,
    toSequencerStepTypes,
} from "utils/track-section-step-utils";
import { useWorkstationState } from "utils/hooks/use-workstation-state";
import { List } from "immutable";
import { useListFiles } from "utils/hooks/domain/files/use-list-files";
import { getFileById, toInstrumentMap, toSequencerMap } from "utils/file-utils";
import { getStepCountOffset } from "utils/track-section-utils";
import { useGetInstrument } from "generated/hooks/domain/instruments/use-get-instrument";
import { isNotNilOrEmpty } from "utils/core-utils";

interface TrackCardProps {
    onStepPlay: (steps: StepNoteType[], index: number) => void;
    track: TrackRecord;
}

const iconMarginRight = minorScale(2);

const TrackCard: React.FC<TrackCardProps> = (props: TrackCardProps) => {
    const { onStepPlay, track } = props;
    const { id, name, mute, solo, instrument_id } = track;
    const { state } = useWorkstationState();
    const { update, remove } = useTracksState();
    const {
        add: addTrackSection,
        state: trackSections,
        update: updateTrackSection,
    } = useTrackSectionsState({ trackId: id });
    const { resultObject: files } = useListFiles();
    const { resultObject: instrument } = useGetInstrument({
        id: instrument_id!,
        enabled: isNotNilOrEmpty(instrument_id),
    });
    const instrumentFile = useMemo(
        () => getFileById(instrument?.file_id, files),
        [files, instrument]
    );

    const theme = useTheme();

    const setName = useCallback(
        (value: string) => update(id, (prev) => prev.merge({ name: value })),
        [id, update]
    );

    const toggleMute = useCallback(
        () => update(id, (prev) => prev.merge({ mute: !prev.mute })),
        [id, update]
    );

    const toggleSolo = useCallback(
        () => update(id, (prev) => prev.merge({ solo: !prev.solo })),
        [id, update]
    );

    const handleAddTrackSection = useCallback(
        () => addTrackSection(),
        [addTrackSection]
    );

    const handleRemove = useCallback(() => remove(track), [remove, track]);

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
                ? toSequencerStepTypes(
                      trackSections,
                      state.trackSectionSteps,
                      files ?? List()
                  )
                : toInstrumentStepTypes(trackSections, state.trackSectionSteps),
        [files, state.trackSectionSteps, track, trackSections]
    );

    return (
        <Pane alignItems="center" display="flex" flexDirection="row">
            <Card
                alignItems="flex-start"
                background={theme.colors.gray200}
                display="flex"
                flexDirection="column"
                marginRight={majorScale(2)}
                marginY={majorScale(1)}
                padding={majorScale(1)}
                width={majorScale(21)}>
                <EditableParagraph onChange={setName} value={name} />
                <Pane display="flex" flexDirection="row">
                    <Tooltip content="Mute Track">
                        <IconButton
                            icon={mute ? VolumeOffIcon : VolumeUpIcon}
                            marginRight={iconMarginRight}
                            onClick={toggleMute}
                        />
                    </Tooltip>
                    <Tooltip content="Solo Track">
                        <IconButton
                            icon={solo ? PropertyIcon : PropertiesIcon}
                            marginRight={iconMarginRight}
                            onClick={toggleSolo}
                        />
                    </Tooltip>
                    <Tooltip content="Remove Track">
                        <IconButton
                            icon={DeleteIcon}
                            intent="danger"
                            marginRight={iconMarginRight}
                            onClick={handleRemove}
                        />
                    </Tooltip>
                </Pane>
                <ReactronicaTrack
                    mute={mute}
                    onStepPlay={onStepPlay}
                    solo={solo}
                    steps={steps}
                    subdivision="8n">
                    {instrument != null && (
                        <Instrument
                            options={{
                                curve: instrument.curve,
                                release: instrument.release,
                            }}
                            samples={samples}
                            type="sampler"
                        />
                    )}
                    {instrument == null && (
                        <Instrument samples={samples} type="sampler" />
                    )}
                </ReactronicaTrack>
            </Card>
            {trackSections?.map((trackSection, index) => (
                <TrackSectionCard
                    file={instrumentFile}
                    isFirst={index === 0}
                    isLast={index === trackSections.count() - 1}
                    key={trackSection.id}
                    onChange={updateTrackSection}
                    stepCountOffset={getStepCountOffset(trackSections, index)}
                    track={track}
                    trackSection={trackSection}
                />
            ))}
            <Tooltip content="Add Section">
                <IconButton
                    icon={PlusIcon}
                    marginLeft={
                        trackSections.isEmpty() ? undefined : majorScale(2)
                    }
                    onClick={handleAddTrackSection}
                />
            </Tooltip>
        </Pane>
    );
};

export { TrackCard };
export type { TrackCardProps };
