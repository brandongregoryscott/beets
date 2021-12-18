import {
    majorScale,
    minorScale,
    SelectMenu as EvergreenSelectMenu,
    SelectMenuItem as EvergreenSelectMenuItem,
    SelectMenuProps as EvergreenSelectMenuProps,
} from "evergreen-ui";
import { List } from "immutable";
import _ from "lodash";
import { useCallback, useMemo } from "react";
import { isNotNilOrEmpty } from "utils/core-utils";

interface SelectMenuItem<T> extends Omit<EvergreenSelectMenuItem, "value"> {
    id: string;
    value: T;
}

const defaultHeight = majorScale(31); // Value from base component
const footerHeight = 6;

interface SelectMenuProps<T>
    extends Omit<
        EvergreenSelectMenuProps,
        "onDeselect" | "onSelect" | "options" | "selected"
    > {
    /** Calculate height of menu based on # of items */
    calculateHeight?: boolean;
    onDeselect?: (item: SelectMenuItem<T>) => void;
    onSelect?: (item: SelectMenuItem<T>) => void;
    onValueDeselect?: (value: T) => void;
    onValueSelect?: (value: T) => void;
    options?: Array<SelectMenuItem<T>>;
    selected?: T | T[] | List<T>;
}

const SelectMenu = <T,>(props: SelectMenuProps<T>) => {
    const {
        calculateHeight = false,
        closeOnSelect,
        height = defaultHeight,
        isMultiSelect = false,
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
        (
                callback?: (item: SelectMenuItem<T>) => void,
                valueCallback?: (value: T) => void
            ) =>
            (item: EvergreenSelectMenuItem) => {
                const selected = optionValues?.find(
                    (option) => option.id === item.value
                );

                if (selected == null) {
                    return;
                }

                callback?.(selected);
                valueCallback?.(selected.value);
            },
        [optionValues]
    );

    const onDeselect = handleSelect(props?.onDeselect, props?.onValueDeselect);
    const onSelect = handleSelect(props?.onSelect, props?.onValueSelect);

    return (
        <EvergreenSelectMenu
            {...restProps}
            closeOnSelect={closeOnSelect ?? !isMultiSelect}
            height={calculateHeightFromProps({
                calculateHeight,
                height,
                options: optionValues ?? [],
                hasTitle: isNotNilOrEmpty(props.title),
            })}
            isMultiSelect={isMultiSelect}
            onDeselect={onDeselect}
            onSelect={onSelect}
            options={options}
            selected={selected}
        />
    );
};

const calculateHeightFromProps = <T,>(
    props: Required<
        Pick<
            SelectMenuProps<T>,
            "calculateHeight" | "hasTitle" | "height" | "options"
        >
    >
): number | string | undefined => {
    const { calculateHeight, hasTitle, height: exactHeight, options } = props;

    if (!calculateHeight) {
        return Number(exactHeight) - footerHeight;
    }

    const headerHeight = minorScale(10);
    const itemHeight = minorScale(9);
    const optionCount = options?.length ?? 0;
    let height = itemHeight * optionCount;
    if (hasTitle) {
        height = height + headerHeight;
    }

    return height - footerHeight;
};

export type { SelectMenuItem, SelectMenuProps };
export { SelectMenu };
