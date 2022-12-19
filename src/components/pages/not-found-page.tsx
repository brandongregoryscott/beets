import { EmptyState } from "components/empty-state";
import { Flex } from "components/flex";
import { GeosearchIcon, majorScale, Text, Strong } from "evergreen-ui";
import { useLocation } from "react-router";

const NotFoundPage: React.FC = () => {
    const { pathname } = useLocation();
    return (
        <Flex.Row
            alignItems="center"
            justifyContent="center"
            padding={majorScale(4)}
            width="100%">
            <Flex.Column maxHeight={majorScale(26)} maxWidth={majorScale(100)}>
                <EmptyState
                    description={
                        (
                            <Text>
                                {"The requested route "}
                                <Strong>{pathname}</Strong>
                                {" was not found."}
                            </Text>
                        ) as any
                    }
                    icon={<GeosearchIcon />}
                    title="Page Not Found"
                />
            </Flex.Column>
        </Flex.Row>
    );
};

export { NotFoundPage };
