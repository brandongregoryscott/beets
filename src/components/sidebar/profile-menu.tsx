import { LogInIcon, LogOutIcon, Menu, NewPersonIcon } from "evergreen-ui";
import { Fragment, useCallback } from "react";
import { useHistory } from "react-router";
import { Sitemap } from "sitemap";
import { useLogout } from "utils/hooks/supabase/use-logout";

interface ProfileMenuProps {
    isAuthenticated: boolean;
    onClose: () => void;
}

const ProfileMenu: React.FC<ProfileMenuProps> = (props: ProfileMenuProps) => {
    const { isAuthenticated, onClose } = props;
    const { mutate: logout } = useLogout();
    const history = useHistory();

    const handleLogoutSelect = useCallback(() => {
        logout();
        onClose();
    }, [logout, onClose]);

    const handleLoginSelect = useCallback(() => {
        history.push(Sitemap.login);
        onClose();
    }, [history, onClose]);

    const handleRegisterSelect = useCallback(() => {
        history.push(Sitemap.register);
        onClose();
    }, [history, onClose]);

    return (
        <Menu>
            <Menu.Divider />
            <Menu.Group>
                {isAuthenticated && (
                    <Menu.Item icon={LogOutIcon} onSelect={handleLogoutSelect}>
                        Logout
                    </Menu.Item>
                )}
                {!isAuthenticated && (
                    <Fragment>
                        <Menu.Item
                            icon={LogInIcon}
                            onSelect={handleLoginSelect}>
                            Login
                        </Menu.Item>
                        <Menu.Item
                            icon={NewPersonIcon}
                            onSelect={handleRegisterSelect}>
                            Register
                        </Menu.Item>
                    </Fragment>
                )}
            </Menu.Group>
        </Menu>
    );
};

export { ProfileMenu };
