import _, { capitalize, isEmpty } from "lodash";
import { Project, PropertySignature, SyntaxKind } from "ts-morph";
import { log } from "./log";
import {
    getInterfaceName,
    getTableName,
    stripQuotes,
    toKebabCase,
    withExt,
} from "./utils";
import upath from "upath";
import { Paths } from "./constants/paths";

const generateEnumsFromUnions = (
    project: Project,
    property: PropertySignature
) => {
    const interfaceName = getInterfaceName(property);
    const typeLiteral = property.getChildrenOfKind(SyntaxKind.TypeLiteral)[0];
    const properties = typeLiteral.getProperties();

    const unionTypeProperty = properties.filter((property) => {
        const type = property.getType();
        return !type.isBoolean() && type.getNonNullableType().isUnion();
    });

    if (isEmpty(unionTypeProperty)) {
        return;
    }

    unionTypeProperty.forEach((property) => {
        const name = `${interfaceName}${capitalize(property.getName())}`;

        // Reference: https://ts-morph.com/details/types
        const values = property
            .getType()
            .getNonNullableType()
            .getUnionTypes()
            .map((type) => type.getText());

        const file = project.createSourceFile(
            upath.join(Paths.base, "enums", withExt(toKebabCase(name))),
            undefined,
            {
                overwrite: true,
            }
        );

        file.addEnum({
            name,
            members: values.map((value) => ({
                name: capitalize(stripQuotes(value)),
                value: stripQuotes(value),
            })),
        });

        file.addExportDeclaration({ namedExports: [name] });

        log.info(`Writing enum '${name}' to ${file.getBaseName()}...`);
    });
};

export { generateEnumsFromUnions };
