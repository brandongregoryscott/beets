import { faker } from "@faker-js/faker/locale/en";
import { ProjectRecord } from "models/project-record";
import { BaseFactory } from "test/factories/base-factory";

const ProjectRecordFactory = new BaseFactory<ProjectRecord>(() => {
    return new ProjectRecord({
        name: faker.music.songName(),
        id: faker.datatype.uuid(),
        // Factory-created Records need to be mutable for params/overrides to be set
        // Immutability is reset in the afterBuild hook
    }).asMutable();
});

export { ProjectRecordFactory };
