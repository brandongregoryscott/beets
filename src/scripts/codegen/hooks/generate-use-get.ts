import { Project, PropertySignature, VariableDeclarationKind } from "ts-morph";
import { log } from "../log";
import {
    getInterfaceName,
    getInterfaceImportPath,
    getFromFunctionName,
    getRecordName,
    getRecordImportPath,
    getRecordSourceFile,
    getHookName,
    getHookOptionsInterfaceName,
    getHookPath,
    getTablesEnumValue,
} from "../utils";
import { Enums } from "../constants/enums";
import { Hooks } from "../constants/hooks";
import { HookAction } from "../enums/hook-action";
import { Variables } from "../constants/variables";
import { Paths } from "../constants/paths";

const { enabled, id, key, SupabaseClient } = Variables;
const { interfaceName: UseQueryResult, name: useQuery } = Hooks.useQuery;

const generateUseGet = (project: Project, property: PropertySignature) => {
    const name = getHookName(property, HookAction.Get);
    const recordSourceFile = getRecordSourceFile(project, property);

    const file = project.createSourceFile(
        getHookPath(property, HookAction.Get),
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
        namedImports: [SupabaseClient],
        moduleSpecifier: Paths.supabaseClientImport,
    });

    file.addImportDeclaration({
        namedImports: [useQuery, UseQueryResult],
        moduleSpecifier: Hooks.useQuery.importPath,
    });

    file.addInterface({
        name: getHookOptionsInterfaceName(property, HookAction.Get),
        properties: [
            {
                name: enabled,
                hasQuestionToken: true,
                type: "boolean",
            },
            {
                name: id,
                hasQuestionToken: false,
                type: "string",
            },
            {
                name: key,
                hasQuestionToken: true,
                type: "any[]",
            },
        ],
    });

    file.addVariableStatement({
        declarationKind: VariableDeclarationKind.Const,
        declarations: [
            {
                name,
                initializer: getInitializer(property, recordSourceFile != null),
            },
        ],
    });

    file.addExportDeclaration({ namedExports: [name] });

    log.info(`Writing hook '${name}' to ${file.getBaseName()}...`);
};

const getInitializer = (property: PropertySignature, useRecord: boolean) => {
    const interfaceName = getInterfaceName(property);
    const recordName = getRecordName(property);
    const fromTable = getFromFunctionName(property);
    const optionsInterfaceName = getHookOptionsInterfaceName(
        property,
        HookAction.Get
    );
    const returnType = `${useRecord ? recordName : interfaceName} | undefined`;
    const returnValue = !useRecord ? "data" : `new ${recordName}(data)`;
    return `(options: ${optionsInterfaceName}): ${UseQueryResult}<${returnType}, Error> => {
        const { ${fromTable} } = ${SupabaseClient};
        const { ${id}, ${enabled}, ${key} = [] } = options;

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
            ${enabled},
            key: [${getTablesEnumValue(property)}, id, ...${key}],
            fn: get,
        });

        return result;
    }`;
};

export { generateUseGet };
