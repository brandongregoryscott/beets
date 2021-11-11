import _ from "lodash";
import { Project, PropertySignature, SyntaxKind } from "ts-morph";
import { AuditableColumns } from "./constants/auditable-columns";
import { Variables } from "./constants/variables";
import { log } from "./log";
import { getInterfaceName, getInterfacePath } from "./utils";

const { Auditable } = Variables;
const generateInterface = (project: Project, property: PropertySignature) => {
    const name = getInterfaceName(property);

    const file = project.createSourceFile(
        getInterfacePath(property),
        undefined,
        { overwrite: true }
    );

    const typeLiteral = property.getChildrenOfKind(SyntaxKind.TypeLiteral)[0];

    const propertyNames = typeLiteral
        .getProperties()
        .map((property) => property.getName());

    const auditableKeys = Object.keys(AuditableColumns);
    const isAuditable = auditableKeys.every((auditableKey) =>
        propertyNames.includes(auditableKey)
    );

    const properties = isAuditable
        ? typeLiteral
              .getProperties()
              .filter((property) => !auditableKeys.includes(property.getName()))
        : typeLiteral.getProperties();

    const _interface = file.addInterface({
        name,
        properties: properties.map((e) => e.getStructure()),
    });

    if (isAuditable) {
        file.addImportDeclaration({
            namedImports: [Auditable],
            moduleSpecifier: "interfaces/auditable",
        });
        _interface.addExtends(Auditable);
    }

    file.addExportDeclaration({ namedExports: [name], isTypeOnly: true });

    log.info(`Writing interface '${name}' to ${file.getBaseName()}...`);
};

export { generateInterface };
