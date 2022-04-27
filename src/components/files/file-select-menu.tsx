import { FileSelectMenuItem } from "components/files/file-select-menu-item";
import {
    SelectMenu,
    SelectMenuItem,
    SelectMenuProps,
} from "components/select-menu";
import { Spinner, majorScale, Pane } from "evergreen-ui";
import { FileRecord } from "models/file-record";
import React from "react";
import { PropsWithChildren, useCallback, useMemo } from "react";
import { toSelectMenuItems } from "utils/file-utils";
import { useListFiles } from "utils/hooks/domain/files/use-list-files";

interface FileSelectMenuProps
    extends Pick<
        SelectMenuProps<FileRecord>,
        "hasFilter" | "hasTitle" | "isMultiSelect" | "selected" | "title"
    > {
    onDeselect?: (file: FileRecord) => void;
    onSelect?: (file: FileRecord) => void;
}

const FileSelectMenu: React.FC<PropsWithChildren<FileSelectMenuProps>> = (
    props: PropsWithChildren<FileSelectMenuProps>
) => {
    const {
        children,
        hasFilter,
        hasTitle,
        isMultiSelect = false,
        onDeselect,
        onSelect,
        selected,
        title,
    } = props;
    const { resultObject: files, isLoading } = useListFiles();

    const options: Array<SelectMenuItem<FileRecord>> = useMemo(
        () => toSelectMenuItems(files),
        [files]
    );

    const handleDeselect = useCallback(
        (item: SelectMenuItem<FileRecord>) => onDeselect?.(item.value),
        [onDeselect]
    );

    const handleSelect = useCallback(
        (item: SelectMenuItem<FileRecord>) => onSelect?.(item.value),
        [onSelect]
    );

    return (
        <SelectMenu
            hasFilter={hasFilter}
            hasTitle={hasTitle}
            isMultiSelect={isMultiSelect}
            itemRenderer={(props) => <FileSelectMenuItem {...props} />}
            onDeselect={handleDeselect}
            onSelect={handleSelect}
            options={options}
            selected={selected}
            title={title}>
            {isLoading ? (
                <Pane
                    alignItems="center"
                    display="flex"
                    height={majorScale(4)}
                    justifyContent="center"
                    width={majorScale(4)}>
                    <Spinner size={majorScale(3)} />
                </Pane>
            ) : (
                children
            )}
        </SelectMenu>
    );
};

export { FileSelectMenu };