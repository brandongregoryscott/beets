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
    getHookPath,
    getHookName,
    getTablesEnumValue,
} from "../utils";
import { Enums } from "../constants/enums";
import { Hooks } from "../constants/hooks";
import { HookAction } from "../enums/hook-action";
import { Variables } from "../constants/variables";
import { Paths } from "../constants/paths";
import { kebabCase } from "lodash";

const {
    defaultFilter,
    enabled,
    filter,
    key,
    onError,
    onSuccess,
    sortBy,
    SortOptions,
    SupabaseClient,
} = Variables;
const PostgrestFilterBuilder = "PostgrestFilterBuilder";
const { interfaceName: UseQueryResult, name: useQuery } = Hooks.useQuery;

const generateUseList = (project: Project, property: PropertySignature) => {
    const name = getHookName(property, HookAction.List);
    const interfaceName = getInterfaceName(property);
    const recordSourceFile = getRecordSourceFile(project, property);
    const typeName =
        recordSourceFile != null
            ? getRecordName(property)
            : getInterfaceName(property);

    const file = project.createSourceFile(
        getHookPath(property, HookAction.List),
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
        namedImports: [useQuery, UseQueryResult],
        moduleSpecifier: Hooks.useQuery.importPath,
    });

    file.addImportDeclaration({
        namedImports: [PostgrestFilterBuilder],
        moduleSpecifier: "@supabase/postgrest-js",
    });

    file.addImportDeclaration({
        namedImports: [SortOptions],
        moduleSpecifier: `interfaces/${kebabCase(SortOptions)}`,
    });

    file.addInterface({
        name: getHookOptionsInterfaceName(property, HookAction.List),
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
                name: key,
                hasQuestionToken: true,
                type: "any[]",
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
            {
                name: sortBy,
                hasQuestionToken: true,
                type: `${SortOptions}<${interfaceName}>`,
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
        HookAction.List
    );
    const returnType = useRecord ? recordName : interfaceName;
    const returnValue = !useRecord
        ? "data ?? []"
        : `data?.map((${interfaceName.toLowerCase()}) => new ${recordName}(${interfaceName.toLowerCase()})) ?? []`;
    return `(options?: ${optionsInterfaceName}): ${UseQueryResult}<${returnType}[], Error> => {
        const { ${fromTable} } = ${SupabaseClient};
        const {
            ${enabled},
            ${filter} = ${defaultFilter},
            ${key} = [],
            ${onError},
            ${onSuccess},
            ${sortBy},
        } = options ?? {};

        const list = async () => {
            let query = ${fromTable}().select("*");
            if (${sortBy} != null) {
                query = query.order(sortBy.column, { ascending: ${sortBy}.order === "asc" })
            }

            const { data, error } = await filter(query);
            if (error != null) {
                throw error;
            }

            return ${returnValue};
        };

        const result = ${useQuery}<${returnType}[], Error>({
            ${enabled},
            key: [${getTablesEnumValue(property)}, ${sortBy}, ...${key}],
            fn: list,
            ${onError},
            ${onSuccess},
        });

        return result;
    }`;
};

export { generateUseList };
