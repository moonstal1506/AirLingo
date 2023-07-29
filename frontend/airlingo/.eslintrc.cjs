module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        "prettier",
        "eslint:recommended",
        "airbnb",
        "airbnb/hooks",
        "plugin:react/jsx-runtime",
        "plugin:prettier/recommended",
    ],
    ignorePatterns: ["dist", ".eslintrc.cjs"],
    parserOptions: { ecmaVersion: "latest", sourceType: "module" },
    settings: {
        react: { version: "18.2" },
    },
    plugins: ["react-refresh", "react-hooks", "jsx-a11y", "prettier"],
    rules: {
        "jsx-a11y/alt-text": "error",
        "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
        "prettier/prettier": ["error", { endOfLine: "auto" }],
        "react/jsx-filename-extension": ["error", { extensions: [".js", ".jsx"] }],
        "import/no-unresolved": "off",
        "import/extensions": "off",
        "jsx-a11y/label-has-associated-control": [
            2,
            {
                labelAttributes: ["htmlFor"],
            },
        ],
    },
};
