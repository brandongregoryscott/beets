import { Auditable } from "interfaces/auditable";

interface TrackSectionStep extends Auditable {
    /**
     * Note:
     * This is a Foreign Key to `files.id`.<fk table='files' column='id'/>
     */
    file_id: string;
    index: number;
    /**
     * Note:
     * This is a Foreign Key to `track_sections.id`.<fk table='track_sections' column='id'/>
     */
    track_section_id: string;
}

export type { TrackSectionStep };
