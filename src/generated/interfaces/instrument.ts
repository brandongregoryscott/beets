import type { InstrumentCurve } from "generated/types/instrument-curve";
import type { Auditable } from "interfaces/auditable";

interface Instrument extends Auditable {
    curve: InstrumentCurve;
    duration: number | null;
    file_id: string;
    name: string;
    release: number | null;
    root_note: string | null;
}

export type { Instrument };
