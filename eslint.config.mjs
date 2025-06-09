import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';
import CheckFile from 'eslint-plugin-check-file';
import ImportPlugin from 'eslint-plugin-import';
import PrettierPlugin from 'eslint-plugin-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: {},
});

const eslintConfig = [
    ...compat.extends(
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/recommended',
    ),
    {
        plugins: {
            prettier: PrettierPlugin,
            'check-file': CheckFile,
            import: ImportPlugin,
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        rules: {
            'check-file/filename-naming-convention': [
                'error',
                {
                    './src/hooks/**/*.{ts,tsx}': 'CAMEL_CASE',
                    './src/**/!(*hooks)/**/*.{jsx,tsx,js,ts,png,svg}': 'KEBAB_CASE',
                    '**/*.{config}.*': 'KEBAB_CASE',
                },
                {
                    ignoreMiddleExtensions: true,
                },
            ],
            'check-file/folder-naming-convention': [
                'error',
                {
                    '**/*': 'CAMEL_CASE',
                },
            ],
            'react/react-in-jsx-scope': 'off',
            'no-console': 'warn',
            'react/prop-types': 'off',
            'react/display-name': [0],
            '@typescript-eslint/no-unused-vars': ['error'],
            'import/order': [
                'error',
                {
                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: true,
                    },
                    'newlines-between': 'always',
                    groups: [
                        'builtin',
                        'external',
                        'internal',
                        'parent',
                        'sibling',
                        'index',
                        'object',
                        'type',
                    ],
                    pathGroups: [
                        {
                            pattern: 'react',
                            group: 'builtin',
                            position: 'before',
                        },
                        {
                            pattern: 'react-router-dom',
                            group: 'builtin',
                        },
                        {
                            pattern: '@reduxjs/toolkit',
                            group: 'builtin',
                        },
                        {
                            pattern: '@/pages/**',
                            group: 'internal',
                            position: 'before',
                        },
                        {
                            pattern: '@/components/**',
                            group: 'internal',
                            position: 'before',
                        },
                        {
                            pattern: '@/store/**',
                            group: 'internal',
                        },
                        {
                            pattern: '@/utils/**',
                            group: 'internal',
                            position: 'after',
                        },
                        {
                            pattern: '@/types/**',
                            group: 'type',
                        },
                        {
                            pattern: '@/styles/**',
                            group: 'object',
                            position: 'before',
                        },
                        {
                            pattern: '@/assets/**',
                            group: 'object',
                        },
                        {
                            pattern: '~/**',
                            group: 'object',
                            position: 'after',
                        },
                    ],
                    distinctGroup: true,
                    pathGroupsExcludedImportTypes: ['react'],
                },
            ],
            'prettier/prettier': ['error', { endOfLine: 'auto' }],
        },
    },
];

export default eslintConfig;
