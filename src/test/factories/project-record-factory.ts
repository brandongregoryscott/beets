import { Factory } from "fishery";
import { faker } from "@faker-js/faker/locale/en";
import { ProjectRecord } from "models/project-record";

const ProjectRecordFactory = Factory.define<ProjectRecord>(
    ({ afterBuild, sequence }) => {
        faker.seed(sequence);

        afterBuild((project) => project.asImmutable());

        return new ProjectRecord({
            name: faker.music.songName(),
            id: faker.datatype.uuid(),
            // Factory-created Records need to be mutable for params/overrides to be set
            // Immutability is reset in the afterBuild hook
        }).asMutable();
    }
);

export { ProjectRecordFactory };