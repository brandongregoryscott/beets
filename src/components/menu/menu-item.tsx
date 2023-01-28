import type { MenuItemProps as EvergreenMenuItemProps } from "evergreen-ui";
// eslint-disable-next-line no-restricted-imports
import { Menu } from "evergreen-ui";
import type { PropsWithChildren } from "react";

interface MenuItemProps extends EvergreenMenuItemProps {}

const MenuItem: React.FC<PropsWithChildren<MenuItemProps>> = (
    props: PropsWithChildren<MenuItemProps>
) => {
    const { children } = props;
    return (
        <Menu.Item {...props} appearance={"tab" as any}>
            {children}
        </Menu.Item>
    );
};

export { MenuItem };
