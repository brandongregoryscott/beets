import { FileSelectMenuFilters } from "components/files/file-select-menu";
import { Flex } from "components/flex";
import {
    Text,
    FilterIcon,
    IconButton,
    majorScale,
    minorScale,
    Popover,
    Button,
    Switch,
    Label,
    PopoverProps,
    Pane,
} from "evergreen-ui";
import React, { useCallback, useState } from "react";

interface FileSelectMenuFilterPopoverProps
    extends Pick<PopoverProps, "isShown"> {
    filters: FileSelectMenuFilters;
    onConfirm: (updated: FileSelectMenuFilters) => void;
    onToggle: () => void;
}

const FileSelectMenuFilterPopover: React.FC<
    FileSelectMenuFilterPopoverProps
> = (props: FileSelectMenuFilterPopoverProps) => {
    const { filters: initialFilters, onConfirm, isShown, onToggle } = props;
    const [filters, setFilters] =
        useState<FileSelectMenuFilters>(initialFilters);

    const handleShowSelectedOnlyChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setFilters((prev) => ({
                ...prev,
                showSelectedOnly: event.target.checked,
            }));
        },
        []
    );

    const handleClear = useCallback(
        () => setFilters(initialFilters),
        [initialFilters]
    );

    const handleConfirm = useCallback(
        () => onConfirm(filters),
        [filters, onConfirm]
    );

    return (
        <Popover
            content={
                <Flex.Column>
                    <Flex.Row
                        alignItems="center"
                        borderBottom={true}
                        height={majorScale(5)}
                        padding={majorScale(1)}>
                        <Text size={300} textTransform="uppercase">
                            Sort & Filter
                        </Text>
                    </Flex.Row>
                    <Flex.Column padding={majorScale(1)}>
                        <Flex.Row>
                            <Switch
                                checked={filters.showSelectedOnly}
                                onChange={handleShowSelectedOnlyChange}
                            />
                            <Label marginLeft={majorScale(1)} size={300}>
                                Show selected only
                            </Label>
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
                            onClick={handleConfirm}
                            size="small">
                            Apply
                        </Button>
                    </Flex.Row>
                </Flex.Column>
            }
            isShown={isShown}>
            {/* Pane is used to forward click events to underlying IconButton, since the Popover
                replaces the target component/element's onClick function */}
            <Pane>
                <IconButton
                    appearance="minimal"
                    height={majorScale(3)}
                    icon={FilterIcon}
                    marginRight={minorScale(1)}
                    onClick={onToggle}
                />
            </Pane>
        </Popover>
    );
};

export { FileSelectMenuFilterPopover };
