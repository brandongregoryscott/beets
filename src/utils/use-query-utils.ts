import _ from "lodash";
import { UseQueryResult } from "utils/hooks/use-query";

const mergeUseQueryProperties = (
    first: UseQueryResult<unknown, Error>,
    ...others: UseQueryResult<unknown, Error>[]
): Pick<
    UseQueryResult<unknown, Error>,
    "isError" | "isIdle" | "isLoading" | "isSuccess" | "error"
> => ({
    isError: first.isError || others.some((result) => result.isError),
    isIdle: first.isIdle || others.some((result) => result.isIdle),
    isSuccess: first.isSuccess || others.some((result) => result.isSuccess),
    isLoading: first.isLoading || others.some((result) => result.isLoading),
    error:
        first.error ??
        others.find((result) => result.error != null)?.error ??
        null,
});

const stubUseQueryResult = <T>(resultObject: T): UseQueryResult<T, Error> => ({
    resultObject,
    isError: false,
    isLoading: false,
    isIdle: false,
    isSuccess: true,
    error: null,
    refetch: _.noop,
});

export { mergeUseQueryProperties, stubUseQueryResult };
