import upath from "upath";
import { toKebabCase } from "../utils";
import { Paths } from "./paths";

const hooks = "hooks";
const useDatabase = "useDatabase";

const Hooks = {
    [useDatabase]: {
        filename: `${toKebabCase(useDatabase)}.ts`,
        name: useDatabase,
        filePath: upath.join(
            Paths.base,
            hooks,
            `${toKebabCase(useDatabase)}.ts`
        ),
        importPath: upath.join(
            Paths.baseImport,
            hooks,
            toKebabCase(useDatabase)
        ),
    },
};

export { Hooks };
