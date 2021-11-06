import _ from "lodash";
import { Project, PropertySignature, VariableDeclarationKind } from "ts-morph";
import { log } from "../log";
import {
    getInterfaceName,
    getInterfaceImportPath,
    getFromFunctionName,
    getTableName,
    toKebabCase,
    getRecordName,
    getRecordImportPath,
    getRecordSourceFile,
} from "../utils";
import upath from "upath";
import { Paths } from "../constants/paths";
import { Enums } from "../constants/enums";
import { Hooks } from "../constants/hooks";

const id = "id";

const generateUseGet = (project: Project, property: PropertySignature) => {
    const entityName = getInterfaceName(property);
    const name = `useGet${entityName}`;
    const filename = `${toKebabCase(name)}.ts`;
    const recordSourceFile = getRecordSourceFile(project, property);

    const file = project.createSourceFile(
        upath.join(
            Paths.base,
            "hooks",
            "domain",
            getTableName(property).toLowerCase(),
            filename
        ),
        undefined,
        { overwrite: true }
    );

    if (recordSourceFile != null) {
        file.addImportDeclaration({
            namedImports: [getRecordName(property)],
            moduleSpecifier: getRecordImportPath(property),
        });
    }

    if (recordSourceFile == null) {
        file.addImportDeclaration({
            namedImports: [getInterfaceName(property)],
            moduleSpecifier: getInterfaceImportPath(property),
        });
    }

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

    file.addInterface({
        name: getOptionsInterfaceName(property),
        properties: [
            {
                name: id,
                hasQuestionToken: false,
                type: "string",
            },
        ],
    });

    file.addVariableStatement({
        declarationKind: VariableDeclarationKind.Const,
        declarations: [
            {
                name,
                initializer: useGetInitializer(
                    property,
                    recordSourceFile != null
                ),
            },
        ],
    });

    file.addExportDeclaration({ namedExports: [name] });

    log.info(`Writing hook '${name}' to ${file.getBaseName()}...`);
};

const getOptionsInterfaceName = (property: PropertySignature) =>
    `UseGet${getInterfaceName(property)}Options`;

const useGetInitializer = (property: PropertySignature, useRecord: boolean) => {
    const interfaceName = getInterfaceName(property);
    const recordName = getRecordName(property);
    const fromTable = getFromFunctionName(property);
    const key = `${Enums.Tables.name}.${getTableName(property)}`;
    const optionsInterfaceName = getOptionsInterfaceName(property);
    const returnType = `${useRecord ? recordName : interfaceName} | undefined`;
    const returnValue = !useRecord ? "data" : `new ${recordName}(data)`;
    return `(options: ${optionsInterfaceName}): UseQueryResult<${returnType}, Error> => {
        const { ${fromTable} } = useDatabase();
        const { ${id} } = options;

        const result = useQuery<${returnType}, Error>({
            key: ${key},
            fn: async () => {
                const query = ${fromTable}()
                    .select("*")
                    .eq("${id}", ${id})
                    .limit(1)
                    .single();
                const { data, error } = await query;
                if (error != null) {
                    throw error;
                }

                if (data == null) {
                    return undefined;
                }

                return ${returnValue};
            },
        });

        return result;
    }`;
};

export { generateUseGet };
