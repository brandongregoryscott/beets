import { faker } from "@faker-js/faker/locale/en";
import { TrackSectionStepRecord } from "models/track-section-step-record";
import { BaseFactory } from "test/factories/base-factory";

class TrackSectionStepRecordFactory extends BaseFactory<TrackSectionStepRecord> {
    trackSectionId(trackSectionId: string): this {
        return this.associations({ track_section_id: trackSectionId });
    }
}

const TrackSectionStepRecordFactorySingleton =
    new TrackSectionStepRecordFactory(({ sequence }) => {
        return new TrackSectionStepRecord({
            index: sequence - 1,
            id: faker.datatype.uuid(),
            track_section_id: faker.datatype.uuid(),
            // Factory-created Records need to be mutable for params/overrides to be set
            // Immutability is reset in the afterBuild hook
        }).asMutable();
    });

export { TrackSectionStepRecordFactorySingleton as TrackSectionStepRecordFactory };
