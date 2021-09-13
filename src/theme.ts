import { defaultTheme, Theme } from "evergreen-ui";
import _ from "lodash";

const theme: Theme = _.merge(defaultTheme, {
    components: {
        Link: {
            baseStyle: {
                _hover: {
                    cursor: "pointer",
                },
            },
        },
    },
});

export { theme };
