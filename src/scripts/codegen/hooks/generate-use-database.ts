import _ from "lodash";
import { Project, PropertySignature, VariableDeclarationKind } from "ts-morph";
import { log } from "../log";
import {
    getInterfaceName,
    getInterfaceImportPath,
    getFromFunctionName,
    getTableName,
} from "../utils";
import upath from "upath";
import { Enums } from "../constants/enums";
import { Hooks } from "../constants/hooks";

const generateUseDatabase = (
    project: Project,
    properties: PropertySignature[]
) => {
    const name = Hooks.useDatabase.name;

    const file = project.createSourceFile(
        Hooks.useDatabase.filePath,
        undefined,
        {
            overwrite: true,
        }
    );

    file.addImportDeclarations(
        properties.map((property) => ({
            namedImports: [getInterfaceName(property)],
            moduleSpecifier: getInterfaceImportPath(property),
        }))
    );

    file.addImportDeclaration({
        namedImports: ["useCallback"],
        moduleSpecifier: "react",
    });

    file.addImportDeclaration({
        namedImports: ["useSupabase"],
        moduleSpecifier: "utils/hooks/supabase/use-supabase",
    });

    file.addImportDeclaration({
        namedImports: [Enums.Tables.name],
        moduleSpecifier: Enums.Tables.importPath,
    });

    file.addVariableStatement({
        declarationKind: VariableDeclarationKind.Const,
        declarations: [
            {
                name,
                initializer: useDatabaseInitializer(properties),
            },
        ],
    });

    file.addExportDeclaration({ namedExports: [name] });

    log.info(`Writing hook '${name}' to ${file.getBaseName()}...`);
};

const useDatabaseInitializer = (properties: PropertySignature[]) => `() => {
    const { supabase } = useSupabase();

    ${properties.map(
        (property) =>
            `
    const ${getFromFunctionName(property)} = useCallback(() =>
        supabase.from<${getInterfaceName(property)}>(${
                Enums.Tables.name
            }.${getTableName(property)}),
        [supabase]
    )

    `
    )}

    return { ${properties.map(getFromFunctionName).join(", ")} };
}`;

export { generateUseDatabase };
