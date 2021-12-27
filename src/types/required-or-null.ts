import { RequiredOr } from "types/required-or";

type RequiredOrNull<T> = RequiredOr<T, null>;

export type { RequiredOrNull as RequiredOrNull };
