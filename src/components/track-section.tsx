import { SequencerDialog } from "components/sequencer/sequencer-dialog";
import {
    DeleteIcon,
    HeatGridIcon,
    IconButton,
    majorScale,
    minorScale,
    Pane,
    Tooltip,
} from "evergreen-ui";
import { List } from "immutable";
import { SetStateAction } from "jotai";
import _ from "lodash";
import { TrackSectionRecord } from "models/track-section-record";
import { useCallback } from "react";
import { getBorderXProps } from "utils/core-utils";
import { useListFiles } from "utils/hooks/domain/files/use-list-files";
import { useBoolean } from "utils/hooks/use-boolean";
import { useTheme } from "utils/hooks/use-theme";
import { useTrackSectionStepsState } from "utils/hooks/use-track-section-steps-state";
import { useTrackSectionsState } from "utils/hooks/use-track-sections-state";
import { getStepColor } from "utils/theme-utils";

interface TrackSectionProps {
    isFirst?: boolean;
    isLast?: boolean;
    trackSection: TrackSectionRecord;
    onChange: (id: string, update: SetStateAction<TrackSectionRecord>) => void;
}

const iconMarginRight = majorScale(8);
const stepHeight = majorScale(2);
const stepWidth = majorScale(2);

const TrackSection: React.FC<TrackSectionProps> = (
    props: TrackSectionProps
) => {
    const {
        value: sequencerDialogOpen,
        setTrue: handleOpenSequencerDialog,
        setFalse: handleCloseSequencerDialog,
    } = useBoolean(false);
    const { isFirst = false, isLast = false, trackSection, onChange } = props;
    const borderProps = getBorderXProps({
        isFirst,
        isLast,
        borderRadius: minorScale(1),
    });
    const { remove } = useTrackSectionsState({
        trackId: trackSection.track_id,
    });

    const {
        setState: handleTrackSectionStepsChange,
        state: trackSectionSteps,
    } = useTrackSectionStepsState({ trackSectionId: trackSection.id });
    const { resultObject: files } = useListFiles();
    const theme = useTheme();

    const groupedTrackSectionSteps = trackSectionSteps.groupBy((e) => e.index);

    const handleRemove = useCallback(() => {
        remove(trackSection);
    }, [remove, trackSection]);

    const handleStepCountChange = useCallback(
        (stepCount: number) => {
            onChange(trackSection.id, (prev) =>
                prev.merge({ step_count: stepCount })
            );
        },
        [onChange, trackSection.id]
    );

    return (
        <Pane
            {...borderProps}
            backgroundColor={theme.colors.gray200}
            borderRight={!isLast}
            borderRightColor={theme.colors.gray700}
            borderRightWidth={1}
            display="flex"
            flexDirection="row"
            height={majorScale(10)}
            padding={majorScale(1)}>
            <Pane
                display="flex"
                flexDirection="column"
                maxWidth={majorScale(5)}>
                <Tooltip content="Sequencer">
                    <IconButton
                        icon={HeatGridIcon}
                        marginRight={iconMarginRight}
                        onClick={handleOpenSequencerDialog}
                    />
                </Tooltip>
                <Tooltip content="Remove section">
                    <IconButton
                        icon={DeleteIcon}
                        marginRight={iconMarginRight}
                        onClick={handleRemove}
                    />
                </Tooltip>
            </Pane>
            <Pane display="flex" flexDirection="row">
                {_.range(0, trackSection.step_count).map((index: number) => {
                    const steps =
                        groupedTrackSectionSteps.get(index)?.toList() ?? List();
                    const stepsSortedByFileId = List(
                        _.sortBy(steps.toArray(), "file_id")
                    );

                    return (
                        <Pane
                            display="flex"
                            flexDirection="column"
                            key={index}
                            minHeight={stepHeight}
                            minWidth={stepWidth}
                            width={stepWidth}>
                            {_.range(0, 4).map((row: number) => (
                                <Pane
                                    height={stepHeight}
                                    minHeight={stepHeight}
                                    minWidth={stepWidth}
                                    width={stepWidth}
                                    backgroundColor={getStepColor(
                                        stepsSortedByFileId.get(row)?.file_id,
                                        theme
                                    )}
                                />
                            ))}
                        </Pane>
                    );
                })}
            </Pane>
            {sequencerDialogOpen && files != null && (
                <SequencerDialog
                    files={files}
                    onStepChange={handleTrackSectionStepsChange}
                    onStepCountChange={handleStepCountChange}
                    onClose={handleCloseSequencerDialog}
                    trackSectionSteps={trackSectionSteps}
                    trackSection={trackSection}
                />
            )}
        </Pane>
    );
};

export { TrackSection };
