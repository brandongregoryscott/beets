import { SequencerStep } from "components/sequencer/sequencer-step";
import { Button, Pane } from "evergreen-ui";
import _ from "lodash";
import { List } from "immutable";
import { SelectMenu, SelectMenuItem } from "components/select-menu";
import { FileRecord } from "models/file-record";
import { useMemo, useState } from "react";

interface SequencerProps {
    files: Array<FileRecord>;
    onChange: (index: number, value: List<FileRecord>) => void;
    trackId: string;
    value: List<List<FileRecord>>;
}

const Sequencer: React.FC<SequencerProps> = (props: SequencerProps) => {
    const { onChange, files, value } = props;
    const [selectedFiles, setSelectedFiles] = useState<List<FileRecord>>(
        List()
    );

    const options: Array<SelectMenuItem<FileRecord>> = useMemo(
        () => FileRecord.toSelectMenuItems(files),
        [files]
    );

    const handleDeselect = (item: SelectMenuItem<FileRecord>) =>
        setSelectedFiles((prev) =>
            prev.includes(item.value)
                ? prev.remove(prev.indexOf(item.value))
                : prev
        );

    const handleSelect = (item: SelectMenuItem<FileRecord>) =>
        setSelectedFiles((prev) =>
            prev.includes(item.value) ? prev : prev.push(item.value)
        );

    return (
        <Pane>
            <SelectMenu
                isMultiSelect={true}
                onDeselect={handleDeselect}
                onSelect={handleSelect}
                options={options}
                selected={selectedFiles}
                title="Current Samples">
                <Button>{selectedFiles.count()} Samples Selected</Button>
            </SelectMenu>
            <Pane
                marginX="auto"
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                justifyContent="center">
                {_.range(0, value.count()).map((index: number) => (
                    <SequencerStep
                        index={index}
                        key={index}
                        onChange={onChange}
                        selected={selectedFiles}
                        value={value.get(index, List())}
                    />
                ))}
            </Pane>
        </Pane>
    );
};

export { Sequencer };
