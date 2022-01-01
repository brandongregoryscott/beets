import { Card, Icon, majorScale, minorScale } from "evergreen-ui";
import { RouteDefinition } from "interfaces/route-definition";
import { PropsWithChildren } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "utils/hooks/use-theme";

interface SidebarLinkProps {
    matchingRoutes?: RouteDefinition[];
    route: RouteDefinition;
}

const SidebarLink: React.FC<PropsWithChildren<SidebarLinkProps>> = (
    props: PropsWithChildren<SidebarLinkProps>
) => {
    const { route } = props;
    const { matchingRoutes = [route] } = props;
    const location = useLocation();
    const theme = useTheme();
    const matches = matchingRoutes.map(
        (route) => location.pathname === route.path
    );
    const background = matches.some((match) => match)
        ? theme.colors.gray300
        : theme.colors.gray100;
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
