import { immutableAtomWithStorage } from "utils/atoms/immutable-atom-with-storage";
import { Map, List } from "immutable";

const SampleSelectionAtom = immutableAtomWithStorage<Map<string, List<string>>>(
    "sampleSelection",
    Map(),
    Map
);

export { SampleSelectionAtom };
