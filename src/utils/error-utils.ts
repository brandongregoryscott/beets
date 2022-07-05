import { ApiError } from "@supabase/supabase-js";
import { ErrorMessages } from "constants/error-messages";
import { isString } from "lodash";

const isNotFoundError = (error?: Error | string | null): boolean =>
    errorToString(error) === ErrorMessages.USER_NOT_FOUND;

const errorToString = (
    error?: ApiError | Error | string | null
): string | null => {
    if (error == null) {
        return null;
    }

    if (isString(error)) {
        return error;
    }

    return error.message;
};

export { errorToString, isNotFoundError };
