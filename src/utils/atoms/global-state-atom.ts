import { immutableAtomWithStorage } from "utils/atoms/immutable-atom-with-storage";
import { GlobalStateRecord } from "models/global-state-record";

const GlobalStateAtom = immutableAtomWithStorage<GlobalStateRecord>(
    "globalState",
    new GlobalStateRecord(),
    (args) => new GlobalStateRecord(args)
);

export { GlobalStateAtom };
