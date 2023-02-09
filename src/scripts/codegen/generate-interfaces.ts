import {
    Project,
    PropertySignature,
    SourceFile,
    SyntaxKind,
    TypeLiteralNode,
} from "ts-morph";
import { Variables } from "./constants/variables";
import { log } from "./log";
import {
    addImportDeclaration,
    getCreateInterfaceName,
    getInterfaceName,
    getInterfacePath,
    getNonAuditableProperties,
    getUpdateInterfaceName,
    isAuditable,
} from "./utils";

const { Auditable, Row, Insert, Update, Partial } = Variables;

const generateInterfaces = (
    project: Project,
    tables: TypeLiteralNode
): void => {
    const properties = tables.getProperties();

    properties.forEach((property) => {
        const file = project.createSourceFile(
            getInterfacePath(property),
            undefined,
            { overwrite: true }
        );

        const _interface = getTypeLiteralByPropertyName(property, Row);
        const interfaceName = getInterfaceName(property);

        generateInterface(interfaceName, _interface, file);

        const createInterface = getTypeLiteralByPropertyName(property, Insert);
        const createInterfaceName = getCreateInterfaceName(property);

        generateInterface(createInterfaceName, createInterface, file, true);

        const updateInterface = getTypeLiteralByPropertyName(property, Update);
        const updateInterfaceName = getUpdateInterfaceName(property);

        generateInterface(updateInterfaceName, updateInterface, file, true);

        file.addExportDeclaration({
            namedExports: [
                interfaceName,
                createInterfaceName,
                updateInterfaceName,
            ],
            isTypeOnly: true,
        });

        log.info(
            `Writing interfaces '${interfaceName}', '${createInterfaceName}' and '${updateInterfaceName}' to ${file.getBaseName()}...`
        );
    });
};

const getTypeLiteralByPropertyName = (
    property: PropertySignature,
    name: string
): TypeLiteralNode =>
    property
        .getFirstChildByKindOrThrow(SyntaxKind.TypeLiteral)
        .getPropertyOrThrow(name)
        .getFirstChildByKindOrThrow(SyntaxKind.TypeLiteral);

const generateInterface = (
    name: string,
    typeLiteral: TypeLiteralNode,
    file: SourceFile,
    isCreateOrUpdate: boolean = false
) => {
    const isAuditableType = isAuditable(typeLiteral);

    const properties = isAuditableType
        ? getNonAuditableProperties(typeLiteral)
        : typeLiteral.getProperties();

    const _interface = file.addInterface({
        name,
        properties: properties.map((property) => property.getStructure()),
    });

    if (isAuditableType) {
        addImportDeclaration(file, Auditable, "interfaces/auditable");
        _interface.addExtends(
            isCreateOrUpdate ? `${Partial}<${Auditable}>` : Auditable
        );
    }
};

export { generateInterfaces };
