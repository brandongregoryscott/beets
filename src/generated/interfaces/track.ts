import type { Auditable } from "interfaces/auditable";

interface Track extends Auditable {
    index: number;
    /**
     * Note:
     * This is a Foreign Key to `instruments.id`.<fk table='instruments' column='id'/>
     */
    instrument_id?: string;
    mute: boolean;
    name: string;
    pan: number;
    /**
     * Note:
     * This is a Foreign Key to `projects.id`.<fk table='projects' column='id'/>
     */
    project_id: string;
    solo: boolean;
    volume: number;
}

export type { Track };
