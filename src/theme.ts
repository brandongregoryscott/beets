import { defaultTheme as _defaultTheme, Theme } from "evergreen-ui";
import { DefaultEvergreenTheme } from "utils/hooks/use-theme";
import _ from "lodash";

const defaultTheme = _defaultTheme as DefaultEvergreenTheme;
const theme = _.merge(defaultTheme, {
    components: {
        Button: {
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
