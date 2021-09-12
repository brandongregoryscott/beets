interface ServiceResult<TResultObject, TError> {
    error: TError | null;
    isError: boolean;
    isIdle: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    resultObject: TResultObject | undefined;
}

export type { ServiceResult };
