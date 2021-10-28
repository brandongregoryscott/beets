import _ from "lodash";
import { Project, PropertySignature, SyntaxKind } from "ts-morph";
import { log } from "./log";
import { getInterfaceName, getInterfacePath } from "./utils";

const generateInterface = (project: Project, property: PropertySignature) => {
    const name = getInterfaceName(property);

    const file = project.createSourceFile(
        getInterfacePath(property),
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
