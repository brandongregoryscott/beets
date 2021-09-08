import { SortOrder } from "enums/sort-order";

interface SortOptions<T = any> {
    column?: keyof T;
    order?: SortOrder;
}

export type { SortOptions };
