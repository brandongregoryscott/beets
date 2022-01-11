import { ClipboardType } from "enums/clipboard-type";
import { List } from "immutable";
import { atom, SetStateAction } from "jotai";
import { atomFamily } from "jotai/utils";
import { ClipboardItem } from "types/clipboard-item";

interface ClipboardStateAtom {
    initialValue: List<ClipboardItem>;
    type: ClipboardType;
}

const ClipboardStateAtomFamily = atomFamily<
    ClipboardStateAtom,
    List<ClipboardItem>,
    SetStateAction<List<ClipboardItem>>
>(
    (params: ClipboardStateAtom) =>
        atom<List<ClipboardItem>>(params.initialValue),
    (a, b) => a.type === b.type
);

export { ClipboardStateAtomFamily };
