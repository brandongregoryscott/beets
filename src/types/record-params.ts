import { ExcludeImmutable } from "types/exclude-immutable";

type RecordParams<T> = T extends Immutable.Record<infer X>
    ? ExcludeImmutable<RecordParams<X>>
    : Partial<{
          [Property in keyof T]: T[Property] | ExcludeImmutable<T[Property]>;
      }>;

export type { RecordParams };
