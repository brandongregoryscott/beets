import { Project, SyntaxKind } from "ts-morph";
import { log } from "./log";
import { generateInterfaces } from "./generate-interfaces";
import { generateSupabaseClient } from "./generate-supabase-client";
import { generateTablesEnum } from "./generate-tables-enum";
import { generateEnumsFromUnions } from "./generate-enums-from-unions";
import { generateUseList } from "./hooks/generate-use-list";
import { generatePublicSchemaType } from "./generate-public-schema-type";
import { generateUseGet } from "./hooks/generate-use-get";

const project = new Project({
    tsConfigFilePath: "tsconfig.json",
});

const main = async () => {
    const supabaseTypesFile = project.getSourceFileOrThrow("database.ts");

    generatePublicSchemaType(supabaseTypesFile);

    const publicProperty = supabaseTypesFile
        .getInterfaceOrThrow("Database")
        .getPropertyOrThrow("public");

    const tablesType = publicProperty
        .getFirstChildByKindOrThrow(SyntaxKind.TypeLiteral)
        .getPropertyOrThrow("Tables")
        .getFirstChildByKindOrThrow(SyntaxKind.TypeLiteral);

    const enumsType = publicProperty
        .getFirstChildByKindOrThrow(SyntaxKind.TypeLiteral)
        .getPropertyOrThrow("Enums")
        .getFirstChildByKindOrThrow(SyntaxKind.TypeLiteral);

    generateEnumsFromUnions(project, enumsType);

    generateInterfaces(project, tablesType);

    const properties = tablesType.getProperties();

    generateTablesEnum(project, properties);
    generateSupabaseClient(project, properties);

    properties.forEach((property) => {
        generateUseList(project, property);
        generateUseGet(project, property);
        //     generateUseDelete(project, property);
        //     generateUseCreateOrUpdate(project, property);
    });

    await project.save();

    log.success("Successfully generated types!");
};

main();
