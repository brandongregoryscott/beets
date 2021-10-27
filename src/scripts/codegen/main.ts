import { Project } from "ts-morph";
import _ from "lodash";
import { log } from "./log";
import { generateInterface } from "./generate-interface";
import { generateSupabase } from "./generate-supabase";
import { generateEnum } from "./generate-enum";
import { generateHook } from "./generate-hook";

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

    generateEnum(project, properties);

    properties.forEach((property) => {
        generateInterface(project, property);
    });

    generateHook(project, properties);

    await project.save();

    log.success("Successfully generated types!");
};

main();
