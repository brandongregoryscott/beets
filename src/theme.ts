import { defaultTheme as _defaultTheme } from "evergreen-ui";
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
    },
});

export { theme };
