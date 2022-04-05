import { Card, Icon, majorScale, minorScale } from "evergreen-ui";
import { RouteDefinition } from "interfaces/route-definition";
import { PropsWithChildren } from "react";
import { Link, useLocation } from "react-router-dom";
import { hasValues } from "utils/collection-utils";
import { useTheme } from "utils/hooks/use-theme";
import { matchRoutes } from "utils/route-utils";

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
    const matches = matchRoutes(matchingRoutes, location);
    const background = hasValues(matches)
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
