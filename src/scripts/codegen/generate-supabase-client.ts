import _ from "lodash";
import { Project, PropertySignature, VariableDeclarationKind } from "ts-morph";
import { log } from "./log";
import {
    getInterfaceName,
    getInterfaceImportPath,
    getFromFunctionName,
    getTableName,
    toKebabCase,
} from "./utils";
import { Enums } from "./constants/enums";
import upath from "upath";
import { Paths } from "./constants/paths";
import { Variables } from "./constants/variables";

const { client, env, SupabaseClient } = Variables;
const { name: Tables } = Enums.Tables;

const generateSupabaseClient = (
    project: Project,
    properties: PropertySignature[]
) => {
    const name = SupabaseClient;

    const file = project.createSourceFile(
        upath.join(Paths.base, `${toKebabCase(name)}.ts`),
        undefined,
        {
            overwrite: true,
        }
    );

    file.addImportDeclarations(
        properties.map((property) => ({
            namedImports: [getInterfaceName(property)],
            moduleSpecifier: getInterfaceImportPath(property),
        }))
    );

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
                initializer: `createClient(
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
                const fromTyped = `from<${getInterfaceName(property)}>`;
                const tableEnum = `${Tables}.${getTableName(property)}`;
                return `${fromFunction}: () => ${client}.${fromTyped}(${tableEnum})`;
            })
            .join(",")}
    }`;

export { generateSupabaseClient };
