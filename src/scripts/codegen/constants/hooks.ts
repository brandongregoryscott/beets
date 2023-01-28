import { joinPaths, toKebabCase } from "../utils";

const hooks = "hooks";
const useQuery = "useQuery";
const useQueryClient = "useQueryClient";
const useMutation = "useMutation";

const Hooks = {
    [useMutation]: {
        name: useMutation,
        interfaceName: "UseMutationResult",
        importPath: joinPaths(hooks, toKebabCase(useMutation)),
    },
    [useQuery]: {
        name: useQuery,
        interfaceName: "UseQueryResult",
        importPath: joinPaths(hooks, toKebabCase(useQuery)),
    },
    [useQueryClient]: {
        name: useQueryClient,
        importPath: "react-query",
    },
};

export { Hooks };
