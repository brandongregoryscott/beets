import { PagingOptions } from "interfaces/paging-options";
import { SortOptions } from "interfaces/sort-options";

interface SearchOptions<T = any> extends PagingOptions, SortOptions<T> {}

export type { SearchOptions };
