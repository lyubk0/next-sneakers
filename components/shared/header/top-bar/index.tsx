'use client'

import { Sex } from '@/@types/product'
import BrandChips from '@/app/(main)/_components/brands-chips'
import { Skeleton } from '@/components/ui/skeleton'
import { ToggleTabs } from '@/components/ui/toggle-tabs'
import { SEXES } from '@/constants/product-constants'
import { useFilters } from '@/hooks/nuqs/filters/use-filters'
import { useBrands } from '@/hooks/tanstack/brand-queries'
import { useColors } from '@/hooks/tanstack/color-queries'
import { useSizes } from '@/hooks/tanstack/sizes-queries'
import { useFiltersCount } from '@/hooks/use-filters-count'
import useIsMobile from '@/hooks/use-is-mobile'
import { useFiltersModalStore } from '@/store/use-filters-modal-store'
import { Container } from '../../container'
import { FiltersButton } from './filters-button'
import { FiltersDrawer } from './filters-drawer'

interface Props {
	className?: string
}

export const TopBar = ({ className }: Props) => {
	const { isPending: isBrandsPending } = useBrands()
	const { isPending: isColorsPending } = useColors()
	const { isPending: isSizesPending } = useSizes()

	const { count } = useFiltersCount()
	const { toggle } = useFiltersModalStore()
	const { isMobile } = useIsMobile()

	const { selectedSexes, selectSingleSex, clearSexes } = useFilters()

	const handleSexChange = (value: Sex | 'all') => {
		if (value === 'all') {
			clearSexes()
			return
		}

		selectSingleSex(value)
	}

	return (
		<div
			className='flex flex-col md:flex-row md:h-[60px] md:items-center justify-between w-full
                sticky top-0 z-10
                bg-white/70 backdrop-blur-md'
		>
			<Container className='flex flex-col md:flex-row w-full justify-between md:items-center py-2 md:py-0 gap-4 md:gap-0'>
				<div className='flex md:hidden w-full'>
					<BrandChips />
				</div>

				<div className='flex w-full items-center justify-between md:justify-start gap-5'>
					<ToggleTabs
						onChange={(value: string) => handleSexChange(value as Sex | 'all')}
						value={selectedSexes.length === 1 ? selectedSexes[0] : 'all'}
						options={[{ value: 'all', label: 'All' }, ...SEXES]}
						className={className}
					/>

					<div className='hidden md:flex items-center gap-5'>
						<div className='h-8 w-[1px] bg-muted' />
						<BrandChips />
					</div>

					{isColorsPending || isSizesPending || isBrandsPending ? (
						<Skeleton className='w-[80px] rounded-full ml-auto h-9' />
					) : isMobile ? (
						<FiltersDrawer>
							<FiltersButton className='px-0' filtersCount={count} />
						</FiltersDrawer>
					) : (
						<FiltersButton filtersCount={count} onClick={() => toggle()} />
					)}
				</div>
			</Container>
		</div>
	)
}
