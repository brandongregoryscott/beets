import _ from "lodash";
import {
    useQuery as useReactQueryQuery,
    UseQueryOptions as UseReactQueryQueryOptions,
    UseQueryResult as UseReactQueryQueryResult,
    QueryKey,
    QueryFunction,
} from "react-query";
import { ServiceResult } from "interfaces/service-result";

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
        "enabled" | "onSuccess" | "onError" | "onSettled"
    > {
    fn: QueryFunction<TResultObject, TQueryKey>;
    key?: TQueryKey | undefined;
}

interface UseQueryResult<
    TQueryFnData = unknown,
    TError = unknown,
    TResultObject = TQueryFnData
> extends ServiceResult<TResultObject, TError> {
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
        ..._.pick<
            UseQueryOptions<TQueryFnData, TError, TResultObject, TQueryKey>,
            keyof UseQueryOptions<
                TQueryFnData,
                TError,
                TResultObject,
                TQueryKey
            >
        >(options, "enabled", "onError", "onSettled", "onSuccess"),
        queryFn: options.fn,
        queryKey: options.key,
    });

    return {
        ..._.pick<
            UseReactQueryQueryResult<TResultObject, TError>,
            keyof UseReactQueryQueryResult
        >(
            result,
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
