import { Menu, MenuItemProps as EvergreenMenuItemProps } from "evergreen-ui";
import { PropsWithChildren } from "react";

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
