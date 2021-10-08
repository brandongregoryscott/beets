import { Theme, useTheme as useEvergreenTheme } from "evergreen-ui";

interface DefaultEvergreenTheme extends Theme {
    tokens: {
        colors: {
            gray900: string;
            gray800: string;
            gray700: string;
            gray600: string;
            gray500: string;
            gray400: string;
            gray300: string;
            gray200: string;
            gray100: string;
            gray90: string;
            gray75: string;
            gray50: string;
            blue900: string;
            blue800: string;
            blue700: string;
            blue600: string;
            blue500: string;
            blue400: string;
            blue300: string;
            blue200: string;
            blue100: string;
            blue50: string;
            blue25: string;
            red700: string;
            red600: string;
            red500: string;
            red100: string;
            red25: string;
            green900: string;
            green800: string;
            green700: string;
            green600: string;
            green500: string;
            green400: string;
            green300: string;
            green200: string;
            green100: string;
            green25: string;
            orange700: string;
            orange500: string;
            orange100: string;
            orange25: string;
            purple600: string;
            purple100: string;
            teal800: string;
            teal100: string;
            yellow800: string;
            yellow100: string;
            muted: string;
            default: string;
        };
        fontFamilies: {
            display: string;
            ui: string;
            mono: string;
        };
        text: {
            300: {
                fontSize: string;
                fontWeight: number;
                lineHeight: string;
                letterSpacing: number;
            };
            400: {
                fontSize: string;
                fontWeight: number;
                lineHeight: string;
                letterSpacing: number;
            };
            500: {
                fontSize: string;
                fontWeight: number;
                lineHeight: string;
                letterSpacing: number;
            };
            600: {
                fontSize: string;
                fontWeight: number;
                lineHeight: string;
                letterSpacing: number;
            };
        };
        paragraph: {
            300: {
                fontSize: string;
                fontWeight: number;
                lineHeight: string;
                letterSpacing: number;
            };
            400: {
                fontSize: string;
                fontWeight: number;
                lineHeight: string;
                letterSpacing: number;
            };
            500: {
                fontSize: string;
                fontWeight: number;
                lineHeight: string;
                letterSpacing: number;
            };
        };
        overlayBackgroundColor: string;
        codeBackgroundColor: string;
        codeBorderColor: string;
        fills: {
            neutral: { color: string; backgroundColor: string };
            blue: { color: string; backgroundColor: string };
            red: { color: string; backgroundColor: string };
            orange: { color: string; backgroundColor: string };
            yellow: { color: string; backgroundColor: string };
            green: { color: string; backgroundColor: string };
            teal: { color: string; backgroundColor: string };
            purple: { color: string; backgroundColor: string };
        };
        selectedOptionColor: string;
        borderRadius: 4;
        primary: {
            base: string;
            hover: string;
            active: string;
            disabled: string;
        };
        intents: {
            info: {
                background: string;
                border: string;
                text: string;
                icon: string;
            };
            success: {
                background: string;
                border: string;
                text: string;
                icon: string;
            };
            warning: {
                background: string;
                border: string;
                text: string;
                icon: string;
            };
            danger: {
                background: string;
                border: string;
                text: string;
                icon: string;
            };
        };
        states: {
            default: { icon: string };
            muted: { icon: string };
            dark: { icon: string };
            disabled: { icon: string };
            selected: { icon: string };
        };
    };
    colors: {
        gray900: string;
        gray800: string;
        gray700: string;
        gray600: string;
        gray500: string;
        gray400: string;
        gray300: string;
        gray200: string;
        gray100: string;
        gray90: string;
        gray75: string;
        gray50: string;
        blue900: string;
        blue800: string;
        blue700: string;
        blue600: string;
        blue500: string;
        blue400: string;
        blue300: string;
        blue200: string;
        blue100: string;
        blue50: string;
        blue25: string;
        red700: string;
        red600: string;
        red500: string;
        red300: string;
        red100: string;
        red25: string;
        green900: string;
        green800: string;
        green700: string;
        green600: string;
        green500: string;
        green400: string;
        green300: string;
        green200: string;
        green100: string;
        green25: string;
        orange700: string;
        orange500: string;
        orange100: string;
        orange25: string;
        purple600: string;
        purple100: string;
        teal800: string;
        teal100: string;
        yellow800: string;
        yellow100: string;
        muted: string;
        default: string;
        dark: string;
        selected: string;
        tint1: string;
        tint2: string;
        overlay: string;
        yellowTint: string;
        greenTint: string;
        orangeTint: string;
        redTint: string;
        blueTint: string;
        purpleTint: string;
        tealTint: string;
        border: { default: string; muted: string };
        icon: {
            default: string;
            muted: string;
            disabled: string;
            selected: string;
        };
        text: { danger: string; success: string; info: string };
    };
    fills: {
        neutral: { color: string; backgroundColor: string };
        blue: { color: string; backgroundColor: string };
        red: { color: string; backgroundColor: string };
        orange: { color: string; backgroundColor: string };
        yellow: { color: string; backgroundColor: string };
        green: { color: string; backgroundColor: string };
        teal: { color: string; backgroundColor: string };
        purple: { color: string; backgroundColor: string };
    };
    fontFamilies: {
        display: string;
        ui: string;
        mono: string;
    };
    fontSizes: string[];
    fontWeights: {
        light: number;
        normal: number;
        semibold: number;
        bold: number;
    };
    intents: {
        info: {
            background: string;
            border: string;
            text: string;
            icon: string;
        };
        success: {
            background: string;
            border: string;
            text: string;
            icon: string;
        };
        warning: {
            background: string;
            border: string;
            text: string;
            icon: string;
        };
        danger: {
            background: string;
            border: string;
            text: string;
            icon: string;
        };
    };
    letterSpacings: {
        tightest: string;
        tighter: string;
        tight: string;
        normal: string;
        wide: string;
    };
    lineHeights: string[];
    radii: string[];
    shadows: string[];
    zIndices: {
        focused: number;
        stack: number;
        positioner: number;
        overlay: number;
        toaster: number;
    };
}

const useTheme = (): DefaultEvergreenTheme =>
    useEvergreenTheme() as DefaultEvergreenTheme;

export { useTheme };
export type { DefaultEvergreenTheme };
