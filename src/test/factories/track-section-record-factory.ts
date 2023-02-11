import { TrackSectionRecord } from "models/track-section-record";
import { faker } from "@faker-js/faker/locale/en";
import { BaseFactory } from "test/factories/base-factory";

class TrackSectionRecordFactory extends BaseFactory<TrackSectionRecord> {
    trackId(trackId: string): this {
        return this.associations({ track_id: trackId });
    }
}

const TrackSectionRecordFactorySingleton = new TrackSectionRecordFactory(
    ({ sequence }) => {
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

export { TrackSectionRecordFactorySingleton as TrackSectionRecordFactory };
