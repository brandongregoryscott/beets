import upath from "upath";
import { toKebabCase } from "../utils";

const hooks = "hooks";
const useQuery = "useQuery";
const useQueryClient = "useQueryClient";
const useMutation = "useMutation";

const Hooks = {
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
