import { SequencerStep } from "components/sequencer/sequencer-step";
import { Button, Pane } from "evergreen-ui";
import _ from "lodash";
import { useTrackAtom } from "utils/hooks/use-track-atom";
import { List } from "immutable";
import { SelectMenu, SelectMenuItem } from "components/select-menu";
import { FileRecord } from "models/file-record";
import { useState } from "react";

interface SequencerProps {
    onChange: (index: number, value: List<FileRecord>) => void;
    options: Array<SelectMenuItem<FileRecord>>;
    trackId: string;
    value: List<List<FileRecord>>;
}

const Sequencer: React.FC<SequencerProps> = (props: SequencerProps) => {
    const { onChange, options, trackId, value } = props;
    const [selected, setSelected] = useState<List<FileRecord>>(List());
    useTrackAtom(trackId);

    const handleDeselect = (item: SelectMenuItem<FileRecord>) =>
        setSelected((prev) =>
            prev.includes(item.value)
                ? prev.remove(prev.indexOf(item.value))
                : prev
        );

    const handleSelect = (item: SelectMenuItem<FileRecord>) =>
        setSelected((prev) =>
            prev.includes(item.value) ? prev : prev.push(item.value)
        );
    return (
        <Pane>
            <SelectMenu
                hasFilter={false}
                isMultiSelect={true}
                onDeselect={handleDeselect}
                onSelect={handleSelect}
                options={options}
                selected={selected}
                title="Current Samples">
                <Button>{selected.count()} Samples Selected</Button>
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
                        selected={selected}
                        value={value.get(index, List())}
                    />
                ))}
            </Pane>
        </Pane>
    );
};

export { Sequencer };
