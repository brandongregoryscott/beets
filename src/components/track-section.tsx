import { SequencerDialog } from "components/sequencer/sequencer-dialog";
import {
    Card,
    DeleteIcon,
    HeatGridIcon,
    IconButton,
    majorScale,
    Pane,
    Tooltip,
} from "evergreen-ui";
import { List } from "immutable";
import { SetStateAction } from "jotai";
import { FileRecord } from "models/file-record";
import { TrackSectionRecord } from "models/track-section-record";
import { useCallback, useState } from "react";
import { initializeList } from "utils/core-utils";
import { useListFiles } from "utils/hooks/domain/files/use-list-files";
import { useBoolean } from "utils/hooks/use-boolean";
import { useTheme } from "utils/hooks/use-theme";
import { useTrackSectionsState } from "utils/hooks/use-track-sections-state";

interface TrackSectionProps {
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
    const { trackSection, onChange } = props;
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
        <Card
            backgroundColor={theme.colors.gray200}
            alignItems="flex-start"
            marginX={majorScale(1)}
            padding={majorScale(1)}
            height={majorScale(10)}
            width={majorScale(21)}>
            <Pane display="flex" flexDirection="row">
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
        </Card>
    );
};

export { TrackSection };
