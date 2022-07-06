import type { FileRecord } from "models/file-record";
import { InstrumentRecord } from "models/instrument-record";
import { List } from "immutable";
import { findFileByName } from "utils/file-utils";
import { InstrumentCurve } from "generated/enums/instrument-curve";

const buildDemoInstruments = (
    files?: List<FileRecord>
): List<InstrumentRecord> => {
    const etherealPad = new InstrumentRecord().merge({
        id: "ethereal-pad",
        name: "Ethereal Pad",
        release: 1,
        file_id: findFileByName("Pad-3", files)?.id,
        root_note: "B5",
    });

    const moodyPad = new InstrumentRecord().merge({
        id: "moody-pad",
        name: "Moody Pad",
        release: 1,
        file_id: findFileByName("Pad-17", files)?.id,
        root_note: "B5",
    });

    const wavyPad = new InstrumentRecord().merge({
        id: "wavy-pad",
        name: "Wavy Pad",
        release: 1,
        curve: InstrumentCurve.Exponential,
        file_id: findFileByName("Pad-18", files)?.id,
        root_note: "E5",
    });

    return List.of(etherealPad, moodyPad, wavyPad);
};

export { buildDemoInstruments };
