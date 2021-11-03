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
import { Paths } from "../constants/paths";
import { Enums } from "../constants/enums";

const generateUseList = (project: Project, property: PropertySignature) => {
    const entityName = getTableName(property);
    const lowerCaseEntityName = entityName.toLowerCase();
    const name = `useList${entityName}`;
    const filename = `use-list-${lowerCaseEntityName}.ts`;

    const file = project.createSourceFile(
        upath.join(
            Paths.base,
            "hooks",
            "domain",
            lowerCaseEntityName,
            filename
        ),
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
        namedImports: [Enums.Tables.name],
        moduleSpecifier: Enums.Tables.importPath,
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
    const { ${getFromFunctionName(property)} } = useDatabase();
    return { };
}`;

export { generateUseList };
