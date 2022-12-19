import { Flex } from "components/flex";
import type { PropsWithChildren } from "react";
import { useTheme } from "hooks/use-theme";

interface PianoRollRowProps {}

const PianoRollRow: React.FC<PropsWithChildren<PianoRollRowProps>> = (
    props: PropsWithChildren<PianoRollRowProps>
) => {
    const { children } = props;
    const { colors } = useTheme();
    return (
        <Flex.Row
            backgroundColor={colors.gray300}
            flexGrow={1}
            width="min-content">
            {children}
        </Flex.Row>
    );
};

export { PianoRollRow };
