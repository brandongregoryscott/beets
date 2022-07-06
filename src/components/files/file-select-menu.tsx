import { FileSelectMenuFilterPopover } from "components/files/file-select-menu-filter-popover";
import { FileSelectMenuItem } from "components/files/file-select-menu-item";
import type {
    SelectMenuItem,
    SelectMenuProps,
} from "components/select-menu/select-menu";
import { SelectMenu } from "components/select-menu/select-menu";
import { SelectMenuTitle } from "components/select-menu/select-menu-title";
import {
    Spinner,
    majorScale,
    Pane,
    MusicIcon,
    Link,
    Button,
} from "evergreen-ui";
import { List } from "immutable";
import { castArray, isEmpty } from "lodash";
import { FileRecord } from "models/file-record";
import React from "react";
import type { PropsWithChildren } from "react";
import { useCallback, useMemo } from "react";
import { intersectionWith } from "utils/collection-utils";
import { toSelectMenuItems } from "utils/file-utils";
import { useListFiles } from "utils/hooks/domain/files/use-list-files";
import { useBoolean } from "utils/hooks/use-boolean";
import { Link as ReactRouterLink } from "react-router-dom";
import { Sitemap } from "sitemap";
import { useTheme } from "utils/hooks/use-theme";
import { absolutePath, joinPaths } from "utils/route-utils";
import { EmptyState } from "components/empty-state";
import { useLocalstorageState } from "rooks";

interface FileSelectMenuProps
    extends Pick<
        SelectMenuProps<FileRecord>,
        "hasFilter" | "hasTitle" | "isMultiSelect" | "selected" | "title"
    > {
    /**
     * List of samples that have been assigned to the current `TrackSectionRecord`, used for filtering
     */
    assigned?: List<FileRecord>;
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

const localStorageKey = "fileSelectMenuFilterSelection";

const FileSelectMenu: React.FC<PropsWithChildren<FileSelectMenuProps>> = (
    props: PropsWithChildren<FileSelectMenuProps>
) => {
    const {
        assigned,
        children,
        hasFilter,
        hasTitle = true,
        isMultiSelect = false,
        onDeselect,
        onSelect,
        selected,
        title,
    } = props;
    const { colors } = useTheme();
    const {
        value: isFilterPopoverOpen,
        setFalse: handleFilterPopoverClose,
        setTrue: handleFilterPopoverOpen,
    } = useBoolean();
    const [filters, setFilters] = useLocalstorageState<FileSelectMenuFilters>(
        localStorageKey,
        defaultFilters
    );
    const { resultObject: files, isLoading } = useListFiles();
    const { showSelected, showAssigned } = filters;

    const options: Array<SelectMenuItem<FileRecord>> = useMemo(() => {
        let filteredFiles: List<FileRecord> = files ?? List();
        // We can't show the filter popover without the title component being rendered, so don't
        // apply the filters without the user understanding where they came from
        if (!hasTitle) {
            return toSelectMenuItems(filteredFiles);
        }

        if (showAssigned) {
            filteredFiles = assigned ?? List();
        }

        if (showSelected) {
            filteredFiles = intersectionWith(
                filteredFiles,
                selected instanceof FileRecord
                    ? castArray(selected)
                    : selected ?? [],
                (left, right) => left.id === right.id
            );
        }

        return toSelectMenuItems(filteredFiles);
    }, [assigned, files, hasTitle, selected, showAssigned, showSelected]);

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
        },
        [setFilters]
    );

    const handleClearFilters = useCallback(
        (event: React.MouseEvent) => {
            event.stopPropagation();
            setFilters(defaultFilters);
        },
        [setFilters]
    );

    return (
        <SelectMenu
            emptyView={
                <EmptyState
                    icon={<MusicIcon />}
                    iconBgColor={colors.white}
                    orientation="vertical"
                    primaryCta={getEmptyStateCta(handleClearFilters, files)}
                    title="No samples found"
                />
            }
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
                        onClose={handleFilterPopoverClose}
                        onConfirm={handleConfirmFilter}
                        onOpen={handleFilterPopoverOpen}
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

const getEmptyStateCta = (
    onClearFilters: (event: React.MouseEvent) => void,
    files?: List<FileRecord>
): React.ReactNode => {
    if (isEmpty(files)) {
        return (
            <Link
                is={ReactRouterLink}
                to={absolutePath(
                    joinPaths(Sitemap.library.home, Sitemap.library.files)
                )}>
                Upload Samples
            </Link>
        );
    }

    return (
        <Button appearance="primary" onClick={onClearFilters} size="small">
            Clear Filters
        </Button>
    );
};

export type { FileSelectMenuProps, FileSelectMenuFilters };
export { FileSelectMenu, defaultFilters };
