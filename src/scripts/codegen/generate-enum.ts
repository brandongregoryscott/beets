import _ from "lodash";
import { Project, PropertySignature } from "ts-morph";
import { BASE_PATH } from "./constants";
import { log } from "./log";

const generateEnum = (project: Project, properties: PropertySignature[]) => {
    const name = "Tables";
    const filename = "tables.ts";

    const file = project.createSourceFile(
        `${BASE_PATH}/enums/${filename}`,
        undefined,
        { overwrite: true }
    );

    file.addEnum({
        name,
        members: properties.map((property) => ({
            name: _.capitalize(property.getName()),
            value: property.getName(),
        })),
    });

    file.addExportDeclaration({ namedExports: [name] });

    log.info(`Writing enum '${name}' to ${file.getBaseName()}...`);
};

export { generateEnum };
