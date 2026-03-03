'use client'

import { Accordion } from '@/components/ui/accordion'
import { cn } from '@/lib/utils'
import { useIsFetching } from '@tanstack/react-query'
import { BrandsFilterSection } from './filters-sections/brands-filter-section'
import { ColorsFilterSection } from './filters-sections/colors-filter-section'
import { PriceRangeFilterSection } from './filters-sections/price-range-filter-section'
import { SexesFilterSection } from './filters-sections/sexes-filter-section'
import { SizesFilterSection } from './filters-sections/sizes-filter-section'

interface Props {
	className?: string
}

export const Filters = ({ className }: Props) => {
	const isFetching = useIsFetching({ queryKey: ['products'] }) > 0

	return (
		<div
			className={cn(
				className,
				'flex flex-col ',
				isFetching && 'pointer-events-none opacity-50',
			)}
		>
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
