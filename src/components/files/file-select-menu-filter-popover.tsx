import type { FileSelectMenuFilters } from "components/files/file-select-menu";
import { defaultFilters } from "components/files/file-select-menu";
import { Flex } from "components/flex";
import { SelectMenuTitle } from "components/select-menu/select-menu-title";
import type { PopoverProps } from "evergreen-ui";
import {
    FilterIcon,
    majorScale,
    minorScale,
    Popover,
    Button,
    Switch,
    Label,
    Pane,
    Tooltip,
    FilterListIcon,
} from "evergreen-ui";
import { isEqual } from "lodash";
import React, { useCallback, useState } from "react";
import { useTheme } from "hooks/use-theme";
import { IconButton } from "components/icon-button";

interface FileSelectMenuFilterPopoverProps
    extends Pick<PopoverProps, "onClose" | "onOpen"> {
    filters: FileSelectMenuFilters;
    onConfirm: (updated: FileSelectMenuFilters) => void;
}

const FileSelectMenuFilterPopover: React.FC<
    FileSelectMenuFilterPopoverProps
> = (props: FileSelectMenuFilterPopoverProps) => {
    const { filters: initialFilters, onConfirm, onOpen, onClose } = props;
    const { colors } = useTheme();
    const [filters, setFilters] =
        useState<FileSelectMenuFilters>(initialFilters);

    const handleShowSelectedChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setFilters((prev) => ({
                ...prev,
                showSelected: event.target.checked,
            }));
        },
        []
    );

    const handleShowAssignedChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setFilters((prev) => ({
                ...prev,
                showAssigned: event.target.checked,
            }));
        },
        []
    );

    const resetStateFromProps = useCallback(() => {
        setFilters(initialFilters);
    }, [initialFilters]);

    const handleToggle = useCallback(() => {
        resetStateFromProps();
    }, [resetStateFromProps]);

    const handleClear = useCallback(() => setFilters(defaultFilters), []);

    const handleConfirm = useCallback(
        (close: () => void) => () => {
            onConfirm(filters);
            scheduleClose(close);
        },
        [filters, onConfirm]
    );

    const icon = isEqual(initialFilters, defaultFilters)
        ? FilterIcon
        : FilterListIcon;

    return (
        <Popover
            bringFocusInside={true}
            content={({ close }) => (
                <Flex.Column>
                    <SelectMenuTitle
                        close={() => scheduleClose(close)}
                        title="Filters"
                    />
                    <Flex.Column padding={majorScale(2)}>
                        <Flex.Row marginBottom={majorScale(2)}>
                            <Switch
                                checked={filters.showSelected}
                                onChange={handleShowSelectedChange}
                            />
                            <Tooltip
                                content="Filters the list to selected samples"
                                showDelay={750}>
                                <Label
                                    color={
                                        filters.showSelected
                                            ? colors.blue500
                                            : undefined
                                    }
                                    marginLeft={majorScale(1)}
                                    size={300}>
                                    Show selected
                                </Label>
                            </Tooltip>
                        </Flex.Row>
                        <Flex.Row>
                            <Switch
                                checked={filters.showAssigned}
                                onChange={handleShowAssignedChange}
                            />
                            <Tooltip
                                content="Filters the list to samples that have been assigned to a step"
                                showDelay={750}>
                                <Label
                                    color={
                                        filters.showAssigned
                                            ? colors.blue500
                                            : undefined
                                    }
                                    marginLeft={majorScale(1)}
                                    size={300}>
                                    Show assigned
                                </Label>
                            </Tooltip>
                        </Flex.Row>
                    </Flex.Column>
                    <Flex.Row borderTop={true} padding={majorScale(1)}>
                        <Button
                            marginLeft="auto"
                            marginRight={majorScale(1)}
                            onClick={handleClear}
                            size="small">
                            Clear
                        </Button>
                        <Button
                            appearance="primary"
                            onClick={handleConfirm(close)}
                            size="small">
                            Apply
                        </Button>
                    </Flex.Row>
                </Flex.Column>
            )}
            onClose={onClose}
            onOpen={onOpen}>
            {/* Pane is used to forward click events to underlying IconButton, since the Popover
                replaces the target component/element's onClick function */}
            <Pane>
                <IconButton
                    appearance="minimal"
                    height={majorScale(3)}
                    icon={icon}
                    marginRight={minorScale(1)}
                    onClick={handleToggle}
                />
            </Pane>
        </Popover>
    );
};

/**
 * Utility function for scheduling the close function to prevent race conditions closing the parent
 * Popover as well
 */
const scheduleClose = (close: () => void) => {
    setTimeout(close, 0);
};

export { FileSelectMenuFilterPopover };
