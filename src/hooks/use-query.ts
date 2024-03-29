import { pick } from "lodash";
import type {
    UseQueryOptions as UseReactQueryQueryOptions,
    UseQueryResult as UseReactQueryQueryResult,
    QueryKey,
    QueryFunction,
} from "react-query";
import { useQuery as useReactQueryQuery } from "react-query";
import type { ServiceResult } from "interfaces/service-result";

interface UseQueryOptions<
    TQueryFnData = unknown,
    TError = unknown,
    TResultObject = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey
> extends Pick<
        UseReactQueryQueryOptions<
            TQueryFnData,
            TError,
            TResultObject,
            TQueryKey
        >,
        "enabled" | "onError" | "onSettled" | "onSuccess" | "staleTime"
    > {
    fn: QueryFunction<TResultObject, TQueryKey>;
    key?: TQueryKey | undefined;
}

interface UseQueryResult<
    TQueryFnData = unknown,
    TError = unknown,
    TResultObject = TQueryFnData
> extends ServiceResult<TResultObject, TError> {
    dataUpdatedAt?: number;
    errorUpdatedAt?: number;
    refetch: () => void;
}

const useQuery = <
    TQueryFnData = unknown,
    TError = unknown,
    TResultObject = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey
>(
    options: UseQueryOptions<TQueryFnData, TError, TResultObject, TQueryKey>
): UseQueryResult<TQueryFnData, TError, TResultObject> => {
    const result = useReactQueryQuery({
        ...pick<
            UseQueryOptions<TQueryFnData, TError, TResultObject, TQueryKey>,
            keyof UseQueryOptions<
                TQueryFnData,
                TError,
                TResultObject,
                TQueryKey
            >
        >(options, "enabled", "onError", "onSettled", "onSuccess", "staleTime"),
        queryFn: options.fn,
        queryKey: options.key,
    });

    return {
        ...pick<
            UseReactQueryQueryResult<TResultObject, TError>,
            keyof UseReactQueryQueryResult
        >(
            result,
            "dataUpdatedAt",
            "errorUpdatedAt",
            "error",
            "isError",
            "isIdle",
            "isLoading",
            "isSuccess",
            "refetch"
        ),
        resultObject: result.data,
    };
};

export { useQuery };
export type { UseQueryOptions, UseQueryResult };
