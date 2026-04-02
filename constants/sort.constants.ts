export const SORT_OPTION_VALUES = [
	'recommended',
	'price_asc',
	'price_desc',
] as const
export type SortValue = (typeof SORT_OPTION_VALUES)[number]

export const SORT_OPTIONS: { value: SortValue; label: string }[] = [
	{ value: 'recommended', label: 'Recommended' },
	{ value: 'price_asc', label: 'Price: Low to High' },
	{ value: 'price_desc', label: 'Price: High to Low' },
]
