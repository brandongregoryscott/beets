import { AboutDialog } from "components/sidebar/about-dialog";
import { HelpDialog } from "components/sidebar/help-dialog";
import { ProfileMenu } from "components/sidebar/profile-menu";
import {
    Card,
    majorScale,
    minorScale,
    PersonIcon,
    Popover,
    Position,
} from "evergreen-ui";
import React from "react";
import { useLocation } from "react-router";
import { Routes } from "routes";
import { hasValues } from "utils/collection-utils";
import { useBoolean } from "utils/hooks/use-boolean";
import { useDialog } from "utils/hooks/use-dialog";
import { useTheme } from "utils/hooks/use-theme";
import { matchRoutes } from "utils/route-utils";

interface ProfileMenuCardProps {}

const ProfileMenuCard: React.FC<ProfileMenuCardProps> = (
    props: ProfileMenuCardProps
) => {
    const theme = useTheme();
    const {
        value: isOpen,
        setTrue: handleOpen,
        setFalse: handleClose,
    } = useBoolean(false);
    const [isAboutDialogOpen, handleOpenAboutDialog, handleCloseAboutDialog] =
        useDialog();
    const [isHelpDialogOpen, handleOpenHelpDialog, handleCloseHelpDialog] =
        useDialog();

    const location = useLocation();
    const isProfileRoute = hasValues(
        matchRoutes(
            [
                Routes.root.routes.login,
                Routes.root.routes.logout,
                Routes.root.routes.register,
                Routes.root.routes.help,
            ],
            location
        )
    );

    const background =
        isOpen || isProfileRoute ? theme.colors.gray300 : theme.colors.gray100;

    return (
        <React.Fragment>
            <Popover
                content={({ close: handleClosePopover }) => (
                    <ProfileMenu
                        onAboutDialogClick={handleOpenAboutDialog}
                        onClose={handleClosePopover}
                        onHelpDialogClick={handleOpenHelpDialog}
                    />
                )}
                onClose={handleClose}
                onOpen={handleOpen}
                position={Position.RIGHT}>
                <Card
                    background={background}
                    borderRadius={minorScale(2)}
                    cursor="pointer"
                    padding={majorScale(2)}>
                    <PersonIcon />
                </Card>
            </Popover>
            {isAboutDialogOpen && (
                <AboutDialog onCloseComplete={handleCloseAboutDialog} />
            )}
            {isHelpDialogOpen && (
                <HelpDialog onCloseComplete={handleCloseHelpDialog} />
            )}
        </React.Fragment>
    );
};

export { ProfileMenuCard };
