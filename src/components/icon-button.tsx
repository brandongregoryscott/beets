import {
    IconButton as EvergreenIconButton,
    IconButtonProps as EvergreenIconButtonProps,
    Spinner,
} from "evergreen-ui";
import { ForwardedRef, forwardRef } from "react";

interface IconButtonProps extends EvergreenIconButtonProps {}

/**
 * Wrapper component to display full-size <Spinner /> when loading vs. smaller version by default
 */
const IconButton: React.FC<IconButtonProps> = forwardRef(
    (props: IconButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
        const { icon: iconProp, disabled, isLoading, ...rest } = props;

        const icon = isLoading ? <Spinner /> : iconProp;

        return (
            <EvergreenIconButton
                disabled={disabled || isLoading}
                icon={icon}
                ref={ref}
                {...rest}
            />
        );
    }
);

export { IconButton };
