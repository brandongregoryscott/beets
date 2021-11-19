import { isNilOrEmpty } from "utils/core-utils";
import { valueByHash } from "utils/hash-utils";
import { DefaultEvergreenTheme } from "utils/hooks/use-theme";

const stepColors: Array<keyof DefaultEvergreenTheme["colors"]> = [
    "blue700",
    "blue500",
    "blue300",
    "red700",
    "red600",
    "red500",
    "green700",
    "green500",
    "green300",
];

const getStepColor = (
    fileId: string | undefined,
    theme: DefaultEvergreenTheme
): string => {
    if (isNilOrEmpty(fileId)) {
        return theme.colors.gray200;
    }

    const key = valueByHash(fileId, stepColors);

    return theme.colors[key] as string;
};

export { getStepColor };
