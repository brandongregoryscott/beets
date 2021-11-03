import { toKebabCase } from "../utils";
import upath from "upath";
import { Paths } from "./paths";

const enums = "enums";
const Tables = "Tables";

const Enums = {
    [Tables]: {
        filename: `${toKebabCase(Tables)}.ts`,
        name: Tables,
        filePath: upath.join(Paths.base, enums, `${toKebabCase(Tables)}.ts`),
        importPath: upath.join(Paths.baseImport, enums, toKebabCase(Tables)),
    },
};

export { Enums };
