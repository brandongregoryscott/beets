import _ from "lodash";
import pluralize from "pluralize";
import { Project, PropertySignature, SyntaxKind } from "ts-morph";
import { BASE_PATH } from "./constants";
import { log } from "./log";

const generateInterface = (project: Project, property: PropertySignature) => {
    const name = _.capitalize(pluralize(property.getName(), 1));
    const filename = `${name.toLowerCase()}.ts`;

    const file = project.createSourceFile(
        `${BASE_PATH}/interfaces/${filename}`,
        undefined,
        { overwrite: true }
    );

    const typeLiteral = property.getChildrenOfKind(SyntaxKind.TypeLiteral)[0];

    file.addInterface({
        name,
        properties: typeLiteral.getProperties().map((e) => e.getStructure()),
    });

    file.addExportDeclaration({ namedExports: [name], isTypeOnly: true });

    log.info(`Writing interface '${name}' to ${file.getBaseName()}...`);
};

export { generateInterface };
