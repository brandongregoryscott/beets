import _ from "lodash";
import {
    Project,
    PropertySignature,
    VariableDeclarationKind,
    VariableStatement,
} from "ts-morph";
import { BASE_PATH } from "./constants";
import { log } from "./log";
import { getInterfaceName, getInterfaceImportPath } from "./utils";

const generateHook = (project: Project, properties: PropertySignature[]) => {
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

    const useDatabase = file.addVariableStatement({
        declarationKind: VariableDeclarationKind.Const,
        declarations: [
            {
                name: "useDatabase",
                initializer: useDatabaseInitializer,
            },
        ],
    });

    file.addExportDeclaration({ namedExports: [name] });

    log.info(`Writing hook '${name}' to ${file.getBaseName()}...`);
};

const useDatabaseInitializer = `() => {
    useCallback(
        (tableName: Tables) =>
            supabase.from<definitions[typeof tableName]>(tableName),
        [supabase]
    )
}`;

export { generateHook };
