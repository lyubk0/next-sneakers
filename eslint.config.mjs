import { FlatCompat } from '@eslint/eslintrc'
import importPlugin from 'eslint-plugin-import'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
	baseDirectory: __dirname,
})

const eslintConfig = [
	...compat.extends('next/core-web-vitals', 'next/typescript'),

	{
		plugins: {
			import: importPlugin,
		},

		ignores: [
			'node_modules/**',
			'.next/**',
			'out/**',
			'build/**',
			'next-env.d.ts',
		],

		rules: {
			// ❌ Запрещаем подниматься выше одного уровня
			'import/no-relative-parent-imports': 'error',

			// ⚠️ Предупреждаем, если импорт идёт на 2 уровня выше
			'import/no-restricted-paths': [
				'error',
				{
					zones: [
						{
							target: './src',
							from: '../..',
							message:
								'Используй абсолютный импорт "@/..." для файлов выше одного уровня.',
						},
					],
				},
			],
		},

		settings: {
			'import/resolver': {
				typescript: {
					project: './tsconfig.json',
				},
			},
		},
	},
]

export default eslintConfig
