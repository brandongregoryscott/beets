import { List } from "immutable";
import { atom } from "jotai";
import type { ClipboardItem } from "types/clipboard-item";

const SelectedClipboardStateAtom = atom<List<ClipboardItem>>(
    List<ClipboardItem>()
);

export { SelectedClipboardStateAtom };
