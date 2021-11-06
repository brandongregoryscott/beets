import _ from "lodash";
import pluralize from "pluralize";
import { PropertySignature } from "ts-morph";
import upath from "upath";
import { Paths } from "./constants/paths";

const getFromFunctionName = (property: PropertySignature): string =>
    `from${getTableName(property)}`;

const getInterfaceName = (property: PropertySignature): string =>
    _.capitalize(pluralize(property.getName(), 1));

const getInterfacePath = (property: PropertySignature): string =>
    upath.join(
        Paths.base,
        "interfaces",
        `${getInterfaceName(property).toLowerCase()}.ts`
    );

const getInterfaceImportPath = (property: PropertySignature): string =>
    removeExt(getInterfacePath(property).replace("src/", ""));

const getRecordImportPath = (property: PropertySignature): string =>
    upath.join("models", removeExt(getRecordFileName(property)));

const getRecordName = (property: PropertySignature): string =>
    `${getInterfaceName(property)}Record`;

const getRecordFileName = (property: PropertySignature): string =>
    `${getInterfaceName(property).toLowerCase()}-record.ts`;

const getTableName = (property: PropertySignature): string =>
    _.capitalize(property.getName());

const removeExt = (filename: string) => upath.removeExt(filename, ".ts");

const toKebabCase = (value: string) => {
    const hasOneCapitalLetter = value.match(/[A-Z]/g)?.length === 1;
    const firstLetterIsCapitalized = value[0].match(/[A-Z]/g) != null;
    if (hasOneCapitalLetter && firstLetterIsCapitalized) {
        return value.toLowerCase();
    }

    return value
        .replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)
        .toLowerCase();
};

export {
    getFromFunctionName,
    getInterfaceImportPath,
    getInterfaceName,
    getInterfacePath,
    getRecordFileName,
    getRecordImportPath,
    getRecordName,
    getTableName,
    toKebabCase,
};
