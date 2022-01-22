import { SelectMenuItemRendererProps } from "components/select-menu";
import { FileRecord } from "models/file-record";
import { majorScale, minorScale, Option } from "evergreen-ui";
import { useBoolean } from "utils/hooks/use-boolean";
import { PlayButton } from "components/workstation/play-button";
import React from "react";

interface FileSelectMenuItemProps
    extends SelectMenuItemRendererProps<FileRecord> {}

const itemHeight = 33;

const FileSelectMenuItem: React.FC<FileSelectMenuItemProps> = (
    props: FileSelectMenuItemProps
) => {
    const { item, ...rest } = props;
    const { value: isPlaying, toggle: toggleIsPlaying } = useBoolean();

    return (
        <Option
            {...rest}
            minHeight={itemHeight}
            maxHeight={itemHeight}
            height={itemHeight}>
            <PlayButton
                size="small"
                marginY={minorScale(1)}
                marginLeft={minorScale(1)}
                marginRight={majorScale(1)}
                appearance="minimal"
                isPlaying={isPlaying}
                toggleIsPlaying={toggleIsPlaying}
            />
            {item.value.name}
        </Option>
    );
};

export { FileSelectMenuItem };
