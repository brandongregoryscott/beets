import { immutableAtomWithStorage } from "utils/atoms/immutable-atom-with-storage";
import type { List } from "immutable";
import { Map } from "immutable";

const SampleSelectionAtom = immutableAtomWithStorage<Map<string, List<string>>>(
    "sampleSelection",
    Map(),
    Map
);

export { SampleSelectionAtom };
