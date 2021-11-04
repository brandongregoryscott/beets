import _ from "lodash";
import { Project, PropertySignature, VariableDeclarationKind } from "ts-morph";
import { log } from "../log";
import {
    getInterfaceName,
    getInterfaceImportPath,
    getFromFunctionName,
    getTableName,
    toKebabCase,
} from "../utils";
import upath from "upath";
import { Paths } from "../constants/paths";
import { Enums } from "../constants/enums";
import { Hooks } from "../constants/hooks";

const PostgrestFilterBuilder = "PostgrestFilterBuilder";

const generateUseList = (project: Project, property: PropertySignature) => {
    const entityName = getTableName(property);
    const lowerCaseEntityName = entityName.toLowerCase();
    const name = `useList${entityName}`;
    const filename = `${toKebabCase(name)}.ts`;
    const interfaceName = getInterfaceName(property);

    const file = project.createSourceFile(
        upath.join(
            Paths.base,
            "hooks",
            "domain",
            lowerCaseEntityName,
            filename
        ),
        undefined,
        { overwrite: true }
    );

    file.addImportDeclaration({
        namedImports: [getInterfaceName(property)],
        moduleSpecifier: getInterfaceImportPath(property),
    });

    file.addImportDeclaration({
        namedImports: [Enums.Tables.name],
        moduleSpecifier: Enums.Tables.importPath,
    });

    file.addImportDeclaration({
        namedImports: [Hooks.useDatabase.name],
        moduleSpecifier: Hooks.useDatabase.importPath,
    });

    file.addImportDeclaration({
        namedImports: ["useQuery", "UseQueryResult"],
        moduleSpecifier: "utils/hooks/use-query",
    });

    file.addImportDeclaration({
        namedImports: [PostgrestFilterBuilder],
        moduleSpecifier: "@supabase/postgrest-js",
    });

    file.addInterface({
        name: `UseList${getTableName(property)}Options`,
        properties: [
            {
                name: "filter",
                hasQuestionToken: true,
                type: `(query: ${PostgrestFilterBuilder}<${interfaceName}>) => ${PostgrestFilterBuilder}<${interfaceName}>`,
            },
        ],
    });

    file.addVariableStatement({
        declarationKind: VariableDeclarationKind.Const,
        declarations: [
            {
                name,
                initializer: useListInitializer(property),
            },
        ],
    });

    file.addExportDeclaration({ namedExports: [name] });

    log.info(`Writing hook '${name}' to ${file.getBaseName()}...`);
};

const getOptionsInterfaceName = (property: PropertySignature) =>
    `UseList${getTableName(property)}Options`;

const useListInitializer = (property: PropertySignature) => {
    const interfaceName = getInterfaceName(property);
    const fromTable = getFromFunctionName(property);
    const key = `${Enums.Tables.name}.${getTableName(property)}`;
    const optionsInterfaceName = getOptionsInterfaceName(property);

    return `(options?: ${optionsInterfaceName}): UseQueryResult<${interfaceName}[], Error> => {
        const { ${fromTable} } = useDatabase();
        const { filter } = options ?? {};

        const result = useQuery<${interfaceName}[], Error>({
            key: ${key},
            fn: async () => {
                let query = ${fromTable}().select("*");
                if (filter != null) {
                    query = filter(query);
                }

                const { data, error } = await query;
                if (error != null) {
                    throw error;
                }

                return data ?? [];
            },
        });

        return result;
    }`;
};

export { generateUseList };
