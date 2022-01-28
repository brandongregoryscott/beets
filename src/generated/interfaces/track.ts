import { Auditable } from "interfaces/auditable";

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
    /**
     * Note:
     * This is a Foreign Key to `instruments.id`.<fk table='instruments' column='id'/>
     */
    instrument_id?: string;
}

export type { Track };
