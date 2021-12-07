import _ from "lodash";
import pluralize from "pluralize";
import { Project, PropertySignature, SourceFile } from "ts-morph";
import upath from "upath";
import { Paths } from "./constants/paths";
import { HookAction } from "./enums/hook-action";
import { log } from "./log";

const getFromFunctionName = (property: PropertySignature): string =>
    `from${getTableName(property)}`;

const getInterfaceName = (property: PropertySignature): string =>
    pluralize(snakeToTitleCase(property.getName()), 1);

const getInterfacePath = (property: PropertySignature): string =>
    upath.join(
        Paths.base,
        "interfaces",
        `${toKebabCase(getInterfaceName(property))}.ts`
    );

const getInterfaceImportPath = (property: PropertySignature): string =>
    removeExt(getInterfacePath(property).replace("src/", ""));

const getHookPath = (property: PropertySignature, action: HookAction): string =>
    upath.join(
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

const getRecordImportPath = (property: PropertySignature): string =>
    upath.join("models", removeExt(getRecordFileName(property)));

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

const keyMirror = <T extends Record<string, null>>(
    object: T
): Record<keyof T, string> => {
    const keys = Object.keys(object);
    const outputObject: Record<string, string> = {};
    keys.forEach((key: string) => {
        outputObject[key] = key;
    });

    return outputObject as Record<keyof T, string>;
};

const removeExt = (filename: string) => upath.removeExt(filename, ".ts");

const snakeToTitleCase = (value: string) => {
    if (!value.includes("_")) {
        return _.capitalize(value);
    }

    return value.split("_").map(_.capitalize).join("");
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
    getFromFunctionName,
    getInterfaceImportPath,
    getInterfaceName,
    getInterfacePath,
    getHookImportPath,
    getHookName,
    getHookOptionsInterfaceName,
    getHookPath,
    getRecordFileName,
    getRecordImportPath,
    getRecordName,
    getRecordSourceFile,
    getTablesEnumValue,
    getTableName,
    keyMirror,
    stripQuotes,
    toKebabCase,
    withExt,
};
