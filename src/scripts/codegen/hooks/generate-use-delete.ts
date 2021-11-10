import _ from "lodash";
import { Project, PropertySignature, VariableDeclarationKind } from "ts-morph";
import { log } from "../log";
import {
    getFromFunctionName,
    toKebabCase,
    getHookOptionsInterfaceName,
    getHookName,
    getTablesEnumValue,
    getQueryKey,
    getHookPath,
} from "../utils";
import { Enums } from "../constants/enums";
import { Hooks } from "../constants/hooks";
import { HookAction } from "../enums/hook-action";
import { Variables } from "../constants/variables";

const { id, onError, onSettled, onSuccess } = Variables;
const { interfaceName: UseMutationResult, name: useMutation } =
    Hooks.useMutation;
const { name: useQueryClient } = Hooks.useQueryClient;
const { name: useDatabase } = Hooks.useDatabase;

const generateUseDelete = (project: Project, property: PropertySignature) => {
    const name = getHookName(property, HookAction.DELETE);
    const file = project.createSourceFile(
        getHookPath(property, HookAction.DELETE),
        undefined,
        { overwrite: true }
    );

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
        name: getHookOptionsInterfaceName(property, HookAction.DELETE),
        properties: [
            {
                name: onError,
                hasQuestionToken: true,
                type: "(error: Error) => void",
            },
            {
                name: onSuccess,
                hasQuestionToken: true,
                type: "() => void",
            },
        ],
    });

    file.addVariableStatement({
        declarationKind: VariableDeclarationKind.Const,
        declarations: [
            {
                name,
                initializer: useDeleteInitializer(property),
            },
        ],
    });

    file.addExportDeclaration({ namedExports: [name] });

    log.info(`Writing hook '${name}' to ${file.getBaseName()}...`);
};

const useDeleteInitializer = (property: PropertySignature) => {
    const fromTable = getFromFunctionName(property);
    const enumValue = getTablesEnumValue(property);
    const optionsInterfaceName = getHookOptionsInterfaceName(
        property,
        HookAction.DELETE
    );
    return `(options?: ${optionsInterfaceName}): ${UseMutationResult}<void, Error, string> => {
        const { ${fromTable} } = ${useDatabase}();
        const { ${onError}, ${onSuccess} } = options ?? {};
        const queryClient = ${useQueryClient}();

        const deleteFn = async (id: string) => {
            const { error } = await ${fromTable}()
                .delete()
                .eq("${id}", ${id});

            if (error != null) {
                throw error;
            }
        };

        const result = ${useMutation}<void, Error, string>({
            fn: deleteFn,
            ${onSuccess},
            ${onError},
            ${onSettled}: () => {
                queryClient.invalidateQueries(${getQueryKey(
                    HookAction.LIST,
                    property
                )});
            },
        });

        return result;
    }`;
};

export { generateUseDelete };
