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
    getHookOptionsInterfaceName,
    getTablesEnumValue,
    getQueryKey,
} from "../utils";
import upath from "upath";
import { Paths } from "../constants/paths";
import { Enums } from "../constants/enums";
import { Hooks } from "../constants/hooks";
import { HookAction } from "../enums/hook-action";

const defaultFilter = "defaultFilter";
const enabled = "enabled";
const filter = "filter";
const onError = "onError";
const onSuccess = "onSuccess";
const PostgrestFilterBuilder = "PostgrestFilterBuilder";
const { interfaceName: UseQueryResult, name: useQuery } = Hooks.useQuery;
const { name: useDatabase } = Hooks.useDatabase;
const { name: Tables } = Enums.Tables;

const generateUseList = (project: Project, property: PropertySignature) => {
    const entityName = getTableName(property);
    const lowerCaseEntityName = entityName.toLowerCase();
    const name = `useList${entityName}`;
    const filename = `${toKebabCase(name)}.ts`;
    const interfaceName = getInterfaceName(property);
    const recordSourceFile = getRecordSourceFile(project, property);
    const typeName =
        recordSourceFile != null
            ? getRecordName(property)
            : getInterfaceName(property);

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
        namedImports: [useQuery, UseQueryResult],
        moduleSpecifier: Hooks.useQuery.importPath,
    });

    file.addImportDeclaration({
        namedImports: [PostgrestFilterBuilder],
        moduleSpecifier: "@supabase/postgrest-js",
    });

    file.addInterface({
        name: getHookOptionsInterfaceName(property, HookAction.LIST),
        properties: [
            {
                name: enabled,
                hasQuestionToken: true,
                type: "boolean",
            },
            {
                name: filter,
                hasQuestionToken: true,
                type: `(query: ${PostgrestFilterBuilder}<${interfaceName}>) => ${PostgrestFilterBuilder}<${interfaceName}>`,
            },
            {
                name: onError,
                hasQuestionToken: true,
                type: "(error: Error) => void",
            },
            {
                name: onSuccess,
                hasQuestionToken: true,
                type: `(resultObjects: ${typeName}[]) => void`,
            },
        ],
    });

    file.addVariableStatement({
        declarationKind: VariableDeclarationKind.Const,
        declarations: [
            {
                name: defaultFilter,
                initializer: `(query: ${PostgrestFilterBuilder}<${interfaceName}>) => query\n\n`,
            },
        ],
    });

    file.addVariableStatement({
        declarationKind: VariableDeclarationKind.Const,
        declarations: [
            {
                name,
                initializer: useListInitializer(
                    property,
                    recordSourceFile != null
                ),
            },
        ],
    });

    file.addExportDeclaration({ namedExports: [name] });

    log.info(`Writing hook '${name}' to ${file.getBaseName()}...`);
};

const useListInitializer = (
    property: PropertySignature,
    useRecord: boolean
) => {
    const interfaceName = getInterfaceName(property);
    const recordName = getRecordName(property);
    const fromTable = getFromFunctionName(property);
    const optionsInterfaceName = getHookOptionsInterfaceName(
        property,
        HookAction.LIST
    );
    const returnType = useRecord ? recordName : interfaceName;
    const returnValue = !useRecord
        ? "data ?? []"
        : `data?.map((${interfaceName.toLowerCase()}) => new ${recordName}(${interfaceName.toLowerCase()})) ?? []`;
    return `(options?: ${optionsInterfaceName}): ${UseQueryResult}<${returnType}[], Error> => {
        const { ${fromTable} } = ${useDatabase}();
        const {
            ${enabled},
            ${filter} = ${defaultFilter},
            ${onError},
            ${onSuccess}
        } = options ?? {};

        const list = async () => {
            const query = ${fromTable}().select("*");
            const { data, error } = await filter(query);
            if (error != null) {
                throw error;
            }

            return ${returnValue};
        };

        const result = ${useQuery}<${returnType}[], Error>({
            ${enabled},
            key: ${getQueryKey(HookAction.LIST, property)},
            fn: list,
            ${onError},
            ${onSuccess},
        });

        return result;
    }`;
};

export { generateUseList };
