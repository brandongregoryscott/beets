import type { TooltipProps } from "evergreen-ui";
import { Tooltip as EvergreenTooltip } from "evergreen-ui";
import type { PropsWithChildren } from "react";

interface ConditionalTooltipProps extends Omit<TooltipProps, "isShown"> {
    isShown: boolean;
}

const ConditionalTooltip: React.FC<
    PropsWithChildren<ConditionalTooltipProps>
> = (props: PropsWithChildren<ConditionalTooltipProps>) => {
    const { showDelay = 500, isShown, ...tooltipProps } = props;

    return (
        <EvergreenTooltip
            {...tooltipProps}
            isShown={isShown ? undefined : false}
            showDelay={showDelay}>
            {props.children}
        </EvergreenTooltip>
    );
};

export { ConditionalTooltip };
