import { sexEnum } from '@/db/schema'

export type Sex = (typeof sexEnum.enumValues)[number]

export const SEXES: { value: Sex; label: string }[] = [
	{ value: 'men', label: 'Men' },
	{ value: 'women', label: 'Women' },
] as const
