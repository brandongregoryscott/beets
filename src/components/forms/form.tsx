import { Pane, PaneOwnProps, PolymorphicBoxProps } from "evergreen-ui";
import { PropsWithChildren } from "react";

interface FormProps extends PolymorphicBoxProps<"form", PaneOwnProps> {}

const Form: React.FC<PropsWithChildren<FormProps>> = (
    props: PropsWithChildren<FormProps>
) => {
    const { children } = props;
    return (
        <Pane is="form" {...props}>
            {children}
        </Pane>
    );
};

export { Form };
export type { FormProps };
