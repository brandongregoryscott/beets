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
        "typescript-sort-keys",
    ],
    rules: {
        "@typescript-eslint/consistent-type-definitions": "error",
        "@typescript-eslint/consistent-type-exports": "off", // TODO: Set this to `error` when cra is updated
        "@typescript-eslint/consistent-type-imports": "off", // TODO: Set this to `error` when cra is updated
        "collation/no-inline-export": "off", // TODO: Set this to `error` when cra is updated (used in conjunction with consistent-type-exports/imports)
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
        "padding-line-between-statements": "off",
        "@typescript-eslint/padding-line-between-statements": [
            "error",
            {
                blankLine: "always",
                prev: "*",
                next: "export",
            },
            {
                blankLine: "never",
                prev: "export",
                next: "export",
            },
            {
                blankLine: "always",
                prev: "import",
                next: "*",
            },
            {
                blankLine: "never",
                prev: "import",
                next: "import",
            },
        ],
        "typescript-sort-keys/interface": [
            "error",
            "asc",
            { caseSensitive: false },
        ],
        "typescript-sort-keys/string-enum": "error",
        "react/jsx-sort-props": "error",
    },
};
