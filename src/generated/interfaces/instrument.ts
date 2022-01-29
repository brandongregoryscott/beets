import { Auditable } from "interfaces/auditable";
import { InstrumentCurve } from "generated/enums/instrument-curve";

interface Instrument extends Auditable {
    curve: InstrumentCurve;
    duration?: number;
    /**
     * Note:
     * This is a Foreign Key to `files.id`.<fk table='files' column='id'/>
     */
    file_id: string;
    name: string;
    release?: number;
    root_note?: string;
}

export type { Instrument };
