import { joinPaths, toKebabCase, withExt } from "../utils";
import { Paths } from "./paths";

const enums = "enums";
const Tables = "Tables";

const Enums = {
    [Tables]: {
        filename: withExt(toKebabCase(Tables)),
        name: Tables,
        filePath: joinPaths(Paths.base, enums, withExt(toKebabCase(Tables))),
        importPath: joinPaths(Paths.baseImport, enums, toKebabCase(Tables)),
    },
};

export { Enums };
