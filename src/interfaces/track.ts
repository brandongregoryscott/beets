import { List } from "immutable";
import { FileRecord } from "models/file-record";
import { MidiNote } from "reactronica";

interface Track {
    files: List<FileRecord>;
    id: string;
    mute: boolean;
    name: string;
    pan: number;
    solo: boolean;
    steps: List<MidiNote | MidiNote[] | null>;
    volume: number;
}

export type { Track };
