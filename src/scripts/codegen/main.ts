import { Project } from "ts-morph";
import _ from "lodash";
import { log } from "./log";
import { generateInterface } from "./generate-interface";
import { generateSupabase } from "./generate-supabase";
import { generateTablesEnum } from "./generate-tables-enum";
import { generateUseDatabase } from "./hooks/generate-use-database";
import { generateUseList } from "./hooks/generate-use-list";
import { generateUseGet } from "./hooks/generate-use-get";
import { generateUseCreate } from "./hooks/generate-use-create";
import { generateUseDelete } from "./hooks/generate-use-delete";
import { generateUseUpdate } from "./hooks/generate-use-update";
import { generateUseCreateOrUpdate } from "./hooks/generate-use-create-or-update";

const project = new Project({
    tsConfigFilePath: "tsconfig.json",
});

const main = async () => {
    const supabaseFile = await generateSupabase(project);
    const properties =
        supabaseFile?.getInterfaceOrThrow("definitions")?.getProperties() ?? [];

    if (_.isEmpty(properties)) {
        log.error("Found no properties on 'definitions' interface, exiting.");
        process.exit(1);
    }

    generateTablesEnum(project, properties);

    properties.forEach((property) => {
        generateInterface(project, property);
        generateUseList(project, property);
        generateUseGet(project, property);
        generateUseCreate(project, property);
        generateUseDelete(project, property);
        generateUseUpdate(project, property);
        generateUseCreateOrUpdate(project, property);
    });

    generateUseDatabase(project, properties);

    await project.save();

    log.success("Successfully generated types!");
};

main();
