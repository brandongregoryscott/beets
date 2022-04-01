import { Flex } from "components/flex";
import {
    Heading,
    HeadingProps,
    IconButton,
    LinkIcon,
    majorScale,
    TickIcon,
    toaster,
} from "evergreen-ui";
import { isEmpty, isString, kebabCase } from "lodash";
import { useCallback, useMemo, useState } from "react";

interface CopyableHeadingProps extends HeadingProps {}

const CopyableHeading: React.FC<CopyableHeadingProps> = (
    props: CopyableHeadingProps
) => {
    const { children } = props;
    const [copied, setCopied] = useState<boolean>(false);

    const hash: string | undefined = useMemo(() => {
        let hash: string | undefined = isString(children)
            ? children
            : undefined;

        if (Array.isArray(children) && children.some(isString)) {
            hash = children.find(isString) as string;
        }

        return isEmpty(hash) ? undefined : kebabCase(hash);
    }, [children]);

    const handleClick = useCallback(() => {
        if (isEmpty(hash)) {
            toaster.danger("Failed to copy link!");
            return;
        }

        const { hash: existingHash } = window.location;
        const currentPath = window.location
            .toString()
            .replace(existingHash, "");

        const link = `${currentPath}#${hash}`;
        setCopied(true);
        navigator.clipboard.writeText(link);
        setTimeout(() => setCopied(false), 1500);
    }, [hash]);

    return (
        <Flex.Row alignItems="center">
            <IconButton
                appearance="minimal"
                icon={copied ? TickIcon : LinkIcon}
                intent={copied ? "success" : "none"}
                marginRight={majorScale(1)}
                onClick={handleClick}
                size="small"
            />
            <Heading {...props} />
        </Flex.Row>
    );
};

export { CopyableHeading };
