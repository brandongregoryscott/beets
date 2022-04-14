import { toaster } from "evergreen-ui";
import { isDevelopment } from "utils/env";

const registerConsoleErrorToasts = () => {
    if (!isDevelopment()) {
        return;
    }

    const consoleError = console.error;
    console.error = (message: string, ...args: any[]) => {
        consoleError(message, args);
        toaster.danger(message, { id: [message, JSON.stringify(args)].join() });
    };
};

export { registerConsoleErrorToasts };
