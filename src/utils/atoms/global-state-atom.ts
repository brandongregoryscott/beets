import { immutableAtomWithStorage } from "utils/atoms/immutable-atom-with-storage";
import { GlobalStateRecord } from "models/global-state-record";

const GlobalStateAtom = immutableAtomWithStorage<GlobalStateRecord>(
    "globalState",
    new GlobalStateRecord(),
    GlobalStateRecord
);

export { GlobalStateAtom };
