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
    getQueryKey,
    getHookPath,
} from "../utils";
import { Enums } from "../constants/enums";
import { Hooks } from "../constants/hooks";
import { HookAction } from "../enums/hook-action";
import { Variables } from "../constants/variables";

const { onError, onSettled, onSuccess } = Variables;
const { interfaceName: UseMutationResult, name: useMutation } =
    Hooks.useMutation;
const { name: useQueryClient } = Hooks.useQueryClient;
const { name: useDatabase } = Hooks.useDatabase;

const generateUseCreate = (project: Project, property: PropertySignature) => {
    const name = getHookName(property, HookAction.Create);
    const recordSourceFile = getRecordSourceFile(project, property);
    const typeName =
        recordSourceFile != null
            ? getRecordName(property)
            : getInterfaceName(property);
    const file = project.createSourceFile(
        getHookPath(property, HookAction.Create),
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
        namedImports: [Hooks.useDatabase.name],
        moduleSpecifier: Hooks.useDatabase.importPath,
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
        name: getHookOptionsInterfaceName(property, HookAction.Create),
        properties: [
            {
                name: onError,
                hasQuestionToken: true,
                type: "(error: Error) => void",
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
                initializer: useCreateInitializer(
                    property,
                    recordSourceFile != null
                ),
            },
        ],
    });

    file.addExportDeclaration({ namedExports: [name] });

    log.info(`Writing hook '${name}' to ${file.getBaseName()}...`);
};

const useCreateInitializer = (
    property: PropertySignature,
    useRecord: boolean
) => {
    const interfaceName = getInterfaceName(property);
    const recordName = getRecordName(property);
    const variableName = interfaceName.toLowerCase();
    const fromTable = getFromFunctionName(property);
    const optionsInterfaceName = getHookOptionsInterfaceName(
        property,
        HookAction.Create
    );
    const returnType = useRecord ? recordName : interfaceName;
    const returnValue = !useRecord ? "data!" : `new ${recordName}(data!)`;
    const insertValue = useRecord
        ? `${variableName} instanceof ${recordName} ? ${variableName}.toPOJO() : ${variableName}`
        : variableName;
    return `(options?: ${optionsInterfaceName}): ${UseMutationResult}<${returnType}, Error, ${interfaceName}> => {
        const { ${fromTable} } = ${useDatabase}();
        const { ${onError}, ${onSuccess} } = options ?? {};
        const queryClient = ${useQueryClient}();

        const create = async (${variableName}: ${interfaceName}) => {
            const { data, error } = await ${fromTable}()
                .insert({ ...${insertValue}, id: undefined })
                .limit(1)
                .single();

            if (error != null) {
                throw error;
            }

            return ${returnValue};
        };

        const result = ${useMutation}<${returnType}, Error, ${interfaceName}>({
            fn: create,
            ${onSuccess},
            ${onError},
            ${onSettled}: () => {
                queryClient.invalidateQueries(${getQueryKey(
                    HookAction.List,
                    property
                )});
            },
        });

        return result;
    }`;
};

export { generateUseCreate };