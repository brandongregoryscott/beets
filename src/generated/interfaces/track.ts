import type { Auditable } from "interfaces/auditable";

interface Track extends Auditable {
    index: number;
    instrument_id: string | null;
    mute: boolean;
    name: string;
    pan: number;
    project_id: string;
    solo: boolean;
    volume: number;
}

export type { Track };
