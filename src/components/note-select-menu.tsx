import {
    SelectMenu,
    SelectMenuItem,
    SelectMenuProps,
} from "components/select-menu/select-menu";
import { MidiNotes } from "constants/midi-notes";
import React from "react";
import { PropsWithChildren, useCallback } from "react";
import { MidiNote } from "types/midi-note";

interface NoteSelectMenuProps
    extends Pick<
        SelectMenuProps<MidiNote>,
        "hasFilter" | "hasTitle" | "isMultiSelect" | "selected" | "title"
    > {
    onDeselect?: (file: MidiNote) => void;
    onSelect?: (file: MidiNote) => void;
}

const options: Array<SelectMenuItem<MidiNote>> = MidiNotes.map((note) => ({
    label: note,
    id: note,
    value: note,
}));

const NoteSelectMenu: React.FC<PropsWithChildren<NoteSelectMenuProps>> = (
    props: PropsWithChildren<NoteSelectMenuProps>
) => {
    const {
        children,
        hasFilter,
        hasTitle = false,
        isMultiSelect = false,
        onDeselect,
        onSelect,
        selected,
        title,
    } = props;

    const handleDeselect = useCallback(
        (item: SelectMenuItem<MidiNote>) => onDeselect?.(item.value),
        [onDeselect]
    );

    const handleSelect = useCallback(
        (item: SelectMenuItem<MidiNote>) => onSelect?.(item.value),
        [onSelect]
    );

    return (
        <SelectMenu
            hasFilter={hasFilter}
            hasTitle={hasTitle}
            isMultiSelect={isMultiSelect}
            onDeselect={handleDeselect}
            onSelect={handleSelect}
            options={options}
            selected={selected}
            title={title}>
            {children}
        </SelectMenu>
    );
};

export { NoteSelectMenu };
