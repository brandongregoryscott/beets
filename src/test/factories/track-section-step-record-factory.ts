import { Factory } from "fishery";
import { faker } from "@faker-js/faker/locale/en";
import { TrackSectionStepRecord } from "models/track-section-step-record";

const TrackSectionStepRecordFactory = Factory.define<TrackSectionStepRecord>(
    ({ afterBuild, sequence }) => {
        faker.seed(sequence);

        afterBuild((trackSection) => trackSection.asImmutable());

        return new TrackSectionStepRecord({
            index: sequence,
            id: faker.datatype.uuid(),
            track_section_id: faker.datatype.uuid(),
            // Factory-created Records need to be mutable for params/overrides to be set
            // Immutability is reset in the afterBuild hook
        }).asMutable();
    }
);

export { TrackSectionStepRecordFactory };
