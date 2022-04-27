import { RequiredOr } from "types/required-or";

type RequiredOrNil<T> = RequiredOr<T, undefined | null>;

export type { RequiredOrNil };
