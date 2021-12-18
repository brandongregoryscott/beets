import { SelectMenuItem } from "components/select-menu";

const enumToSelectMenuItems = <TValue, TEnum extends Record<string, TValue>>(
    value: TEnum
): Array<SelectMenuItem<TValue>> =>
    Object.entries(value).map(([label, value]) => ({
        id: label,
        label,
        value,
    }));

export { enumToSelectMenuItems };
