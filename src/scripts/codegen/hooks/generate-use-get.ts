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
    getHookName,
    getHookOptionsInterfaceName,
} from "../utils";
import upath from "upath";
import { Paths } from "../constants/paths";
import { Enums } from "../constants/enums";
import { Hooks } from "../constants/hooks";
import { HookAction } from "../enums/hook-action";

const id = "id";
const { interfaceName: UseQueryResult, name: useQuery } = Hooks.useQuery;
const { name: useDatabase } = Hooks.useDatabase;

const generateUseGet = (project: Project, property: PropertySignature) => {
    const name = getHookName(property, HookAction.GET);
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
        namedImports: [useDatabase],
        moduleSpecifier: Hooks.useDatabase.importPath,
    });

    file.addImportDeclaration({
        namedImports: [useQuery, UseQueryResult],
        moduleSpecifier: Hooks.useQuery.importPath,
    });

    file.addInterface({
        name: getHookOptionsInterfaceName(property, HookAction.GET),
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

const useGetInitializer = (property: PropertySignature, useRecord: boolean) => {
    const interfaceName = getInterfaceName(property);
    const recordName = getRecordName(property);
    const fromTable = getFromFunctionName(property);
    const key = `${Enums.Tables.name}.${getTableName(property)}`;
    const optionsInterfaceName = getHookOptionsInterfaceName(
        property,
        HookAction.GET
    );
    const returnType = `${useRecord ? recordName : interfaceName} | undefined`;
    const returnValue = !useRecord ? "data" : `new ${recordName}(data)`;
    return `(options: ${optionsInterfaceName}): ${UseQueryResult}<${returnType}, Error> => {
        const { ${fromTable} } = ${useDatabase}();
        const { ${id} } = options;

        const get = async () => {
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
        };

        const result = ${useQuery}<${returnType}, Error>({
            key: ${key},
            fn: get,
        });

        return result;
    }`;
};

export { generateUseGet };
