import { AboutDialog } from "components/sidebar/about-dialog";
import { DocumentationDialog } from "components/sidebar/documentation-dialog/documentation-dialog";
import { ProfileMenu } from "components/sidebar/profile-menu";
import {
    Card,
    majorScale,
    minorScale,
    Popover,
    Position,
    Image,
    PersonIcon,
} from "evergreen-ui";
import React from "react";
import { Routes } from "routes";
import { hasValues } from "utils/collection-utils";
import { useBoolean } from "hooks/use-boolean";
import { useDialog } from "hooks/use-dialog";
import { useTheme } from "hooks/use-theme";
import { matchRoutes } from "utils/route-utils";
import { useGlobalState } from "hooks/use-global-state";
import SantaHat from "assets/santa-hat.png";
import { useRouter } from "hooks/use-router";

const ProfileMenuCard: React.FC = () => {
    const { colors } = useTheme();
    const { globalState } = useGlobalState();
    const {
        value: isOpen,
        setTrue: handleOpen,
        setFalse: handleClose,
    } = useBoolean(false);
    const [isAboutDialogOpen, handleOpenAboutDialog, handleCloseAboutDialog] =
        useDialog();
    const [isHelpDialogOpen, handleOpenHelpDialog, handleCloseHelpDialog] =
        useDialog();

    const { location } = useRouter();
    const isProfileRoute = hasValues(
        matchRoutes(
            [
                Routes.root.children.login,
                Routes.root.children.logout,
                Routes.root.children.register,
                Routes.root.children.help,
            ],
            location
        )
    );

    const background =
        isOpen || isProfileRoute ? colors.gray300 : colors.gray100;

    return (
        <React.Fragment>
            <Popover
                content={({ close: handleClosePopover }) => (
                    <ProfileMenu
                        onAboutDialogClick={handleOpenAboutDialog}
                        onClose={handleClosePopover}
                        onDocumentationDialogClick={handleOpenHelpDialog}
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
                    {globalState.enableHolidayMode && (
                        <Image
                            bottom={28}
                            height={14}
                            left={19}
                            position="absolute"
                            src={SantaHat}
                            width={14}
                        />
                    )}
                    <PersonIcon />
                </Card>
            </Popover>
            {isAboutDialogOpen && (
                <AboutDialog onCloseComplete={handleCloseAboutDialog} />
            )}
            {isHelpDialogOpen && (
                <DocumentationDialog onCloseComplete={handleCloseHelpDialog} />
            )}
        </React.Fragment>
    );
};

export { ProfileMenuCard };
