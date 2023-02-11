import { defaultTheme, Icon, majorScale } from "evergreen-ui";
import type { RouteDefinition } from "interfaces/route-definition";
import type { PropsWithChildren } from "react";
import { Link, useLocation } from "react-router-dom";
import { hasValues } from "utils/collection-utils";
import { useTheme } from "hooks/use-theme";
import { matchRoutes } from "utils/route-utils";
import type { SelectorMap } from "ui-box";
import Box from "ui-box/dist/src/box";

interface SidebarLinkProps {
    matchingRoutes?: RouteDefinition[];
    /**
     * Optional path to override the one in the RouteDefinition provided
     */
    path?: string;
    route: RouteDefinition;
}

const selectors: SelectorMap = {
    "&:hover": {
        transform: "translateY(-2px)",
    },
    "&:focus,&:active": {
        borderColor: defaultTheme.colors.blue200,
        borderWidth: 1,
        borderStyle: "solid",
    },
};

const SidebarLink: React.FC<PropsWithChildren<SidebarLinkProps>> = (
    props: PropsWithChildren<SidebarLinkProps>
) => {
    const { route, path } = props;
    const { matchingRoutes = [route] } = props;
    const location = useLocation();
    const { colors } = useTheme();
    const matches = matchRoutes(matchingRoutes, location);
    const background = hasValues(matches) ? colors.gray300 : colors.gray100;
    return (
        <Box
            background={background}
            borderColor="transparent"
            borderRadius={majorScale(1)}
            borderStyle="solid"
            borderWidth={1}
            is={Link}
            outline="none"
            padding={majorScale(2)}
            position="relative"
            selectors={selectors}
            to={path ?? route.path}>
            {route.icon != null && (
                <Icon color={colors.gray900} icon={route.icon} />
            )}
        </Box>
    );
};

export { SidebarLink };
