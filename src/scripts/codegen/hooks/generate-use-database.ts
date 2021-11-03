import _ from "lodash";
import { Project, PropertySignature, VariableDeclarationKind } from "ts-morph";
import { BASE_IMPORT_PATH, BASE_PATH, TABLES_ENUM } from "../constants";
import { log } from "../log";
import {
    getInterfaceName,
    getInterfaceImportPath,
    getFromFunctionName,
    getTableName,
} from "../utils";

const generateUseDatabase = (
    project: Project,
    properties: PropertySignature[]
) => {
    const name = "useDatabase";
    const filename = "use-database.ts";

    const file = project.createSourceFile(
        `${BASE_PATH}/hooks/${filename}`,
        undefined,
        { overwrite: true }
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
        namedImports: ["Tables"],
        moduleSpecifier: `${BASE_IMPORT_PATH}/enums/tables`,
    });

    file.addVariableStatement({
        declarationKind: VariableDeclarationKind.Const,
        declarations: [
            {
                name: "useDatabase",
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
        supabase.from<${getInterfaceName(
            property
        )}>(${TABLES_ENUM}.${getTableName(property)}),
        [supabase]
    )

    `
    )}

    return { ${properties.map(getFromFunctionName).join(", ")} };
}`;

export { generateUseDatabase };
