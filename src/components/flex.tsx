import type { PaneProps } from "evergreen-ui";
import { Pane } from "evergreen-ui";
import React, { forwardRef } from "react";

interface FlexProps extends Omit<PaneProps, "display" | "flexDirection"> {}

const Column: React.FC<FlexProps> = forwardRef(
    (props: FlexProps, ref: React.ForwardedRef<HTMLDivElement>) => (
        <Pane display="flex" flexDirection="column" ref={ref} {...props} />
    )
);

Column.displayName = "Flex.Column";

const Row: React.FC<FlexProps> = forwardRef(
    (props: FlexProps, ref: React.ForwardedRef<HTMLDivElement>) => (
        <Pane display="flex" flexDirection="row" ref={ref} {...props} />
    )
);

Row.displayName = "Flex.Row";

const Flex = {
    Column,
    Row,
};

export { Flex };
export type { FlexProps };
