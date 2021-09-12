import { Tab } from "evergreen-ui";
import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { Routes } from "routes";

interface NavigationTabsProps {}

const NavigationTabs: React.FC<NavigationTabsProps> = (
    props: NavigationTabsProps
) => {
    return (
        <Fragment>
            {Routes.map((route) => (
                <Tab
                    exact={true}
                    is={NavLink}
                    key={route.path as string}
                    to={route.path as string}>
                    {route.name}
                </Tab>
            ))}
        </Fragment>
    );
};

export { NavigationTabs };
