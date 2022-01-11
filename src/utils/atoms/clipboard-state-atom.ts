import { List } from "immutable";
import { atom } from "jotai";
import { ClipboardItem } from "types/clipboard-item";

const ClipboardStateAtom = atom<List<ClipboardItem>>(List<ClipboardItem>());

export { ClipboardStateAtom };
