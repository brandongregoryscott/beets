import { Project, PropertySignature, VariableDeclarationKind } from "ts-morph";
import { HookAction } from "../enums/hook-action";
import {
    getFromFunctionName,
    getHookImportPath,
    getHookName,
    getHookOptionsInterfaceName,
    getHookPath,
    getInterfaceImportPath,
    getInterfaceName,
    getQueryKey,
    getRecordImportPath,
    getRecordName,
    getRecordSourceFile,
    getTableName,
    toKebabCase,
} from "../utils";
import upath from "upath";
import { Paths } from "../constants/paths";
import { Enums } from "../constants/enums";
import { Hooks } from "../constants/hooks";
import { log } from "../log";
import { Variables } from "../constants/variables";

const {
    createOrUpdate,
    id,
    isNilOrEmpty,
    isTemporaryId,
    onError,
    onSettled,
    onSuccess,
    mutateAsync,
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
    if (excludedTypes.includes(getInterfaceName(property))) {
        log.warn(
            `Skipping '${name}' as '${property.getName()}' was in the exclusion list.`
        );
        return;
    }

    const recordSourceFile = getRecordSourceFile(project, property);
    const typeName =
        recordSourceFile != null
            ? getRecordName(property)
            : getInterfaceName(property);
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
        namedImports: [useQueryClient],
        moduleSpecifier: Hooks.useQueryClient.importPath,
    });

    file.addImportDeclaration({
        namedImports: [useMutation, UseMutationResult],
        moduleSpecifier: Hooks.useMutation.importPath,
    });

    file.addImportDeclaration({
        namedImports: [isNilOrEmpty, isTemporaryId],
        moduleSpecifier: "utils/core-utils",
    });

    file.addImportDeclaration({
        namedImports: [getHookName(property, HookAction.Create)],
        moduleSpecifier: getHookImportPath(property, HookAction.Create),
    });

    file.addImportDeclaration({
        namedImports: [getHookName(property, HookAction.Update)],
        moduleSpecifier: getHookImportPath(property, HookAction.Update),
    });

    file.addInterface({
        name: `UseCreateOrUpdate${getInterfaceName(property)}Options`,
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
                initializer: useCreateOrUpdateInitializer(
                    property,
                    recordSourceFile != null
                ),
            },
        ],
    });

    file.addExportDeclaration({ namedExports: [name] });

    log.info(`Writing hook '${name}' to ${file.getBaseName()}...`);
};

const useCreateOrUpdateInitializer = (
    property: PropertySignature,
    useRecord: boolean
) => {
    const interfaceName = getInterfaceName(property);
    const recordName = getRecordName(property);
    const variableName = interfaceName.toLowerCase();
    const optionsInterfaceName = getHookOptionsInterfaceName(
        property,
        HookAction.CreateOrUpdate
    );
    const returnType = useRecord ? recordName : interfaceName;
    const useCreate = getHookName(property, HookAction.Create);
    const useUpdate = getHookName(property, HookAction.Update);
    const create = `create${interfaceName}`;
    const update = `update${interfaceName}`;
    return `(options?: ${optionsInterfaceName}): ${UseMutationResult}<${returnType}, Error, ${interfaceName}> => {
        const { ${onError}, ${onSuccess} } = options ?? {};
        const queryClient = ${useQueryClient}();
        const { ${mutateAsync}: ${create} } = ${useCreate}();
        const { ${mutateAsync}: ${update} } = ${useUpdate}();


        const ${createOrUpdate} = async (${variableName}: ${interfaceName}) =>
            ${isNilOrEmpty}(${variableName}.${id}) || ${isTemporaryId}(${variableName}.${id})
                ? ${create}(${variableName})
                : ${update}(${variableName})

        const result = ${useMutation}<${returnType}, Error, ${interfaceName}>({
            fn: ${createOrUpdate},
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

export { generateUseCreateOrUpdate };
