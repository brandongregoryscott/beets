/**
 * Mark all properties of `T` as required from the original type _or_ another type
 */
type RequiredOr<T, TOrType> = {
    [Property in keyof Required<T>]: T[Property] | TOrType;
};

export type { RequiredOr };
