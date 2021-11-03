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

const generateUseList = (project: Project, property: PropertySignature) => {
    const entityName = getTableName(property);
    const lowerCaseEntityName = entityName.toLowerCase();
    const name = `useList${entityName}`;
    const filename = `use-list-${lowerCaseEntityName}.ts`;

    const file = project.createSourceFile(
        `${BASE_PATH}/hooks/domain/${lowerCaseEntityName}/${filename}`,
        undefined,
        { overwrite: true }
    );

    file.addImportDeclaration({
        namedImports: [getInterfaceName(property)],
        moduleSpecifier: getInterfaceImportPath(property),
    });

    file.addImportDeclaration({
        namedImports: ["useCallback"],
        moduleSpecifier: "react",
    });

    file.addImportDeclaration({
        namedImports: ["useSupabase"],
        moduleSpecifier: "utils/hooks/supabase/use-supabase",
    });

    file.addImportDeclaration({
        namedImports: [TABLES_ENUM],
        moduleSpecifier: `${BASE_IMPORT_PATH}/enums/tables`,
    });

    file.addVariableStatement({
        declarationKind: VariableDeclarationKind.Const,
        declarations: [
            {
                name,
                initializer: useListInitializer(property),
            },
        ],
    });

    file.addExportDeclaration({ namedExports: [name] });

    log.info(`Writing hook '${name}' to ${file.getBaseName()}...`);
};

const useListInitializer = (property: PropertySignature) => `() => {
    return { };
}`;

export { generateUseList };
