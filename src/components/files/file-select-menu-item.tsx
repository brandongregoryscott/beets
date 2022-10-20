import type { SelectMenuItemRendererProps } from "components/select-menu/select-menu";
import type { FileRecord } from "models/file-record";
import { majorScale, minorScale, Option } from "evergreen-ui";
import React, { useCallback } from "react";
import { isInstanceOf } from "utils/core-utils";
import { PlayPreviewButton } from "components/workstation/play-preview-button";

interface FileSelectMenuItemProps
    extends SelectMenuItemRendererProps<FileRecord> {}

const ignoredClickTargets = [SVGSVGElement, SVGPathElement, HTMLButtonElement];
const itemHeight = 33;

const FileSelectMenuItem: React.FC<FileSelectMenuItemProps> = (
    props: FileSelectMenuItemProps
) => {
    const { item, isSelectable, isSelected, onSelect, onDeselect, ...rest } =
        props;

    const handleClick = useCallback(
        (event: React.MouseEvent) => {
            const { target } = event;
            // Stop event from propagating down - will cause the click to close the SelectMenu when
            // the 'showSelected' filter is applied and there's only one option left
            event.stopPropagation();

            if (!isSelectable) {
                return;
            }

            // Prevent events from the <PlayButton /> from selecting/deselecting item
            if (isInstanceOf(target, ...ignoredClickTargets)) {
                return;
            }

            if (isSelected) {
                onDeselect();
                return;
            }

            onSelect();
        },
        [isSelectable, isSelected, onDeselect, onSelect]
    );

    return (
        <Option
            {...rest}
            height={itemHeight}
            isSelected={isSelected}
            maxHeight={itemHeight}
            minHeight={itemHeight}
            onClick={handleClick}>
            <PlayPreviewButton
                fileUrl={item.value.getPublicUrl()}
                marginLeft={minorScale(1)}
                marginRight={majorScale(1)}
                marginY={minorScale(1)}
                size="small"
            />
            {item.value.name}
        </Option>
    );
};

export { FileSelectMenuItem };
