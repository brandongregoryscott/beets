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
import { useRouteMatch } from "react-router";
import { Sitemap } from "sitemap";
import { useBoolean } from "utils/hooks/use-boolean";
import { useDialog } from "utils/hooks/use-dialog";
import { useTheme } from "utils/hooks/use-theme";

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

    const isLoginOrRegisterRoute =
        useRouteMatch([Sitemap.login, Sitemap.register])?.isExact ?? false;

    const background =
        isOpen || isLoginOrRegisterRoute
            ? theme.colors.gray300
            : theme.colors.gray100;

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
