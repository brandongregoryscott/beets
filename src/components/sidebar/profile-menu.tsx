import { Menu } from "components/menu/menu";
import { LogInIcon, LogOutIcon, NewPersonIcon } from "evergreen-ui";
import { Fragment, useCallback } from "react";
import { useHistory } from "react-router";
import { Sitemap } from "sitemap";
import { useLogout } from "utils/hooks/supabase/use-logout";
import { useGlobalState } from "utils/hooks/use-global-state";

interface ProfileMenuProps {
    onClose: () => void;
}

const ProfileMenu: React.FC<ProfileMenuProps> = (props: ProfileMenuProps) => {
    const { onClose } = props;
    const { isAuthenticated } = useGlobalState();
    const { mutate: logout } = useLogout();
    const history = useHistory();

    const handleLogoutSelect = useCallback(() => {
        onClose();
        setTimeout(logout, 25); // Slight delay to allow popover to close
    }, [logout, onClose]);

    const handleLoginSelect = useCallback(() => {
        onClose();
        history.push(Sitemap.login);
    }, [history, onClose]);

    const handleRegisterSelect = useCallback(() => {
        onClose();
        history.push(Sitemap.register);
    }, [history, onClose]);

    return (
        <Menu>
            {isAuthenticated && (
                <Menu.Item icon={LogOutIcon} onSelect={handleLogoutSelect}>
                    Logout
                </Menu.Item>
            )}
            {!isAuthenticated && (
                <Fragment>
                    <Menu.Item icon={LogInIcon} onSelect={handleLoginSelect}>
                        Login
                    </Menu.Item>
                    <Menu.Item
                        icon={NewPersonIcon}
                        onSelect={handleRegisterSelect}>
                        Register
                    </Menu.Item>
                </Fragment>
            )}
        </Menu>
    );
};

export { ProfileMenu };
