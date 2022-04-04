import _, { capitalize, isEmpty } from "lodash";
import { InterfaceDeclaration, Project } from "ts-morph";
import { log } from "./log";
import { joinPaths, stripQuotes, toKebabCase, withExt } from "./utils";
import { Paths } from "./constants/paths";

const generateEnumsFromUnions = (
    project: Project,
    _interface: InterfaceDeclaration
) => {
    const properties = _interface.getProperties();

    const unionTypeProperty = properties.filter((property) => {
        const type = property.getType();
        return !type.isBoolean() && type.getNonNullableType().isUnion();
    });

    if (isEmpty(unionTypeProperty)) {
        return;
    }

    unionTypeProperty.forEach((property) => {
        const name = `${_interface.getName()}${capitalize(property.getName())}`;

        // Reference: https://ts-morph.com/details/types
        const values = property
            .getType()
            .getNonNullableType()
            .getUnionTypes()
            .map((type) => type.getText());

        const file = project.createSourceFile(
            joinPaths(Paths.base, "enums", withExt(toKebabCase(name))),
            undefined,
            {
                overwrite: true,
            }
        );

        // Replace original union with enum
        property.setType(name);
        _interface.getSourceFile().addImportDeclaration({
            namedImports: [name],
            moduleSpecifier: joinPaths(
                Paths.baseImport,
                "enums",
                toKebabCase(name)
            ),
        });

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
