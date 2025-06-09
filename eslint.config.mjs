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
});

const eslintConfig = [
    ...compat.extends('next/core-web-vitals', 'next/typescript'),
    {
        plugins: {
            prettier: PrettierPlugin,
            'check-file': CheckFile,
            import: ImportPlugin,
        },
        rules: {
            'check-file/filename-naming-convention': [
                'error',
                {
                    '**/*.{jsx,tsx,js,ts,png,svg}': 'KEBAB_CASE',
                    '**/*.{config}.*': 'KEBAB_CASE',
                },
                {
                    ignoreMiddleExtensions: true,
                },
            ],
            'check-file/folder-naming-convention': [
                'error',
                {
                    './*/': 'CAMEL_CASE',
                },
            ],
            'no-console': 'warn',
            'react/prop-types': 'off',
            'react/display-name': [0],
            '@typescript-eslint/no-unused-vars': ['error'],
            'import/order': [
                'error',
                {
                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: false,
                    },
                    'newlines-between': 'always',
                    groups: [
                        'builtin',
                        'external',
                        'internal',
                        ['parent', 'sibling'],
                        'index',
                        'type',
                    ],
                    pathGroups: [
                        {
                            pattern: 'react',
                            group: 'builtin',
                        },
                        {
                            pattern: 'react-router-dom',
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
                            pattern: '@/utils/**',
                            group: 'internal',
                        },
                        {
                            pattern: '@/types/**',
                            group: 'internal',
                        },
                        {
                            pattern: '@/styles/**',
                            group: 'internal',
                        },
                        {
                            pattern: '@/assets/**',
                            group: 'internal',
                            position: 'after',
                        },
                    ],
                    distinctGroup: true,
                    pathGroupsExcludedImportTypes: ['object'],
                },
            ],
            'prettier/prettier': ['error', { endOfLine: 'auto' }],
        },
    },
];

export default eslintConfig;
