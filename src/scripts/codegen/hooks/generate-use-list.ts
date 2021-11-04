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

const generateUseList = (project: Project, property: PropertySignature) => {
    const entityName = getTableName(property);
    const lowerCaseEntityName = entityName.toLowerCase();
    const name = `useList${entityName}`;
    const filename = `${toKebabCase(name)}.ts`;

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

const useListInitializer = (property: PropertySignature) => {
    const interfaceName = getInterfaceName(property);
    const fromTable = getFromFunctionName(property);
    const key = `${Enums.Tables.name}.${getTableName(property)}`;
    return `(): UseQueryResult<${interfaceName}[], Error> => {
        const { ${fromTable} } = useDatabase();
        const listQuery = useQuery<${interfaceName}[], Error>({
            key: ${key},
            fn: async () => {
                const result = await ${fromTable}().select("*");
                const { data, error } = result;
                if (error != null) {
                    throw error;
                }

                return data ?? [];
            },
        });

        return listQuery;
    }`;
};

export { generateUseList };
