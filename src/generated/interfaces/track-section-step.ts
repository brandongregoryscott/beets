import type { Auditable } from "interfaces/auditable";

interface TrackSectionStep extends Auditable {
    file_id: string | null;
    index: number;
    note: string | null;
    track_section_id: string;
}

export type { TrackSectionStep };
