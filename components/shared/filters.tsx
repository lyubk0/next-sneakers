'use client'

import { Accordion } from '@/components/ui/accordion'
import { cn } from '@/lib/utils'
import { BrandsFilterSection } from '../../app/(main)/_components/filters-drawer/filters-sections/brands-filter-section'
import { ColorsFilterSection } from '../../app/(main)/_components/filters-drawer/filters-sections/colors-filter-section'
import { PriceRangeFilterSection } from '../../app/(main)/_components/filters-drawer/filters-sections/price-range-filter-section'
import { SexesFilterSection } from '../../app/(main)/_components/filters-drawer/filters-sections/sexes-filter-section'
import { SizesFilterSection } from '../../app/(main)/_components/filters-drawer/filters-sections/sizes-filter-section'

interface Props {
	className?: string
}

export const Filters = ({ className }: Props) => {
	return (
		<div className={cn(className, 'flex flex-col ')}>
			<Accordion type='multiple'>
				<SexesFilterSection />
				<BrandsFilterSection />
				<PriceRangeFilterSection />
				<SizesFilterSection />
				<ColorsFilterSection />
			</Accordion>
		</div>
	)
}
