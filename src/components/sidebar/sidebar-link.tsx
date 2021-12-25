import { Card, Icon, majorScale, minorScale } from "evergreen-ui";
import { RouteDefinition } from "interfaces/route-definition";
import { PropsWithChildren } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useTheme } from "utils/hooks/use-theme";

interface SidebarLinkProps {
    route: RouteDefinition;
}

const SidebarLink: React.FC<PropsWithChildren<SidebarLinkProps>> = (
    props: PropsWithChildren<SidebarLinkProps>
) => {
    const { route } = props;
    const theme = useTheme();
    const match = useRouteMatch(route.path);
    const background =
        match?.isExact === true ? theme.colors.gray300 : theme.colors.gray100;
    return (
        <Card
            background={background}
            borderRadius={minorScale(2)}
            hoverElevation={1}
            is={Link}
            padding={majorScale(2)}
            to={route.path}>
            {route.icon != null && (
                <Icon color={theme.colors.gray900} icon={route.icon} />
            )}
        </Card>
    );
};

export { SidebarLink };
