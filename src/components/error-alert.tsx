import { Alert } from "evergreen-ui";

interface ErrorAlertProps {
    error?: Error | null;
}

const ErrorAlert: React.FC<ErrorAlertProps> = (props: ErrorAlertProps) => {
    const { error } = props;
    if (error == null) {
        return null;
    }

    return <Alert intent="danger">{error?.message}</Alert>;
};

export { ErrorAlert };
