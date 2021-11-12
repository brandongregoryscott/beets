import { SequencerDialog } from "components/sequencer/sequencer-dialog";
import {
    Card,
    HeatGridIcon,
    IconButton,
    majorScale,
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
    const { resultObject: files } = useListFiles();
    const theme = useTheme();

    const [sequencerValue, setSequencerValue] = useState<
        List<List<FileRecord>>
    >(initializeList(16, List()));

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
            <Tooltip content="Sequencer">
                <IconButton
                    icon={HeatGridIcon}
                    marginRight={iconMarginRight}
                    onClick={handleOpenSequencerDialog}
                />
            </Tooltip>
            {sequencerDialogOpen && files != null && (
                <SequencerDialog
                    files={files}
                    onStepChange={setSequencerValue}
                    onStepCountChange={handleStepCountChange}
                    onClose={handleCloseSequencerDialog}
                    steps={sequencerValue}
                    stepCount={trackSection.step_count}
                />
            )}
        </Card>
    );
};

export { TrackSection };
