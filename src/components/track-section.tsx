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
import { FileRecord } from "models/file-record";
import { TrackSectionRecord } from "models/track-section-record";
import { useCallback, useMemo, useState } from "react";
import { getBorderXProps, initializeList } from "utils/core-utils";
import { useListFiles } from "utils/hooks/domain/files/use-list-files";
import { useBoolean } from "utils/hooks/use-boolean";
import { useTheme } from "utils/hooks/use-theme";
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
    const { resultObject: files } = useListFiles();
    const theme = useTheme();

    const [trackSectionStepFiles, setTrackSectionStepFiles] = useState<
        List<List<FileRecord>>
    >(initializeList(trackSection.step_count, List()));

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
            borderRightWidth={2}
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
                {trackSectionStepFiles.map((files) => {
                    const sortedFiles = List(_.sortBy(files.toArray(), "id"));
                    return (
                        <Pane
                            display="flex"
                            flexDirection="column"
                            minHeight={stepHeight}
                            minWidth={stepWidth}
                            width={stepWidth}>
                            {!files.isEmpty() &&
                                _.range(0, 4).map((row: number) => (
                                    <Pane
                                        height={stepHeight}
                                        minHeight={stepHeight}
                                        minWidth={stepWidth}
                                        width={stepWidth}
                                        backgroundColor={getStepColor(
                                            sortedFiles.get(row)?.id,
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
                    onStepChange={setTrackSectionStepFiles}
                    onStepCountChange={handleStepCountChange}
                    onClose={handleCloseSequencerDialog}
                    steps={trackSectionStepFiles}
                    stepCount={trackSection.step_count}
                />
            )}
        </Pane>
    );
};

export { TrackSection };
