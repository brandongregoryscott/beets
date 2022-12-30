import { Factory } from "fishery";
import { faker } from "@faker-js/faker/locale/en";
import { TrackRecord } from "models/track-record";

const TrackRecordFactory = Factory.define<TrackRecord>(({ sequence }) => {
    faker.seed(sequence);

    return new TrackRecord({
        index: sequence,
        name: `Track ${sequence + 1}`,
        project_id: faker.datatype.uuid(),
        id: faker.datatype.uuid(),
    });
});

export { TrackRecordFactory };
