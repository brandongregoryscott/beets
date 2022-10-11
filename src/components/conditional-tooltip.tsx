import type { TooltipProps } from "evergreen-ui";
import { Tooltip as EvergreenTooltip } from "evergreen-ui";
import type { PropsWithChildren } from "react";

const ConditionalTooltip: React.FC<PropsWithChildren<TooltipProps>> = (
    props: PropsWithChildren<TooltipProps>
) => {
    const { showDelay = 500, ...tooltipProps } = props;

    return (
        <EvergreenTooltip {...tooltipProps} showDelay={showDelay}>
            {props.children}
        </EvergreenTooltip>
    );
};

export { ConditionalTooltip };
