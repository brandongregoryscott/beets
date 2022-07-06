import type { PagingOptions } from "interfaces/paging-options";
import type { SortOptions } from "interfaces/sort-options";

interface SearchOptions<T = any> extends PagingOptions, SortOptions<T> {}

export type { SearchOptions };
