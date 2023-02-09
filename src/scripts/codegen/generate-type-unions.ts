import { titleCase } from "humanize-plus";
import { Project, TypeLiteralNode } from "ts-morph";
import { Paths } from "./constants/paths";
import { log } from "./log";
import { joinPaths, toKebabCase, withExt } from "./utils";

const generateTypeUnions = (project: Project, enumsType: TypeLiteralNode) => {
    const properties = enumsType.getProperties();

    properties.forEach((property) => {
        const name = titleCase(property.getName());

        const file = project.createSourceFile(
            joinPaths(
                Paths.base,
                "types",
                withExt(toKebabCase(property.getName()))
            ),
            undefined,
            {
                overwrite: true,
            }
        );

        file.addTypeAlias({
            name,
            type: property.getType().getText(),
        });

        file.addExportDeclaration({ namedExports: [name], isTypeOnly: true });

        log.info(`Writing type alias '${name}' to ${file.getBaseName()}...`);
    });
};

export { generateTypeUnions };
