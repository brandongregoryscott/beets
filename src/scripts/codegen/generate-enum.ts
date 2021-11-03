import _ from "lodash";
import { Project, PropertySignature } from "ts-morph";
import { BASE_PATH, TABLES_ENUM } from "./constants";
import { log } from "./log";
import { getTableName } from "./utils";

const generateEnum = (project: Project, properties: PropertySignature[]) => {
    const name = TABLES_ENUM;
    const filename = "tables.ts";

    const file = project.createSourceFile(
        `${BASE_PATH}/enums/${filename}`,
        undefined,
        { overwrite: true }
    );

    file.addEnum({
        name,
        members: properties.map((property) => ({
            name: getTableName(property),
            value: property.getName(),
        })),
    });

    file.addExportDeclaration({ namedExports: [name] });

    log.info(`Writing enum '${name}' to ${file.getBaseName()}...`);
};

export { generateEnum };
