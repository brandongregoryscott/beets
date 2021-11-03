import _ from "lodash";
import pluralize from "pluralize";
import { PropertySignature } from "ts-morph";
import { BASE_PATH } from "./constants";

const getFromFunctionName = (property: PropertySignature): string =>
    `from${getTableName(property)}`;

const getInterfaceName = (property: PropertySignature): string =>
    _.capitalize(pluralize(property.getName(), 1));

const getInterfacePath = (property: PropertySignature): string =>
    `${BASE_PATH}/interfaces/${_.toLower(getInterfaceName(property))}.ts`;

const getInterfaceImportPath = (property: PropertySignature): string =>
    getInterfacePath(property).replace("src/", "").replace(".ts", "");

const getTableName = (property: PropertySignature): string =>
    _.capitalize(property.getName());

export {
    getFromFunctionName,
    getInterfaceImportPath,
    getInterfaceName,
    getInterfacePath,
    getTableName,
};
