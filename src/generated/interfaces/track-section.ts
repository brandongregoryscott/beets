import type { Auditable } from "interfaces/auditable";

interface TrackSection extends Auditable {
    index: number;
    step_count: number;
    /**
     * Note:
     * This is a Foreign Key to `tracks.id`.<fk table='tracks' column='id'/>
     */
    track_id: string;
}

export type { TrackSection };
