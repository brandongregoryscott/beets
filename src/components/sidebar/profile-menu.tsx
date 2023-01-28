import { Menu } from "components/menu/menu";
import {
    DocumentIcon,
    HelpIcon,
    InfoSignIcon,
    LogInIcon,
    LogOutIcon,
    NewPersonIcon,
    SnowflakeIcon,
} from "evergreen-ui";
import React, { Fragment, useCallback } from "react";
import { useRouter } from "hooks/use-router";
import { Sitemap } from "sitemap";
import { useLogout } from "hooks/supabase/use-logout";
import { useGlobalState } from "hooks/use-global-state";
import { useTheme } from "hooks/use-theme";
import { isJanuaryOrDecember } from "utils/date-utils";

interface ProfileMenuProps {
    onAboutDialogClick: () => void;
    onClose: () => void;
    onDocumentationDialogClick: () => void;
}

const ProfileMenu: React.FC<ProfileMenuProps> = (props: ProfileMenuProps) => {
    const { onAboutDialogClick, onDocumentationDialogClick, onClose } = props;
    const { isAuthenticated, globalState, setGlobalState } = useGlobalState();
    const { colors } = useTheme();
    const handleLogoutSettled = useCallback(
        () =>
            setGlobalState((prev) =>
                prev.merge({
                    supabaseUser: undefined,
                    user: undefined,
                })
            ),
        [setGlobalState]
    );
    const { mutate: logout } = useLogout({ onSettled: handleLogoutSettled });
    const { navigate } = useRouter();

    const handleAboutDialogClick = useCallback(() => {
        onClose();
        onAboutDialogClick();
    }, [onAboutDialogClick, onClose]);

    const handleDocumentationDialogClick = useCallback(() => {
        onClose();
        onDocumentationDialogClick();
    }, [onClose, onDocumentationDialogClick]);

    const handleLogoutSelect = useCallback(() => {
        onClose();
        setTimeout(logout, 25); // Slight delay to allow popover to close
    }, [logout, onClose]);

    const handleLoginSelect = useCallback(() => {
        onClose();
        navigate(Sitemap.login);
    }, [navigate, onClose]);

    const handleRegisterSelect = useCallback(() => {
        onClose();
        navigate(Sitemap.register);
    }, [navigate, onClose]);

    const handleToggleHolidayMode = useCallback(() => {
        // Slight delay to allow popover to close
        setTimeout(
            () => setGlobalState((prev) => prev.toggleHolidayMode()),
            50
        );

        onClose();
    }, [onClose, setGlobalState]);

    const snowflakeIconColor = globalState.enableHolidayMode
        ? colors.blue300
        : colors.gray400;

    return (
        <Menu>
            {isJanuaryOrDecember() && (
                <Menu.Item
                    icon={<SnowflakeIcon color={snowflakeIconColor} />}
                    onSelect={handleToggleHolidayMode}>
                    Holiday Mode
                </Menu.Item>
            )}
            <Menu.Item icon={InfoSignIcon} onSelect={handleAboutDialogClick}>
                About
            </Menu.Item>
            <Menu.Item
                icon={DocumentIcon}
                onSelect={handleDocumentationDialogClick}>
                Documentation
            </Menu.Item>
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
