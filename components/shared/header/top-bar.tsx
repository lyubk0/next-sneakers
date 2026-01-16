'use client'

import { Sex } from '@/@types/product'
import BrandChips from '@/app/(main)/_components/brands-chips'
import { Button } from '@/components/ui/button'
import { ToggleTabs } from '@/components/ui/toggle-tabs'
import { useSexFilter } from '@/hooks/nuqs/use-sex-filter'
import { useFiltersSidebarStore } from '@/store/use-filters-sidebar-store'
import { FilterIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

interface Props {
	className?: string
}

export const TopBar = ({ className }: Props) => {
	const { toggle } = useFiltersSidebarStore()

	const { selectedSexes, selectSingleSex, clearSexes } = useSexFilter()

	const handleSexChange = (value: Sex | 'all') => {
		if (value === 'all') {
			clearSexes()
			return
		}

		selectSingleSex(value)
	}

	return (
		<div className='flex justify-between'>
			<div className='flex gap-5 items-center '>
				<ToggleTabs
					onChange={(value: string) => handleSexChange(value as Sex | 'all')}
					value={selectedSexes.length === 1 ? selectedSexes[0] : 'all'}
					options={[
						{ value: 'all', label: 'All' },
						{
							value: 'unisex',
							label: 'Unisex',
						},
						{
							value: 'men',
							label: 'Men',
						},
						{
							value: 'women',
							label: 'Women',
						},
					]}
					className={className}
				></ToggleTabs>

				<div className='h-8 w-[1px] bg-muted' />
				<BrandChips />
			</div>

			<Button onClick={() => toggle()} variant={'ghost'}>
				<HugeiconsIcon strokeWidth={2} icon={FilterIcon} />
				Filters
			</Button>
		</div>
	)
}
