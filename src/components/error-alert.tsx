import { ApiError } from "@supabase/supabase-js";
import { Alert, majorScale } from "evergreen-ui";
import { errorToString } from "utils/error-utils";

interface ErrorAlertProps {
    error?: ApiError | Error | null;
}

const ErrorAlert: React.FC<ErrorAlertProps> = (props: ErrorAlertProps) => {
    const { error } = props;
    const message = errorToString(error);
    if (message == null) {
        return null;
    }

    return <Alert intent="danger" marginTop={majorScale(2)} title={message} />;
};

export { ErrorAlert };
