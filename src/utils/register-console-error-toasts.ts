import { toaster } from "evergreen-ui";
import { isString } from "lodash";
import { isDevelopment } from "utils/env";
import { format } from "utils/string-utils";

const registerConsoleErrorToasts = () => {
    if (!isDevelopment()) {
        return;
    }

    const consoleError = console.error;
    console.error = (message: string, ...args: any[]) => {
        consoleError(message, args);
        toaster.danger(
            isString(message) ? format(message, args) : JSON.stringify(message),
            {
                id: [message, JSON.stringify(args)].join(),
            }
        );
    };
};

export { registerConsoleErrorToasts };
