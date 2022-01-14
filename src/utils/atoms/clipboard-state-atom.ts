import { List } from "immutable";
import { atom } from "jotai";
import { ClipboardItem } from "types/clipboard-item";

const CopiedClipboardStateAtom = atom<List<ClipboardItem>>(
    List<ClipboardItem>()
);
const SelectedClipboardStateAtom = atom<List<ClipboardItem>>(
    List<ClipboardItem>()
);

export { CopiedClipboardStateAtom, SelectedClipboardStateAtom };
