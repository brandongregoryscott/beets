import type { PostgrestError } from "@supabase/supabase-js";
import { ErrorMessages } from "constants/error-messages";
import { isEmpty, isString } from "lodash";

const errorToString = (error?: Error | string | null): string | null => {
    if (error == null) {
        return null;
    }

    if (isString(error)) {
        return error;
    }

    return error.message;
};

const isInvalidUuidError = (
    error?: Error | PostgrestError | null
): error is PostgrestError =>
    isPostgrestError(error) &&
    error.message.includes("invalid input syntax for type uuid");

const isPostgrestError = (
    error?: Error | PostgrestError | null
): error is PostgrestError => error != null && "details" in error;

const isNotFoundError = (
    error?: Error | PostgrestError | null
): error is PostgrestError =>
    isPostgrestError(error) &&
    !isEmpty(error.details) &&
    error.details.includes("Results contain 0 rows");

const isUserNotFoundError = (error?: Error | string | null): boolean =>
    errorToString(error) === ErrorMessages.USER_NOT_FOUND;

export {
    errorToString,
    isInvalidUuidError,
    isNotFoundError,
    isUserNotFoundError,
};
