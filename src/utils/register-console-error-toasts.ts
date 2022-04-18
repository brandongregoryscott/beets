import { toaster } from "evergreen-ui";
import { first, isString } from "lodash";
import { isDevelopment } from "utils/env";
import { format } from "utils/string-utils";

const registerConsoleErrorToasts = () => {
    if (!isDevelopment()) {
        return;
    }

    const consoleError = console.error;
    console.error = (message: string, ...args: any[]) => {
        consoleError(message, ...args);
        toaster.danger(
            isString(message)
                ? first(format(message, ...args).split("\n"))!
                : JSON.stringify(message),
            {
                id: [message, JSON.stringify(args)].join(),
            }
        );
    };
};

export { registerConsoleErrorToasts };
