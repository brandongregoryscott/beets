import { defaultTheme, majorScale, mergeTheme, minorScale } from "evergreen-ui";

const theme = mergeTheme(defaultTheme, {
    components: {
        Button: {
            baseStyle: {
                selectors: {
                    _disabled: {
                        cursor: "not-allowed",
                        pointerEvents: "auto",
                    },
                },
            },
            appearances: {
                tab: {
                    selectors: {
                        _active: {
                            backgroundColor: defaultTheme.colors.gray300,
                        },
                        _hover: {
                            backgroundColor: defaultTheme.colors.gray300,
                        },
                    },
                    backgroundColor: defaultTheme.colors.gray100,
                    borderRadius: 0,
                },
            },
        },
        Link: {
            baseStyle: {
                selectors: {
                    _hover: {
                        cursor: "pointer",
                    },
                },
            },
        },
        MenuItem: {
            appearances: {
                tab: {
                    selectors: {
                        _disabled: {
                            cursor: "not-allowed",
                            pointerEvents: "auto",
                            fontStyle: "italic",
                            color: defaultTheme.colors.gray500,
                        },
                        _hover: {
                            backgroundColor: defaultTheme.colors.gray300,
                        },
                    },
                    backgroundColor: defaultTheme.colors.gray100,
                },
            },
        },
        Input: {
            appearances: {
                default: {
                    border: `1px solid ${defaultTheme.colors.gray400}`,
                },
                editableParagraph: {
                    selectors: {
                        /* @ts-ignore */
                        "&:hover": {
                            border: `1px solid ${defaultTheme.colors.gray500}`,
                        },
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
