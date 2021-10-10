import { Pane, Paragraph, Spinner } from "evergreen-ui";
import { useEffect } from "react";
import { useLogout } from "utils/hooks/supabase/use-logout";

interface LogoutPageProps {}

const LogoutPage: React.FC<LogoutPageProps> = (props: LogoutPageProps) => {
    const { mutate: logout } = useLogout();
    useEffect(() => {
        setTimeout(logout, 1500);
    }, [logout]);
    return (
        <Pane
            flexDirection="column"
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100%">
            <Spinner />
            <Paragraph>Logging out...</Paragraph>
        </Pane>
    );
};

export { LogoutPage };
