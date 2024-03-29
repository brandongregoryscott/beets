import { Flex } from "components/flex";
import { IconButton } from "components/icon-button";
import { CrossIcon, majorScale, Text } from "evergreen-ui";
import { isFunction } from "lodash";

interface SelectMenuTitleProps {
    children?: React.ReactNode;
    close?: () => void;
    title?: string;
}

const SelectMenuTitle: React.FC<SelectMenuTitleProps> = (
    props: SelectMenuTitleProps
) => {
    const { children, close, title } = props;
    return (
        <Flex.Row
            alignItems="center"
            borderBottom={true}
            height={majorScale(5)}
            padding={majorScale(1)}>
            <Flex.Row alignItems="center" flex={1}>
                <Text size={300} textTransform="uppercase">
                    {title}
                </Text>
            </Flex.Row>
            {children}
            {isFunction(close) && (
                <IconButton
                    appearance="minimal"
                    height={majorScale(3)}
                    icon={CrossIcon}
                    onClick={close}
                />
            )}
        </Flex.Row>
    );
};

export { SelectMenuTitle };
