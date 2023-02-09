import { sortBy } from "lodash";
import { Project, PropertySignature, VariableDeclarationKind } from "ts-morph";
import { log } from "./log";
import {
    getInterfaceName,
    getInterfaceImportPath,
    getFromFunctionName,
    getTableName,
    toKebabCase,
    joinPaths,
} from "./utils";
import { Enums } from "./constants/enums";
import { Paths } from "./constants/paths";
import { Variables } from "./constants/variables";

const { client, env, SupabaseClient, Database } = Variables;
const { name: Tables } = Enums.Tables;

const generateSupabaseClient = (
    project: Project,
    properties: PropertySignature[]
) => {
    const name = SupabaseClient;
    properties = sortBy(properties, getInterfaceName);

    const file = project.createSourceFile(
        joinPaths(Paths.base, `${toKebabCase(name)}.ts`),
        undefined,
        {
            overwrite: true,
        }
    );

    file.addImportDeclaration({
        namedImports: [Database],
        moduleSpecifier: "generated/database",
    });

    file.addImportDeclaration({
        namedImports: [Enums.Tables.name],
        moduleSpecifier: Enums.Tables.importPath,
    });

    file.addImportDeclaration({
        namedImports: ["createClient"],
        moduleSpecifier: "@supabase/supabase-js",
    });

    file.addImportDeclaration({
        namedImports: [env],
        moduleSpecifier: `utils/${env}`,
    });

    file.addVariableStatement({
        declarationKind: VariableDeclarationKind.Const,
        declarations: [
            {
                name: client,
                initializer: `createClient<${Database}>(
                    ${env}.REACT_APP_SUPABASE_URL!,
                    ${env}.REACT_APP_SUPABASE_ANON_KEY!
                )

                `,
            },
        ],
    });

    file.addVariableStatement({
        declarationKind: VariableDeclarationKind.Const,
        declarations: [
            {
                name,
                initializer: SupabaseClientInitializer(properties),
            },
        ],
    });

    file.addExportDeclaration({ namedExports: [name] });

    log.info(`Writing const '${name}' to ${file.getBaseName()}...`);
};

const SupabaseClientInitializer = (properties: PropertySignature[]) => `
    {
        ...${client},
        ${properties
            .map((property) => {
                const fromFunction = getFromFunctionName(property);
                const tableEnum = `${Tables}.${getTableName(property)}`;
                return `${fromFunction}: () => ${client}.from(${tableEnum})`;
            })
            .join(",")}
    }`;

export { generateSupabaseClient };
