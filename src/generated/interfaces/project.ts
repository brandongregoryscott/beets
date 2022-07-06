import type { Auditable } from "interfaces/auditable";

interface Project extends Auditable {
    bpm: number;
    name: string;
    swing: number;
    volume: number;
}

export type { Project };
