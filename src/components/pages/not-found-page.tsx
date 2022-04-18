import { Flex } from "components/flex";
import {
    EmptyState,
    GeosearchIcon,
    majorScale,
    Text,
    Strong,
} from "evergreen-ui";
import { useLocation } from "react-router";
import { useTheme } from "utils/hooks/use-theme";

interface NotFoundPageProps {}

const NotFoundPage: React.FC<NotFoundPageProps> = (
    props: NotFoundPageProps
) => {
    const { colors } = useTheme();
    const { pathname } = useLocation();
    return (
        <Flex.Row
            alignItems="center"
            justifyContent="center"
            padding={majorScale(4)}
            width="100%">
            <Flex.Column maxHeight={majorScale(26)} maxWidth={majorScale(100)}>
                <EmptyState
                    background="dark"
                    description={
                        (
                            <Text>
                                {"The requested route "}
                                <Strong>{pathname}</Strong>
                                {" was not found."}
                            </Text>
                        ) as any
                    }
                    icon={<GeosearchIcon color={colors.gray600} />}
                    iconBgColor={colors.gray400}
                    title="Page Not Found"
                />
            </Flex.Column>
        </Flex.Row>
    );
};

export { NotFoundPage };
