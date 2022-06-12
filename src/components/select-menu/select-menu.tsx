import {
    majorScale,
    minorScale,
    SelectMenu as EvergreenSelectMenu,
    SelectMenuItem as EvergreenSelectMenuItem,
    SelectMenuProps as EvergreenSelectMenuProps,
} from "evergreen-ui";
import { List } from "immutable";
import { intersectionWith, isArray, pick } from "lodash";
import { useCallback, useMemo } from "react";
import { isEqual, isNotNilOrEmpty } from "utils/core-utils";

type FirstParameter<TFunction extends ((...args: any[]) => any) | undefined> =
    Parameters<NonNullable<TFunction>>[0];

type EvergreenSelectMenuItemRenderer = EvergreenSelectMenuProps["itemRenderer"];

interface SelectMenuProps<T>
    extends Omit<
        EvergreenSelectMenuProps,
        "itemRenderer" | "onDeselect" | "onSelect" | "options" | "selected"
    > {
    /** Calculate height of menu based on # of items */
    calculateHeight?: boolean;
    itemRenderer?: (props: SelectMenuItemRendererProps<T>) => React.ReactNode;
    onDeselect?: (item: SelectMenuItem<T>) => void;
    onSelect?: (item: SelectMenuItem<T>) => void;
    onValueDeselect?: (value: T) => void;
    onValueSelect?: (value: T) => void;
    options?: Array<SelectMenuItem<T>>;
    selected?: List<T> | T | T[];
}

interface SelectMenuItem<T> extends Omit<EvergreenSelectMenuItem, "value"> {
    id: string;
    value: T;
}

interface SelectMenuItemRendererProps<T>
    extends Omit<FirstParameter<EvergreenSelectMenuItemRenderer>, "item"> {
    item: SelectMenuItem<T>;
}

const defaultHeight = majorScale(31); // Value from base component
const footerHeight = 6;

const SelectMenu = <T,>(props: SelectMenuProps<T>) => {
    const {
        calculateHeight = false,
        closeOnSelect,
        height = defaultHeight,
        isMultiSelect = false,
        options: optionValues,
        selected: selectedValues,
        itemRenderer: typedItemRenderer,
        ...restProps
    } = props;

    const options: EvergreenSelectMenuItem[] | undefined = useMemo(
        () =>
            optionValues?.map((optionValue) => ({
                ...pick<SelectMenuItem<T>, keyof SelectMenuItem<T>>(
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

        if (isArray(_selectedValues)) {
            return intersectionWith(
                optionValues,
                _selectedValues,
                (option, selected) => isEqual(option.value, selected)
            ).map((selected) => selected.id);
        }

        return optionValues?.find((option) =>
            isEqual(option.value, selectedValues)
        )?.id;
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

    const wrappedItemRenderer = useCallback(
        (props: FirstParameter<EvergreenSelectMenuItemRenderer>) => {
            const { item, ...rest } = props;
            const value = optionValues?.find(
                (option) => option.id === item.value
            );

            if (value == null) {
                return undefined;
            }

            return typedItemRenderer?.({ item: value, ...rest });
        },
        [optionValues, typedItemRenderer]
    );

    const itemRenderer = useMemo(
        () => (typedItemRenderer != null ? wrappedItemRenderer : undefined),
        [typedItemRenderer, wrappedItemRenderer]
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
            itemRenderer={itemRenderer as EvergreenSelectMenuItemRenderer}
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

export type { SelectMenuItem, SelectMenuItemRendererProps, SelectMenuProps };
export { SelectMenu };
