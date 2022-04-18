import { SelectMenuItem } from "components/select-menu";
import { SortOrder } from "enums/sort-order";
import { titleCase } from "humanize-plus";
import { SortOptions } from "interfaces/sort-options";
import { flatMap, kebabCase } from "lodash";

const enumToSelectMenuItems = <TValue, TEnum extends Record<string, TValue>>(
    value: TEnum
): Array<SelectMenuItem<TValue>> =>
    Object.entries(value).map(([label, value]) => ({
        id: label,
        label,
        value,
    }));

const formatSortOptionLabel = <T>(key: keyof T, sortOrder: SortOrder) =>
    `${titleCase((key as string).replace(/_/, " "))} (${sortOrder})`;

const toSortOptions = <T>(
    keys: Array<keyof T>
): Array<SelectMenuItem<SortOptions<T>>> =>
    flatMap(keys, (key) =>
        Object.values(SortOrder).map((sortOrder) =>
            toSortOption(key, sortOrder)
        )
    );

const toSortOption = <T>(
    key: keyof T,
    sortOrder: SortOrder
): SelectMenuItem<SortOptions<T>> => ({
    label: formatSortOptionLabel(key, sortOrder),
    id: kebabCase(`${key}-${sortOrder}`),
    value: {
        column: key,
        order: sortOrder,
    },
});

export { enumToSelectMenuItems, formatSortOptionLabel, toSortOptions };
