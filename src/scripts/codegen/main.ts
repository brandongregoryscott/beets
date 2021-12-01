import { Project } from "ts-morph";
import _ from "lodash";
import { log } from "./log";
import { generateInterface } from "./generate-interface";
import { generateSupabaseTypes } from "./generate-supabase-types";
import { generateTablesEnum } from "./generate-tables-enum";
import { generateUseList } from "./hooks/generate-use-list";
import { generateUseGet } from "./hooks/generate-use-get";
import { generateUseDelete } from "./hooks/generate-use-delete";
import { generateUseCreateOrUpdate } from "./hooks/generate-use-create-or-update";
import { generateSupabaseClient } from "./generate-supabase-client";
import { generateEnumsFromUnions } from "./generate-enums-from-unions";

const project = new Project({
    tsConfigFilePath: "tsconfig.json",
});

const main = async () => {
    const supabaseTypesFile = await generateSupabaseTypes(project);
    const properties =
        supabaseTypesFile
            ?.getInterfaceOrThrow("definitions")
            ?.getProperties() ?? [];

    if (_.isEmpty(properties)) {
        log.error("Found no properties on 'definitions' interface, exiting.");
        process.exit(1);
    }

    generateSupabaseClient(project, properties);
    generateTablesEnum(project, properties);

    properties.forEach((property) => {
        generateInterface(project, property);
        generateEnumsFromUnions(project, property);
        generateUseList(project, property);
        generateUseGet(project, property);
        generateUseDelete(project, property);
        generateUseCreateOrUpdate(project, property);
    });

    await project.save();

    log.success("Successfully generated types!");
};

main();
