import { isNilOrEmpty } from "utils/collection-utils";
import { valueByHash } from "utils/hash-utils";
import { DefaultEvergreenTheme } from "utils/hooks/use-theme";

const stepColors: Array<keyof DefaultEvergreenTheme["colors"]> = [
    "blue200",
    "blue300",
    "green300",
    "orange500",
    "purple600",
    "red300",
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
