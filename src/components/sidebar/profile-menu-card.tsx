import { ProfileMenu } from "components/sidebar/profile-menu";
import {
    Card,
    majorScale,
    minorScale,
    PersonIcon,
    Popover,
    Position,
} from "evergreen-ui";
import { useBoolean } from "utils/hooks/use-boolean";
import { useGlobalState } from "utils/hooks/use-global-state";
import { useTheme } from "utils/hooks/use-theme";

interface ProfileMenuCardProps {}

const ProfileMenuCard: React.FC<ProfileMenuCardProps> = (
    props: ProfileMenuCardProps
) => {
    const theme = useTheme();
    const { globalState } = useGlobalState();
    const {
        value: isOpen,
        setTrue: setIsOpenTrue,
        setFalse: setIsOpenFalse,
    } = useBoolean(false);
    const background = isOpen ? theme.colors.gray300 : undefined;
    return (
        <Popover
            content={({ close }) => (
                <ProfileMenu
                    isAuthenticated={globalState.isAuthenticated()}
                    onClose={close}
                />
            )}
            onClose={setIsOpenFalse}
            onOpen={setIsOpenTrue}
            position={Position.RIGHT}>
            <Card
                background={background}
                borderRadius={minorScale(2)}
                cursor="pointer"
                padding={majorScale(2)}>
                <PersonIcon />
            </Card>
        </Popover>
    );
};

export { ProfileMenuCard };
