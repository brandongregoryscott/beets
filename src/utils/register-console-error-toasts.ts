import { toaster } from "evergreen-ui";
import { isDevelopment } from "utils/env";
import { format } from "utils/string-utils";

const registerConsoleErrorToasts = () => {
    if (!isDevelopment()) {
        return;
    }

    const consoleError = console.error;
    console.error = (message: string, ...args: any[]) => {
        consoleError(message, ...args);

        const formattedMesasge = format(message, ...args);
        toaster.danger(formattedMesasge, {
            id: formattedMesasge,
        });
    };
};

export { registerConsoleErrorToasts };
