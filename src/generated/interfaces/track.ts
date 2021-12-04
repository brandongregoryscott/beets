import { Auditable } from "interfaces/auditable";
import { TrackType } from "generated/enums/track-type";

interface Track extends Auditable {
    index: number;
    name: string;
    mute: boolean;
    solo: boolean;
    pan: number;
    /**
     * Note:
     * This is a Foreign Key to `projects.id`.<fk table='projects' column='id'/>
     */
    project_id: string;
    volume: number;
    type: TrackType;
}

export type { Track };
