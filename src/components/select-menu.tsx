import {
    SelectMenu as EvergreenSelectMenu,
    SelectMenuItem as EvergreenSelectMenuItem,
    SelectMenuProps as EvergreenSelectMenuProps,
} from "evergreen-ui";
import { List } from "immutable";
import _ from "lodash";
import { useCallback, useMemo } from "react";

interface SelectMenuItem<T> extends Omit<EvergreenSelectMenuItem, "value"> {
    id: string;
    value: T;
}

interface SelectMenuProps<T>
    extends Omit<
        EvergreenSelectMenuProps,
        "selected" | "onSelect" | "onDeselect" | "options"
    > {
    onDeselect?: (item: SelectMenuItem<T>) => void;
    onSelect?: (item: SelectMenuItem<T>) => void;
    options?: Array<SelectMenuItem<T>>;
    selected?: T | T[] | List<T>;
}

const SelectMenu = <T,>(props: SelectMenuProps<T>) => {
    const {
        onDeselect: onDeselectValue,
        onSelect: onSelectValue,
        options: optionValues,
        selected: selectedValues,
        ...restProps
    } = props;

    const options: EvergreenSelectMenuItem[] | undefined = useMemo(
        () =>
            optionValues?.map((optionValue) => ({
                ..._.pick<SelectMenuItem<T>, keyof SelectMenuItem<T>>(
                    optionValue,
                    "disabled",
                    "label",
                    "labelInList"
                ),
                value: optionValue.id,
            })),
        [optionValues]
    );

    const selected = useMemo(() => {
        let _selectedValues = selectedValues;

        if (List.isList(_selectedValues)) {
            _selectedValues = _selectedValues.toArray();
        }

        if (_.isArray(_selectedValues)) {
            return _.intersectionWith(
                optionValues,
                _selectedValues,
                (option, selected) => option.value === selected
            ).map((selected) => selected.id);
        }

        return optionValues?.find((option) => option.value === selectedValues)
            ?.id;
    }, [optionValues, selectedValues]);

    const handleSelect = useCallback(
        (callback?: (item: SelectMenuItem<T>) => void) =>
            (item: EvergreenSelectMenuItem) => {
                const selectedValue = optionValues?.find(
                    (option) => option.id === item.value
                );

                if (selectedValue == null) {
                    return;
                }

                callback?.(selectedValue);
            },
        [optionValues]
    );

    const onDeselect = handleSelect(onDeselectValue);
    const onSelect = handleSelect(onSelectValue);

    return (
        <EvergreenSelectMenu
            {...restProps}
            onDeselect={onDeselect}
            onSelect={onSelect}
            options={options}
            selected={selected}
        />
    );
};

export type { SelectMenuItem, SelectMenuProps };
export { SelectMenu };
