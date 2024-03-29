import { capitalize } from "lodash";
import pluralize from "pluralize";
import {
    Project,
    PropertySignature,
    SourceFile,
    TypeLiteralNode,
} from "ts-morph";
import { AuditableColumns } from "./constants/auditable-columns";
import { Paths } from "./constants/paths";
import { HookAction } from "./enums/hook-action";
import { log } from "./log";

/**
 * Adds an ImportDeclaration to the file if it does not already exist
 */
const addImportDeclaration = (
    file: SourceFile,
    name: string,
    moduleSpecifier: string
): void => {
    const hasImport =
        file.getImportDeclaration((importDeclaration) =>
            importDeclaration
                .getNamedImports()
                .some((importSpecifier) => importSpecifier.getName() === name)
        ) != null;

    if (hasImport) {
        return;
    }

    file.addImportDeclaration({
        namedImports: [name],
        moduleSpecifier,
    });
};

const getFromFunctionName = (property: PropertySignature): string =>
    `from${getTableName(property)}`;

const getInterfaceName = (property: PropertySignature): string =>
    pluralize(snakeToTitleCase(property.getName()), 1);

const getInterfacePath = (property: PropertySignature): string =>
    joinPaths(
        Paths.base,
        "interfaces",
        `${toKebabCase(getInterfaceName(property))}.ts`
    );

const getInterfaceImportPath = (property: PropertySignature): string =>
    removeExt(getInterfacePath(property).replace("src/", ""));

const getHookPath = (property: PropertySignature, action: HookAction): string =>
    joinPaths(
        Paths.base,
        "hooks",
        "domain",
        toKebabCase(getTableName(property)),
        `${toKebabCase(getHookName(property, action))}.ts`
    );

const getHookImportPath = (
    property: PropertySignature,
    action: HookAction
): string => removeExt(getHookPath(property, action)).replace("src/", "");

const getHookName = (
    property: PropertySignature,
    action: HookAction
): string => {
    const entityName =
        action === HookAction.List
            ? getTableName(property)
            : getInterfaceName(property);

    return `use${action}${entityName}`;
};

const getHookOptionsInterfaceName = (
    property: PropertySignature,
    action: HookAction
): string => {
    const hookName = getHookName(property, action).replace("use", "Use");
    return `${hookName}Options`;
};

const getNonAuditableProperties = (
    typeLiteral: TypeLiteralNode
): PropertySignature[] =>
    typeLiteral
        .getProperties()
        .filter(
            (property) =>
                !Object.keys(AuditableColumns).includes(property.getName())
        );

const getRecordImportPath = (property: PropertySignature): string =>
    joinPaths("models", removeExt(getRecordFileName(property)));

const getRecordName = (property: PropertySignature): string =>
    `${getInterfaceName(property)}Record`;

const getRecordFileName = (property: PropertySignature): string =>
    `${toKebabCase(getInterfaceName(property))}-record.ts`;

const getRecordSourceFile = (
    project: Project,
    property: PropertySignature
): SourceFile | undefined => {
    const sourceFile = project.getSourceFiles(
        `**/*/${getRecordFileName(property)}`
    )[0];
    if (sourceFile == null) {
        log.warn(
            `No record found for '${getInterfaceName(
                property
            )}', this hook will return raw objects.`
        );
    }

    return sourceFile;
};

const getTablesEnumValue = (property: PropertySignature): string =>
    `Tables.${getTableName(property)}`;

const getTableName = (property: PropertySignature): string =>
    pluralize(getInterfaceName(property), 2);

const isAuditable = (typeLiteral: TypeLiteralNode): boolean => {
    const propertyNames = typeLiteral
        .getProperties()
        .map((property) => property.getName());

    const auditableKeys = Object.keys(AuditableColumns);

    return auditableKeys.every((auditableKey) =>
        propertyNames.includes(auditableKey)
    );
};

const joinPaths = (...paths: string[]): string => paths.join("/");

const removeExt = (filename: string) => filename.replace(".ts", "");

const snakeToTitleCase = (value: string) => {
    if (!value.includes("_")) {
        return capitalize(value);
    }

    return value.split("_").map(capitalize).join("");
};

const stripQuotes = (value: string): string => value.replace(/"/g, "");

const toKebabCase = (value: string) => {
    const hasOneCapitalLetter = value.match(/[A-Z]/g)?.length === 1;
    const firstLetterIsCapitalized = value[0].match(/[A-Z]/g) != null;
    if (hasOneCapitalLetter && firstLetterIsCapitalized) {
        return value.toLowerCase();
    }

    const kebabCaseString = value
        .replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)
        .toLowerCase();

    if (kebabCaseString.startsWith("-")) {
        return kebabCaseString.substring(1);
    }

    return kebabCaseString;
};

const withExt = (filename: string): string => `${filename}.ts`;

export {
    addImportDeclaration,
    getFromFunctionName,
    getInterfaceImportPath,
    getInterfaceName,
    getInterfacePath,
    getHookImportPath,
    getHookName,
    getHookOptionsInterfaceName,
    getHookPath,
    getNonAuditableProperties,
    getRecordFileName,
    getRecordImportPath,
    getRecordName,
    getRecordSourceFile,
    getTablesEnumValue,
    getTableName,
    isAuditable,
    joinPaths,
    stripQuotes,
    toKebabCase,
    withExt,
};
