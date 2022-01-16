import { DefaultThemeColors } from "evergreen-ui";
import { theme } from "theme";
import { isNilOrEmpty } from "utils/collection-utils";
import { valueByHash } from "utils/hash-utils";

const stepColors: Array<DefaultThemeColors> = [
    "blue200",
    "blue300",
    "green300",
    "orange500",
    "purple600",
    "red300",
];

const getStepColor = (fileId: string | undefined): string => {
    if (isNilOrEmpty(fileId)) {
        return "transparent";
    }

    const key = valueByHash(fileId, stepColors);

    return theme.colors[key];
};

export { getStepColor };
