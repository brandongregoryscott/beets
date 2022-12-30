import { Factory } from "fishery";
import { faker } from "@faker-js/faker/locale/en";
import { TrackSectionStepRecord } from "models/track-section-step-record";

const TrackSectionStepRecordFactory = Factory.define<TrackSectionStepRecord>(
    ({ sequence }) => {
        faker.seed(sequence);

        return new TrackSectionStepRecord({
            index: sequence,
            id: faker.datatype.uuid(),
            track_section_id: faker.datatype.uuid(),
        });
    }
);

export { TrackSectionStepRecordFactory };
