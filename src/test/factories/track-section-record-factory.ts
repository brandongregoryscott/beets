import { Factory } from "fishery";
import { TrackSectionRecord } from "models/track-section-record";
import { faker } from "@faker-js/faker/locale/en";

const TrackSectionRecordFactory = Factory.define<TrackSectionRecord>(
    ({ afterBuild, sequence }) => {
        faker.seed(sequence);

        afterBuild((trackSection) => trackSection.asImmutable());

        return new TrackSectionRecord({
            index: sequence - 1,
            id: faker.datatype.uuid(),
            track_id: faker.datatype.uuid(),
            step_count: faker.datatype.number({ min: 1, max: 8 }),
            // Factory-created Records need to be mutable for params/overrides to be set
            // Immutability is reset in the afterBuild hook
        }).asMutable();
    }
);

export { TrackSectionRecordFactory };
