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
import { FileRecord } from "models/file-record";
import { TrackSectionRecord } from "models/track-section-record";
import { useCallback, useState } from "react";
import { getBorderXProps, initializeList } from "utils/core-utils";
import { useListFiles } from "utils/hooks/domain/files/use-list-files";
import { useBoolean } from "utils/hooks/use-boolean";
import { useTheme } from "utils/hooks/use-theme";
import { useTrackSectionsState } from "utils/hooks/use-track-sections-state";

interface TrackSectionProps {
    isFirst?: boolean;
    isLast?: boolean;
    trackSection: TrackSectionRecord;
    onChange: (id: string, update: SetStateAction<TrackSectionRecord>) => void;
}

const iconMarginRight = majorScale(8);

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
            alignItems="flex-start"
            backgroundColor={theme.colors.gray200}
            borderRight={!isLast}
            borderRightColor={theme.colors.gray700}
            borderRightWidth={2}
            display="flex"
            flexDirection="column"
            height={majorScale(10)}
            padding={majorScale(1)}
            width={majorScale(21)}>
            <Pane display="flex" flexDirection="row" alignItems="flex-start">
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
