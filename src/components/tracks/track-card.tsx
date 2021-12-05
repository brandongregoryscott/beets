import { EditableParagraph } from "components/editable-paragraph";
import {
    Card,
    DeleteIcon,
    IconButton,
    majorScale,
    minorScale,
    MusicIcon,
    Pane,
    PlusIcon,
    PropertiesIcon,
    PropertyIcon,
    Tooltip,
    VolumeOffIcon,
    VolumeUpIcon,
} from "evergreen-ui";
import React, { useCallback, useMemo, useState } from "react";
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
import { toStepTypes } from "utils/track-section-step-utils";
import { useWorkstationState } from "utils/hooks/use-workstation-state";
import { List } from "immutable";
import { useListFiles } from "utils/hooks/domain/files/use-list-files";
import { FileUtils } from "utils/file-utils";
import { getByTrack, getStepCountOffset } from "utils/track-section-utils";
import { FileSelectMenu } from "components/file-select-menu";
import { FileRecord } from "models/file-record";

interface TrackCardProps {
    onStepPlay: (steps: StepNoteType[], index: number) => void;
    track: TrackRecord;
}

const iconMarginRight = minorScale(2);

const TrackCard: React.FC<TrackCardProps> = (props: TrackCardProps) => {
    const { onStepPlay, track } = props;
    const { id, name, mute, solo } = track;
    const { state, setCurrentState } = useWorkstationState();
    const { update, remove } = useTracksState();
    const {
        add: addTrackSection,
        state: trackSections,
        update: updateTrackSection,
    } = useTrackSectionsState({ trackId: id });
    const { resultObject: files } = useListFiles();
    const [selectedSample, setSelectedSample] = useState<FileRecord>();
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

    const handleSelect = useCallback(
        (file: FileRecord) => {
            setSelectedSample(file);
            setCurrentState((prev) => {
                const trackSectionIds = getByTrack(
                    track,
                    prev.trackSections
                ).map((trackSection) => trackSection.id);
                const updatedTrackSectionSteps = prev.trackSectionSteps.map(
                    (trackSectionStep) => {
                        if (
                            !trackSectionIds.includes(
                                trackSectionStep.track_section_id
                            )
                        ) {
                            return trackSectionStep;
                        }

                        return trackSectionStep.merge({ file_id: file.id });
                    }
                );

                return prev.merge({
                    trackSectionSteps: updatedTrackSectionSteps,
                });
            });
        },
        [track, setCurrentState, setSelectedSample]
    );

    const steps = useMemo(
        () =>
            toStepTypes(
                trackSections,
                state.trackSectionSteps,
                files ?? List()
            ),
        [trackSections, state.trackSectionSteps, files]
    );

    return (
        <Pane display="flex" flexDirection="row" alignItems="center">
            <Card
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                background={theme.colors.gray200}
                width={majorScale(21)}
                marginY={majorScale(1)}
                marginRight={majorScale(2)}
                padding={majorScale(1)}>
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
                    {track.isInstrument() && (
                        <FileSelectMenu
                            hasTitle={false}
                            onDeselect={handleSelect}
                            onSelect={handleSelect}
                            selected={selectedSample}>
                            <IconButton
                                icon={
                                    <MusicIcon
                                        color={
                                            selectedSample == null
                                                ? "muted"
                                                : "selected"
                                        }
                                    />
                                }
                                marginRight={iconMarginRight}
                            />
                        </FileSelectMenu>
                    )}
                </Pane>
                <ReactronicaTrack
                    mute={mute}
                    onStepPlay={onStepPlay}
                    solo={solo}
                    steps={steps}
                    subdivision="8n">
                    <Instrument
                        samples={FileUtils.toMidiNoteMap(files)}
                        type="sampler"
                    />
                </ReactronicaTrack>
            </Card>
            {trackSections?.map((trackSection, index) => (
                <TrackSectionCard
                    file={selectedSample}
                    isFirst={index === 0}
                    isLast={index === trackSections.count() - 1}
                    key={trackSection.id}
                    onChange={updateTrackSection}
                    track={track}
                    trackSection={trackSection}
                    stepCountOffset={getStepCountOffset(trackSections, index)}
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
