import type { IconButtonProps as EvergreenIconButtonProps } from "evergreen-ui";
// eslint-disable-next-line no-restricted-imports
import { IconButton as EvergreenIconButton, Spinner } from "evergreen-ui";
import type { ForwardedRef } from "react";
import { forwardRef } from "react";

interface IconButtonProps extends EvergreenIconButtonProps {}

/**
 * Wrapper component to display full-size <Spinner /> when loading vs. smaller version by default
 */
const IconButton: React.FC<IconButtonProps> = forwardRef(
    (props: IconButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
        const {
            icon: iconProp,
            disabled = false,
            isLoading = false,
            ...rest
        } = props;

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
