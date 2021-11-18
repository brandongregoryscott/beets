type ExcludeImmutable<MaybeImmutable> = MaybeImmutable extends Immutable.List<
    infer ListType
>
    ? ListType extends Immutable.Record<infer BaseRecordType>
        ? BaseRecordType[]
        : ListType[]
    : MaybeImmutable extends Immutable.Record<infer BaseRecordType>
    ? BaseRecordType
    : MaybeImmutable;

export type { ExcludeImmutable };
