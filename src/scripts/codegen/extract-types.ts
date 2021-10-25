import { Project, SyntaxKind } from "ts-morph";
import _ from "lodash";
import pluralize from "pluralize";
import openapi from "openapi-typescript";
import { env } from "../../utils/env";

const basePath = "src/interfaces/generated";
const project = new Project({
    tsConfigFilePath: "tsconfig.json",
});

const createSupabaseTypesFile = async () => {
    const output = await openapi(
        `${env.REACT_APP_SUPABASE_URL}/rest/v1/?apikey=${env.REACT_APP_SUPABASE_ANON_KEY}`
    );

    return project.createSourceFile(`${basePath}/supabase.ts`, output);
};

const main = async () => {
    const supabaseFile = await createSupabaseTypesFile();

    const types =
        supabaseFile?.getInterfaceOrThrow("definitions")?.getProperties() ?? [];

    if (_.isEmpty(types)) {
        console.log(
            "[WARN] Found no properties on 'definitions' interface, exiting."
        );
        process.exit(1);
    }

    types.forEach((rawType) => {
        const name = _.capitalize(pluralize(rawType.getName(), 1));
        const filename = `${name.toLowerCase()}.ts`;
        const file = project.createSourceFile(
            `${basePath}/${filename}`,
            undefined,
            { overwrite: true }
        );

        const typeLiteral = rawType.getChildrenOfKind(
            SyntaxKind.TypeLiteral
        )[0];

        file.addInterface({
            name,
            properties: typeLiteral
                .getProperties()
                .map((e) => e.getStructure()),
        });

        file.addExportDeclaration({ namedExports: [name], isTypeOnly: true });

        console.log(`[INFO] Writing ${file.getBaseName()}...`);
    });

    await project.save();
};

main();
