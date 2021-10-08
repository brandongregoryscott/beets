import { RequiredOr } from "types/required-or";

type RequiredOrUndefined<T> = RequiredOr<T, undefined>;

export type { RequiredOrUndefined };
