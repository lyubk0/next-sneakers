'use client'

import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { useBrands } from '@/hooks/tanstack/brand.queries'
import { useColors } from '@/hooks/tanstack/color.queries'
import { useSizes } from '@/hooks/tanstack/sizes.queries'
import { useFiltersCount } from '@/hooks/use-filters-count.hooks'
import useIsMobile from '@/hooks/use-is-mobile.hooks'
import { useFiltersDrawerStore } from '@/store/use-filters-modal-store'
import { FiltersButton } from './filters/filters-button'
import { FiltersDrawerMobile } from './filters/filters-drawer-mobile'
import { SortButton } from './sort-button'

interface Props {
	className?: string
}

export const TopBarActions = ({ className }: Props) => {
	const { isPending: isBrandsPending } = useBrands()
	const { isPending: isColorsPending } = useColors()
	const { isPending: isSizesPending } = useSizes()
	const { count } = useFiltersCount()
	const { toggle } = useFiltersDrawerStore()
	const { isMobile } = useIsMobile()

	const isLoading = isBrandsPending || isColorsPending || isSizesPending

	const FiltersAction = () => {
		if (isLoading)
			return <Skeleton className='w-[80px] rounded-full ml-auto h-8' />
		if (isMobile)
			return (
				<FiltersDrawerMobile>
					<FiltersButton className='px-0' filtersCount={count} />
				</FiltersDrawerMobile>
			)
		return <FiltersButton filtersCount={count} onClick={toggle} />
	}

	return (
		<div className='flex h-9 items-center gap-2 justify-between'>
			<FiltersAction />
			<Separator orientation='vertical' />
			<SortButton />
		</div>
	)
}
