import { Factory } from "fishery";
import { faker } from "@faker-js/faker/locale/en";
import { ProjectRecord } from "models/project-record";

const ProjectRecordFactory = Factory.define<ProjectRecord>(({ sequence }) => {
    faker.seed(sequence);

    return new ProjectRecord({
        name: faker.music.songName(),
        id: faker.datatype.uuid(),
    });
});

export { ProjectRecordFactory };
