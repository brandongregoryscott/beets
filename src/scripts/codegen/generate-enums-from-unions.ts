import { titleCase } from "humanize-plus";
import { capitalize } from "lodash";
import { Project, TypeLiteralNode } from "ts-morph";
import { Paths } from "./constants/paths";
import { log } from "./log";
import { joinPaths, stripQuotes, toKebabCase, withExt } from "./utils";

const generateEnumsFromUnions = (
    project: Project,
    enumsType: TypeLiteralNode
) => {
    const properties = enumsType.getProperties();

    properties.forEach((property) => {
        const name = titleCase(property.getName());

        const file = project.createSourceFile(
            joinPaths(
                Paths.base,
                "enums",
                withExt(toKebabCase(property.getName()))
            ),
            undefined,
            {
                overwrite: true,
            }
        );

        // Reference: https://ts-morph.com/details/types
        const values = property
            .getType()
            .getNonNullableType()
            .getUnionTypes()
            .map((type) => type.getText());

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
