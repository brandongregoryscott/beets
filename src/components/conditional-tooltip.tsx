import {
    Tooltip as EvergreenTooltip,
    TooltipProps as EvergreenTooltipProps,
} from "evergreen-ui";
import { Fragment, PropsWithChildren } from "react";

interface TooltipProps extends EvergreenTooltipProps {
    shouldRender?: boolean;
}

const ConditionalTooltip: React.FC<PropsWithChildren<TooltipProps>> = (
    props: PropsWithChildren<TooltipProps>
) => {
    const { shouldRender = true, showDelay = 500, ...tooltipProps } = props;

    if (!shouldRender) {
        return <Fragment>{props.children}</Fragment>;
    }

    return (
        <EvergreenTooltip {...tooltipProps} showDelay={showDelay}>
            {props.children}
        </EvergreenTooltip>
    );
};

export { ConditionalTooltip };
