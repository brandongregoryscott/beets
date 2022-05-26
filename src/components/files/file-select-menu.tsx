import { FileSelectMenuFilterPopover } from "components/files/file-select-menu-filter-popover";
import { FileSelectMenuItem } from "components/files/file-select-menu-item";
import {
    SelectMenu,
    SelectMenuItem,
    SelectMenuProps,
} from "components/select-menu/select-menu";
import { SelectMenuTitle } from "components/select-menu/select-menu-title";
import { Spinner, majorScale, Pane } from "evergreen-ui";
import { castArray } from "lodash";
import { FileRecord } from "models/file-record";
import React, { useState } from "react";
import { PropsWithChildren, useCallback, useMemo } from "react";
import { intersectionWith } from "utils/collection-utils";
import { toSelectMenuItems } from "utils/file-utils";
import { useListFiles } from "utils/hooks/domain/files/use-list-files";
import { useBoolean } from "utils/hooks/use-boolean";

interface FileSelectMenuProps
    extends Pick<
        SelectMenuProps<FileRecord>,
        "hasFilter" | "hasTitle" | "isMultiSelect" | "selected" | "title"
    > {
    onDeselect?: (file: FileRecord) => void;
    onSelect?: (file: FileRecord) => void;
}

interface FileSelectMenuFilters {
    showAssigned: boolean;
    showSelected: boolean;
}

const defaultFilters: FileSelectMenuFilters = {
    showSelected: false,
    showAssigned: false,
};

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
    const {
        value: isFilterPopoverOpen,
        setFalse: handleCloseFilterPopover,
        toggle: handleToggleFilterPopover,
    } = useBoolean();
    const [filters, setFilters] =
        useState<FileSelectMenuFilters>(defaultFilters);
    const { resultObject: files, isLoading } = useListFiles();
    const { showSelected } = filters;

    const options: Array<SelectMenuItem<FileRecord>> = useMemo(() => {
        const filteredFiles = showSelected
            ? intersectionWith(
                  files ?? [],
                  selected instanceof FileRecord
                      ? castArray(selected)
                      : selected ?? [],
                  (left, right) => left.id === right.id
              )
            : files;
        return toSelectMenuItems(filteredFiles);
    }, [files, selected, showSelected]);

    const handleDeselect = useCallback(
        (item: SelectMenuItem<FileRecord>) => onDeselect?.(item.value),
        [onDeselect]
    );

    const handleSelect = useCallback(
        (item: SelectMenuItem<FileRecord>) => onSelect?.(item.value),
        [onSelect]
    );

    const handleConfirmFilter = useCallback(
        (updatedFilters: FileSelectMenuFilters) => {
            setFilters(updatedFilters);
            // Intentionally schedule the popover close outside of standard React state queue
            // so that the confirmation doesn't close both popovers
            setTimeout(handleCloseFilterPopover, 0);
        },
        [handleCloseFilterPopover]
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
            shouldCloseOnExternalClick={!isFilterPopoverOpen}
            title={title}
            titleView={({ close }) => (
                <SelectMenuTitle close={close} title={title}>
                    <FileSelectMenuFilterPopover
                        filters={filters}
                        isShown={isFilterPopoverOpen}
                        onConfirm={handleConfirmFilter}
                        onToggle={handleToggleFilterPopover}
                    />
                </SelectMenuTitle>
            )}>
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

export type { FileSelectMenuProps, FileSelectMenuFilters };
export { FileSelectMenu, defaultFilters };
