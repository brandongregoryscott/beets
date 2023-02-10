import { SourceFile } from "ts-morph";

const generatePublicSchemaType = (supabaseTypesFile: SourceFile) => {
    supabaseTypesFile.addTypeAlias({
        isExported: true,
        name: "PublicSchema",
        type: `Database["public"]`,
    });
};

export { generatePublicSchemaType };
