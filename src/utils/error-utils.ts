import { ErrorMessages } from "constants/error-messages";

export const isNotFoundError = (error?: Error | string | null): boolean => {
    if (error == null) {
        return false;
    }

    if (error instanceof Error) {
        return error.message === ErrorMessages.USER_NOT_FOUND;
    }

    return error === ErrorMessages.USER_NOT_FOUND;
};
