import type { Auditable } from "interfaces/auditable";

interface TrackSection extends Auditable {
    index: number;
    step_count: number;
    track_id: string;
}

export type { TrackSection };
