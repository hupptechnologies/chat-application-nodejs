module.exports = [
	// Specify files and directories to ignore.
	{
		ignores: ['node_modules/', 'dist/'],
	},
	// Apply configuration for all JavaScript and TypeScript files.
	{
		files: ['**/*.{js,ts}'],
		languageOptions: {
			// Use the TypeScript parser for TypeScript files.
			parser: require('@typescript-eslint/parser'),
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
			},
		},
		plugins: {
			'@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
			prettier: require('eslint-plugin-prettier'),
		},
		rules: {
			quotes: ['error', 'single', { avoidEscape: true }],
			semi: ['error', 'always'],
			'comma-spacing': ['error', { before: false, after: true }],
			'no-var': ['error'],
			'prefer-const': 'error',
			'no-console': ['error'],
			'no-unused-vars': [
				'error',
				{
					vars: 'all',
					args: 'all',
					ignoreRestSiblings: false,
					argsIgnorePattern: '^_',
				},
			],
			'keyword-spacing': ['error', { before: true, after: true }],
			'arrow-spacing': ['error', { before: true, after: true }],
			'no-trailing-spaces': ['error'],
			'react-hooks/exhaustive-deps': 'off',
			'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
			'prettier/prettier': ['error', { useTabs: true, tabWidth: 2 }],
			'@typescript-eslint/no-explicit-any': 'off',
			'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
			eqeqeq: 'error',
			curly: 'error',
			'no-duplicate-imports': 'error',
		},
	},
];
