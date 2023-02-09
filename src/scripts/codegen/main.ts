import { Project, SyntaxKind } from "ts-morph";
import { isEmpty } from "lodash";
import { log } from "./log";
import { generateInterface } from "./generate-interface";
import { generateTablesEnum } from "./generate-tables-enum";
import { generateUseList } from "./hooks/generate-use-list";
import { generateUseGet } from "./hooks/generate-use-get";
import { generateUseDelete } from "./hooks/generate-use-delete";
import { generateUseCreateOrUpdate } from "./hooks/generate-use-create-or-update";
import { generateSupabaseClient } from "./generate-supabase-client";
import { generateEnumsFromUnions } from "./generate-enums-from-unions";
import { generateInterfaces } from "./generate-interfaces";

const project = new Project({
    tsConfigFilePath: "tsconfig.json",
});

const main = async () => {
    const supabaseTypesFile = project.getSourceFileOrThrow("database.ts");

    const publicProperty = supabaseTypesFile
        .getInterfaceOrThrow("Database")
        .getPropertyOrThrow("public");

    const tablesType = publicProperty
        .getFirstChildByKindOrThrow(SyntaxKind.TypeLiteral)
        .getPropertyOrThrow("Tables")
        .getFirstChildByKindOrThrow(SyntaxKind.TypeLiteral);

    generateInterfaces(project, tablesType);

    // generateSupabaseClient(project, properties);
    // generateTablesEnum(project, properties);

    // properties.forEach((property) => {
    //     const _interface = generateInterface(project, property);
    //     generateEnumsFromUnions(project, _interface);
    //     generateUseList(project, property);
    //     generateUseGet(project, property);
    //     generateUseDelete(project, property);
    //     generateUseCreateOrUpdate(project, property);
    // });

    await project.save();

    log.success("Successfully generated types!");
};

main();
