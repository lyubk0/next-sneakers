'use client'

import { Button } from '@/components/ui/button'
import {
	ToggleTabs,
	ToggleTabsItem,
	ToggleTabsList,
} from '@/components/ui/toggle-tabs'
import { useBrands } from '@/hooks/queries/brands/use-brands'
import {
	GenderFemaleIcon,
	GenderMaleIcon,
	SlidersIcon,
} from '@phosphor-icons/react'
import { useState } from 'react'
import BrandChips from '../brands-chips'

interface Props {
	className?: string
}

export const TopBar = ({ className }: Props) => {
	const { data: brands, isPending } = useBrands()
	const [activeBrandId, setActiveBrandId] = useState<number>(0)

	if (isPending) return <div>Loading...</div>
	if (!brands) return <div>Error</div>
	return (
		<div className='flex justify-between'>
			<div className='flex gap-5 items-center '>
				<ToggleTabs defaultValue='intersex' className={className}>
					<ToggleTabsList>
						<ToggleTabsItem value='intersex'>
							<p className='text-sm'>All</p>
						</ToggleTabsItem>
						<ToggleTabsItem value='male'>
							<GenderMaleIcon />
						</ToggleTabsItem>
						<ToggleTabsItem value='female'>
							<GenderFemaleIcon />
						</ToggleTabsItem>
					</ToggleTabsList>
				</ToggleTabs>

				<div className='h-8 w-[1px] bg-muted' />
				<BrandChips />
			</div>

			<Button variant={'ghost'}>
				<SlidersIcon />
				Filters
			</Button>
		</div>
	)
}
