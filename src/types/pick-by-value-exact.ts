/**
 * PickByValueExact
 * @desc From `T` pick a set of properties by value matching exact `ValueType`.
 * @example
 *   type Props = { req: number; reqUndef: number | undefined; opt?: string; };
 *
 *   // Expect: { req: number }
 *   type Props = PickByValueExact<Props, number>;
 *   // Expect: { reqUndef: number | undefined; }
 *   type Props = PickByValueExact<Props, number | undefined>;
 *
 * @see https://github.com/piotrwitek/utility-types/blob/master/src/mapped-types.ts#L196-L216
 */
type PickByValueExact<T, ValueType> = Pick<
    T,
    {
        [Key in keyof T]-?: [ValueType] extends [T[Key]]
            ? [T[Key]] extends [ValueType]
                ? Key
                : never
            : never;
    }[keyof T]
>;

export type { PickByValueExact };
