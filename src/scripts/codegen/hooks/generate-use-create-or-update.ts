import _ from "lodash";
import { Project, PropertySignature, VariableDeclarationKind } from "ts-morph";
import { log } from "../log";
import {
    getInterfaceName,
    getInterfaceImportPath,
    getFromFunctionName,
    getRecordName,
    getRecordImportPath,
    getRecordSourceFile,
    getHookOptionsInterfaceName,
    getHookName,
    getHookPath,
    getTablesEnumValue,
} from "../utils";
import { Enums } from "../constants/enums";
import { Hooks } from "../constants/hooks";
import { HookAction } from "../enums/hook-action";
import { Variables } from "../constants/variables";
import { Paths } from "../constants/paths";

const {
    createOrUpdate,
    onConflict,
    onError,
    onSettled,
    onSuccess,
    SupabaseClient,
} = Variables;
const { interfaceName: UseMutationResult, name: useMutation } =
    Hooks.useMutation;
const { name: useQueryClient } = Hooks.useQueryClient;
const excludedTypes = ["Pgmigration"];

const generateUseCreateOrUpdate = (
    project: Project,
    property: PropertySignature
) => {
    const name = getHookName(property, HookAction.CreateOrUpdate);
    const interfaceName = getInterfaceName(property);
    if (excludedTypes.includes(interfaceName)) {
        log.warn(
            `Skipping '${name}' as '${property.getName()}' was in the exclusion list.`
        );
        return;
    }
    const recordSourceFile = getRecordSourceFile(project, property);
    const typeName =
        recordSourceFile != null ? getRecordName(property) : interfaceName;
    const file = project.createSourceFile(
        getHookPath(property, HookAction.CreateOrUpdate),
        undefined,
        { overwrite: true }
    );

    if (recordSourceFile != null) {
        file.addImportDeclaration({
            namedImports: [getRecordName(property)],
            moduleSpecifier: getRecordImportPath(property),
        });
    }

    file.addImportDeclaration({
        namedImports: [getInterfaceName(property)],
        moduleSpecifier: getInterfaceImportPath(property),
    });

    file.addImportDeclaration({
        namedImports: [Enums.Tables.name],
        moduleSpecifier: Enums.Tables.importPath,
    });

    file.addImportDeclaration({
        namedImports: [SupabaseClient],
        moduleSpecifier: Paths.supabaseClientImport,
    });

    file.addImportDeclaration({
        namedImports: [useQueryClient],
        moduleSpecifier: Hooks.useQueryClient.importPath,
    });

    file.addImportDeclaration({
        namedImports: [useMutation, UseMutationResult],
        moduleSpecifier: Hooks.useMutation.importPath,
    });

    file.addInterface({
        name: getHookOptionsInterfaceName(property, HookAction.CreateOrUpdate),
        properties: [
            {
                name: "onConflict",
                hasQuestionToken: true,
                type: `keyof ${interfaceName}`,
            },
            {
                name: onError,
                hasQuestionToken: true,
                type: "(error: Error) => void",
            },
            {
                name: onSettled,
                hasQuestionToken: true,
                type: "() => void",
            },
            {
                name: onSuccess,
                hasQuestionToken: true,
                type: `(resultObject: ${typeName}) => void`,
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
        HookAction.CreateOrUpdate
    );
    const returnType = useRecord ? recordName : interfaceName;
    const returnValue = !useRecord ? "data!" : `new ${recordName}(data!)`;
    const variableName = _.camelCase(interfaceName);
    const upsertValue = useRecord
        ? `${variableName} instanceof ${recordName} ? ${variableName}.toPOJO() : ${variableName}`
        : variableName;
    return `(options?: ${optionsInterfaceName}): ${UseMutationResult}<${returnType}, Error, ${interfaceName}> => {
        const { ${fromTable} } = ${SupabaseClient};
        const { ${onConflict}, ${onError}, ${onSettled}, ${onSuccess} } = options ?? {};
        const queryClient = ${useQueryClient}();

        const ${createOrUpdate} = async (${variableName}: ${interfaceName}) => {
            const { data, error } = await ${fromTable}()
                .upsert(${upsertValue}, { ${onConflict} })
                .select("*")
                .limit(1)
                .single();

            if (error != null) {
                throw error;
            }

            return ${returnValue};
        };

        const result = ${useMutation}<${returnType}, Error, ${interfaceName}>({
            fn: ${createOrUpdate},
            ${onSuccess},
            ${onError},
            ${onSettled}: () => {
                queryClient.invalidateQueries(${getTablesEnumValue(property)});
                ${onSettled}?.();
            },
        });

        return result;
    }`;
};

export { generateUseCreateOrUpdate };
