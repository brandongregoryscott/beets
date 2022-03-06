import {
    IconButton as EvergreenIconButton,
    IconButtonProps as EvergreenIconButtonProps,
    Spinner,
} from "evergreen-ui";

interface IconButtonProps extends EvergreenIconButtonProps {}

/**
 * Wrapper component to display full-size <Spinner /> when loading vs. smaller version by default
 */
const IconButton: React.FC<IconButtonProps> = (props: IconButtonProps) => {
    const { icon: iconProp, disabled, isLoading, ...rest } = props;

    const icon = isLoading ? <Spinner /> : iconProp;

    return (
        <EvergreenIconButton
            disabled={disabled || isLoading}
            icon={icon}
            {...rest}
        />
    );
};

export { IconButton };
