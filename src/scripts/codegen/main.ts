import { Project, SyntaxKind } from "ts-morph";
import { log } from "./log";
import { generateInterfaces } from "./generate-interfaces";
import { generateSupabaseClient } from "./generate-supabase-client";
import { generateTablesEnum } from "./generate-tables-enum";

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

    const properties = tablesType.getProperties();

    generateTablesEnum(project, properties);
    generateSupabaseClient(project, properties);

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
