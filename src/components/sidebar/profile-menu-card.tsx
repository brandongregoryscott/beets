import { ProfileMenu } from "components/sidebar/profile-menu";
import {
    Card,
    majorScale,
    minorScale,
    PersonIcon,
    Popover,
    Position,
} from "evergreen-ui";
import { useRouteMatch } from "react-router";
import { Sitemap } from "sitemap";
import { useBoolean } from "utils/hooks/use-boolean";
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

    const isLoginOrRegisterRoute =
        useRouteMatch([Sitemap.login, Sitemap.register])?.isExact ?? false;

    const background =
        isOpen || isLoginOrRegisterRoute
            ? theme.colors.gray300
            : theme.colors.gray100;

    return (
        <Popover
            content={({ close: handleClosePopover }) => (
                <ProfileMenu onClose={handleClosePopover} />
            )}
            onClose={handleClose}
            onOpen={handleOpen}
            position={Position.RIGHT}
        >
            <Card
                background={background}
                borderRadius={minorScale(2)}
                cursor="pointer"
                padding={majorScale(2)}
            >
                <PersonIcon />
            </Card>
        </Popover>
    );
};

export { ProfileMenuCard };
