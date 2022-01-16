import { PickByValueExact } from "types/pick-by-value-exact";

type PickKeysOfType<T, KeyType> = keyof PickByValueExact<T, KeyType>;

export type { PickKeysOfType };
