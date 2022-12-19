import type { EmptyStateOwnProps as EvergreenEmptyStateProps } from "evergreen-ui";
import { EmptyState as EvergreenEmptyState } from "evergreen-ui";
import React from "react";
import { useTheme } from "hooks/use-theme";

interface EmptyStateProps
    extends Omit<EvergreenEmptyStateProps, "iconBgColor"> {
    iconBgColor?: string;
    iconColor?: string;
}

const EmptyState: React.FC<EmptyStateProps> & {
    LinkButton: typeof EvergreenEmptyState.LinkButton;
    PrimaryButton: typeof EvergreenEmptyState.PrimaryButton;
} = (props: EmptyStateProps) => {
    const { colors } = useTheme();
    const {
        background = "dark",
        icon,
        iconColor = colors.gray500,
        iconBgColor = colors.gray200,
        ...rest
    } = props;
    return (
        <EvergreenEmptyState
            background={background}
            icon={
                React.isValidElement(icon)
                    ? React.cloneElement(icon, {
                          color: iconColor,
                      })
                    : icon
            }
            iconBgColor={iconBgColor}
            {...rest}
        />
    );
};

EmptyState.PrimaryButton = EvergreenEmptyState.PrimaryButton;
EmptyState.LinkButton = EvergreenEmptyState.LinkButton;

export { EmptyState };
