import upath from "upath";
import { toKebabCase } from "../utils";
import { Paths } from "./paths";

const hooks = "hooks";
const useDatabase = "useDatabase";
const useQuery = "useQuery";
const useQueryClient = "useQueryClient";
const useMutation = "useMutation";

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
    [useMutation]: {
        name: useMutation,
        interfaceName: "UseMutationResult",
        importPath: upath.join("utils", hooks, toKebabCase(useMutation)),
    },
    [useQuery]: {
        name: useQuery,
        interfaceName: "UseQueryResult",
        importPath: upath.join("utils", hooks, toKebabCase(useQuery)),
    },
    [useQueryClient]: {
        name: useQueryClient,
        importPath: "react-query",
    },
};

export { Hooks };
