import _ from "lodash";
import pluralize from "pluralize";
import { PropertySignature } from "ts-morph";
import upath from "upath";
import { Paths } from "./constants/paths";
import { log } from "./log";

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
    getInterfacePath(property).replace("src/", "").replace(".ts", "");

const getTableName = (property: PropertySignature): string =>
    _.capitalize(property.getName());

const toKebabCase = (value: string) => {
    log.info("value.match", value.match(/[A-Z]/g));

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
    getTableName,
    toKebabCase,
};
