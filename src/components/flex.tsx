import { Pane, PaneProps } from "evergreen-ui";

interface FlexProps extends Omit<PaneProps, "display" | "flexDirection"> {}

const Column: React.FC<FlexProps> = (props: FlexProps) => (
    <Pane display="flex" flexDirection="column" {...props} />
);

const Row: React.FC<FlexProps> = (props: FlexProps) => (
    <Pane display="flex" flexDirection="row" {...props} />
);

const Flex = {
    Column,
    Row,
};

export { Flex };
export type { FlexProps };
