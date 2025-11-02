'use client'

import { Category } from '@/@types/category'
import { cn } from '@/lib/utils'
import { useQueryState } from 'nuqs'
import { CategorySelector } from '../category-selector'

interface Props {
	categories: Category[]
	className?: string
}

export const TopBar = ({ categories, className }: Props) => {
	const [category, setCategory] = useQueryState(
		'category',

		{ defaultValue: 'Кросівки' }
	)

	const handleCategoryChange = (category: string) => {
		setCategory(category)
	}

	return (
		<div
			className={cn(className, 'flex justify-between items-center flex-wrap')}
		>
			<CategorySelector
				items={categories}
				value={category}
				onChange={handleCategoryChange}
			/>
		</div>
	)
}
