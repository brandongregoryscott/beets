import _ from "lodash";
import {
    MutateOptions,
    MutationFunction,
    MutationKey,
    useMutation as useReactQueryMutation,
    UseMutationOptions as UseReactQueryMutationOptions,
    UseMutationResult as UseReactQueryMutationResult,
} from "react-query";
import { ServiceResult } from "interfaces/service-result";
import { useEffect, useState } from "react";
import { unixTime } from "utils/core-utils";

interface UseMutationOptions<
    TResultObject = unknown,
    TError = unknown,
    TVariables = void,
    TContext = unknown
> extends Omit<
        UseReactQueryMutationOptions<
            TResultObject,
            TError,
            TVariables,
            TContext
        >,
        "mutationFn" | "mutationKey"
    > {
    fn: MutationFunction<TResultObject, TVariables>;
    key?: MutationKey | undefined;
}

interface UseMutationResult<
    TResultObject = unknown,
    TError = unknown,
    TVariables = unknown,
    TContext = unknown
> extends ServiceResult<TResultObject, TError> {
    dataUpdatedAt?: number;
    errorUpdatedAt?: number;
    mutate: (
        variables: TVariables,
        options?: MutateOptions<TResultObject, TError, TVariables, TContext>
    ) => void;
    mutateAsync: (
        variables: TVariables,
        options?: MutateOptions<TResultObject, TError, TVariables, TContext>
    ) => Promise<TResultObject>;
    reset: () => void;
}

const useMutation = <
    TResultObject = unknown,
    TError = unknown,
    TVariables = void,
    TContext = unknown
>(
    options: UseMutationOptions<TResultObject, TError, TVariables, TContext>
): UseMutationResult<TResultObject, TError, TVariables, TContext> => {
    const result = useReactQueryMutation({
        ..._.pick<
            UseMutationOptions<TResultObject, TError, TVariables, TContext>,
            keyof UseMutationOptions<
                TResultObject,
                TError,
                TVariables,
                TContext
            >
        >(options, "onError", "onMutate", "onSettled", "onSuccess"),
        mutationKey: options.key,
        mutationFn: options.fn,
    });
    const { isError, isSuccess } = result;

    const [dataUpdatedAt, setDataUpdatedAt] = useState<number | undefined>(
        undefined
    );

    const [errorUpdatedAt, setErrorUpdatedAt] = useState<number | undefined>(
        undefined
    );

    useEffect(() => {
        if (isSuccess) {
            setDataUpdatedAt(unixTime());
            return;
        }

        setDataUpdatedAt(undefined);
    }, [isSuccess]);

    useEffect(() => {
        if (isError) {
            setErrorUpdatedAt(unixTime());
            return;
        }

        setErrorUpdatedAt(undefined);
    }, [isError]);

    return {
        ..._.pick<
            UseReactQueryMutationResult<
                TResultObject,
                TError,
                TVariables,
                TContext
            >,
            keyof UseReactQueryMutationResult
        >(
            result,
            "error",
            "isError",
            "isIdle",
            "isLoading",
            "isSuccess",
            "mutate",
            "mutateAsync",
            "reset"
        ),
        dataUpdatedAt,
        errorUpdatedAt,
        resultObject: result.data,
    };
};

export { useMutation };
export type { UseMutationOptions, UseMutationResult };
