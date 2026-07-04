/* eslint-disable */
import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import { defineConfig } from "eslint/config";
import importPlugin from "eslint-plugin-import";
import reactPlugin from "eslint-plugin-react";
import globals from "globals";


export default defineConfig([
  {
    ignores: ["dist/**/*", "temp/**/*"],
  },
  js.configs.recommended,
  reactPlugin.configs.flat.recommended,
  {
    plugins: {
      import: importPlugin,
      "@stylistic": stylistic,
    },
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      ecmaVersion: "latest",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: globals.browser,
    },
  },
  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    rules: {
      "no-unused-vars": "warn",
      "arrow-body-style": "off",
      "no-unsafe-finally": "off",
      "sort-imports": [
        "warn", 
        { 
          ignoreCase: true, 
          ignoreDeclarationSort: true, 
        },
      ],
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "@stylistic/array-bracket-newline": [
        "error",
        {
          minItems: 4,
        },
      ],
      "@stylistic/array-element-newline": [
        "error",
        {
          consistent: true,
          multiline: true,
        },
      ],
      "@stylistic/arrow-parens": "error",
      "@stylistic/arrow-spacing": "error",
      "@stylistic/block-spacing": "error",
      "@stylistic/brace-style": [
        "error",
        "stroustrup",
      ],
      "@stylistic/comma-dangle": [
        "warn",
        "always-multiline",
        // {
        //   "arrays": "never",
        // }
      ],
      "@stylistic/curly-newline": "error",
      "@stylistic/eol-last": "error",
      "@stylistic/dot-location": [
        "error",
        "property",
      ],
      "@stylistic/function-call-argument-newline": [
        "error",
        "consistent",
      ],
      "@stylistic/function-paren-newline": [
        "error",
        "multiline",
      ],
      "@stylistic/function-call-spacing": [
        "error",
        "never",
      ],
      "@stylistic/jsx-closing-bracket-location": [
        "error",
        "line-aligned",
      ],
      "@stylistic/jsx-closing-tag-location": [
        "error",
        "line-aligned",
      ],
      "@stylistic/indent": [
        "error",
        2,
        {
          offsetTernaryExpressions: false,
          ignoredNodes: ["MemberExpression"],
        },
      ],
      "@stylistic/jsx-curly-newline": "error",
      "@stylistic/jsx-equals-spacing": "error",
      "@stylistic/jsx-first-prop-new-line": "error",
      "@stylistic/jsx-function-call-newline": "error",
      "@stylistic/jsx-curly-spacing": [
        "error",
        {
          when: "never",
          children: true,
          attributes: true,
          spacing: {
            objectLiterals: "never",
          },
        },
      ],
      "@stylistic/jsx-indent-props": [
        "error",
        {
          indentMode: 2,
          ignoreTernaryOperator: true,
        },
      ],
      "@stylistic/jsx-quotes": "warn",
      "@stylistic/jsx-self-closing-comp": "error",
      // "@stylistic/jsx-shorthand-boolean": "error",
      "@stylistic/jsx-tag-spacing": "error",
      "@stylistic/key-spacing": "error",
      "@stylistic/keyword-spacing": [
        "error",
        {
          after: true,
          overrides: {
            async: {
              after: true,
            },
            if: {
              after: false,
            },
            for: {
              after: false,
            },
            switch: {
              after: false,
            },
            while: {
              after: false,
            },
            catch: {
              after: false,
            },
          },
        },
      ],
      "@stylistic/multiline-ternary": [
        "error",
        "always-multiline",
        {
          ignoreJSX: true,
        },
      ],
      "@stylistic/max-len": [
        "error",
        {
          code: 120,
        },
      ],
      "@stylistic/jsx-max-props-per-line": [
        "error",
        {
          when: "multiline",
          // maximum: 4,
        },
      ],
      "@stylistic/newline-per-chained-call": [
        "error",
        {
          ignoreChainWithDepth: 4,
        },
      ],
      "@stylistic/no-floating-decimal": "error",
      "@stylistic/no-mixed-spaces-and-tabs": "error",
      "@stylistic/no-multi-spaces": "error",
      "@stylistic/no-multiple-empty-lines": [
        "error",
        {
          max: 2,
        },
      ],
      "@stylistic/nonblock-statement-body-position": [
        "error",
        "below",
      ],
      "@stylistic/object-curly-newline": [
        "error",
        {
          consistent: true,
        },
      ],
      "@stylistic/object-curly-spacing": [
        "error",
        "always",
        {
          objectsInObjects: false,
        },
      ],
      "@stylistic/object-property-newline": [
        "error",
        {
          allowAllPropertiesOnSameLine: true,
        },
      ],
      "@stylistic/quote-props": [
        "error",
        "as-needed",
      ],
      "@stylistic/quotes": [
        "error",
        "double",
        {
          avoidEscape: true,
        },
      ],
      "@stylistic/semi": "error",
      "@stylistic/space-before-blocks": "error",
      "@stylistic/space-before-function-paren": [
        "error",
        {
          anonymous: "always",
          named: "never",
          asyncArrow: "always",
          catch: "never",
        },
      ],
      "@stylistic/space-in-parens": "error",
      "@stylistic/space-infix-ops": "error",
      "@stylistic/space-unary-ops": "error",
      "@stylistic/template-curly-spacing": "error",
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            ["internal", "sibling", "parent"],
            "index",
          ],
          pathGroups: [
            {
              pattern: "react**",
              group: "builtin",
              position: "before",
            },
            // {
            //   pattern: "@**/**",
            //   group: "builtin",
            //   position: "",
            // },
            {
              pattern: "{/api/**,/context/**,/routes/**,/hooks/**,/modules/**}",
              group: "internal",
              position: "before",
            },
            {
              pattern: "{/layout/**,/pages/**,/components/**,./**}",
              group: "internal",
            },
            {
              pattern: "{/utils/**,/assets/**}",
              group: "internal",
              position: "after",
            },
          ],
          // pathGroupsExcludedImportTypes: ["internal", "sibling", "parent"],
          "newlines-between": "always",
          named: true,
          warnOnUnassignedImports: true,
          alphabetize: { 
            order: "asc", 
            caseInsensitive: true, 
          },
        },
      ],
    },
  },
]);
