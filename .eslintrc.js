module.exports = {
    extends: ["plugin:collation/strict"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        project: "./tsconfig.json",
    },
    plugins: [
        "@typescript-eslint",
        "collation",
        "react",
        "react-hooks",
        "typescript-sort-keys",
    ],
    settings: {
        react: {
            version: "detect",
        },
    },
    rules: {
        "@typescript-eslint/consistent-type-definitions": "error",
        "@typescript-eslint/consistent-type-exports": "error",
        "@typescript-eslint/consistent-type-imports": "error",
        "@typescript-eslint/padding-line-between-statements": [
            "error",
            {
                blankLine: "always",
                next: "export",
                prev: "*",
            },
            {
                blankLine: "never",
                next: "export",
                prev: "export",
            },
            {
                blankLine: "always",
                next: "*",
                prev: "import",
            },
            {
                blankLine: "never",
                next: "import",
                prev: "import",
            },
        ],
        "@typescript-eslint/sort-type-union-intersection-members": "error",
        "@typescript-eslint/strict-boolean-expressions": "warn",
        curly: "error",
        eqeqeq: [
            "error",
            "always",
            {
                null: "ignore",
            },
        ],
        "no-restricted-imports": [
            "error",
            {
                paths: [
                    {
                        importNames: [
                            "useLocation",
                            "useParams",
                            "useNavigate",
                        ],
                        message:
                            "Please import 'useRouter' from 'hooks/use-router' instead.",
                        name: "react-router",
                    },
                ],
                paths: [
                    {
                        importNames: ["generatePath"],
                        message:
                            "Please import 'generatePath' from 'utils/route-utils' instead.",
                        name: "react-router",
                    },
                ],
                paths: [
                    {
                        importNames: [
                            "Dialog",
                            "FileUploader",
                            "EmptyState",
                            "IconButton",
                            "SelectMenu",
                            "Menu",
                            "FormField",
                        ],
                        message:
                            "Please import the wrapped component from 'components' instead.",
                        name: "evergreen-ui",
                    },
                ],
            },
        ],
        "padding-line-between-statements": "off",
        "react-hooks/exhaustive-deps": "error",
        "react-hooks/rules-of-hooks": "error",
        "react/hook-use-state": "error",
        "react/jsx-boolean-value": ["error", "always"],
        "react/jsx-handler-names": "error",
        "react/jsx-no-constructed-context-values": "error",
        "react/jsx-sort-props": "error",
        "react/no-multi-comp": "error",
        "react/self-closing-comp": "error",
        "typescript-sort-keys/interface": [
            "error",
            "asc",
            {
                caseSensitive: false,
            },
        ],
        "typescript-sort-keys/string-enum": "error",
    },
};
