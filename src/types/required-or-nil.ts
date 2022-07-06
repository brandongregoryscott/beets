import type { RequiredOr } from "types/required-or";

type RequiredOrNil<T> = RequiredOr<T, null | undefined>;

export type { RequiredOrNil };
