import { Factory } from "fishery";
import { TrackSectionRecord } from "models/track-section-record";
import { faker } from "@faker-js/faker/locale/en";

const TrackSectionRecordFactory = Factory.define<TrackSectionRecord>(
    ({ sequence }) => {
        faker.seed(sequence);

        return new TrackSectionRecord({
            index: sequence,
            id: faker.datatype.uuid(),
            track_id: faker.datatype.uuid(),
            step_count: faker.datatype.number({ min: 1, max: 8 }),
        });
    }
);

export { TrackSectionRecordFactory };
