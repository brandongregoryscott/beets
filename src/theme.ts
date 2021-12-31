import {
    defaultTheme as _defaultTheme,
    majorScale,
    minorScale,
} from "evergreen-ui";
import { DefaultEvergreenTheme } from "utils/hooks/use-theme";
import _ from "lodash";

const defaultTheme = _defaultTheme as DefaultEvergreenTheme;
const theme = _.merge(defaultTheme, {
    components: {
        Button: {
            baseStyle: {
                _disabled: {
                    cursor: "not-allowed",
                    pointerEvents: "auto",
                },
            },
            appearances: {
                tab: {
                    _hover: {
                        backgroundColor: defaultTheme.colors.gray300,
                    },
                    backgroundColor: defaultTheme.colors.gray100,
                },
            },
        },
        Link: {
            baseStyle: {
                _hover: {
                    cursor: "pointer",
                },
            },
        },
        MenuItem: {
            appearances: {
                tab: {
                    _disabled: {
                        cursor: "not-allowed",
                        pointerEvents: "auto",
                        fontStyle: "italic",
                        color: defaultTheme.colors.gray500,
                    },
                    _hover: {
                        backgroundColor: defaultTheme.colors.gray300,
                    },
                    backgroundColor: defaultTheme.colors.gray100,
                },
            },
        },
        Input: {
            appearances: {
                editableParagraph: {
                    "&:hover": {
                        border: `1px solid ${defaultTheme.colors.gray500}`,
                    },
                    paddingLeft: minorScale(1),
                    paddingRight: minorScale(1),
                    backgroundColor: "inherit",
                    height: majorScale(3),
                },
                editableParagraphEditing: {
                    paddingLeft: minorScale(1),
                    paddingRight: minorScale(1),
                    borderColor: defaultTheme.colors.gray500,
                    backgroundColor: "white",
                    height: majorScale(3),
                },
            },
        },
    },
});

export { theme };
