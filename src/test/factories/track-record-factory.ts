import { Factory } from "fishery";
import { faker } from "@faker-js/faker/locale/en";
import { TrackRecord } from "models/track-record";

const TrackRecordFactory = Factory.define<TrackRecord>(
    ({ afterBuild, sequence }) => {
        faker.seed(sequence);

        afterBuild((trackSection) => trackSection.asImmutable());

        return new TrackRecord({
            index: sequence,
            name: `Track ${sequence + 1}`,
            project_id: faker.datatype.uuid(),
            id: faker.datatype.uuid(),
            // Factory-created Records need to be mutable for params/overrides to be set
            // Immutability is reset in the afterBuild hook
        }).asMutable();
    }
);

export { TrackRecordFactory };
