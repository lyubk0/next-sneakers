'use client'

import { useFilters } from '@/hooks/nuqs/filters/use-filters'
import { Container } from '../../container'
import { DesktopFilters } from './filters/desktop-filters'
import { MobileFilters } from './filters/mobile-filters'
import { TopBarActions } from './top-bar-actions'

interface Props {
	className?: string
}

export const TopBar = ({ className }: Props) => {
	const { selectedSexes, selectSingleSex, clearSexes } = useFilters()

	const handleSexChange = (value: 'all' | 'men' | 'women') => {
		if (value === 'all') return clearSexes()
		selectSingleSex(value)
	}

	return (
		<div
			className='flex flex-col lg:flex-row lg:h-[60px] lg:items-center justify-between w-full
			sticky top-0 z-10 bg-white/70 backdrop-blur-md'
		>
			<Container className='flex flex-col lg:flex-row w-full justify-between lg:items-center py-2 lg:py-0 gap-2 lg:gap-0'>
				<MobileFilters
					selectedSexes={selectedSexes}
					onSexChange={handleSexChange}
					className={className}
				/>
				<div className='flex w-full items-center justify-start lg:justify-between gap-5'>
					<DesktopFilters
						selectedSexes={selectedSexes}
						onSexChange={handleSexChange}
						className={className}
					/>
					<TopBarActions />
				</div>
			</Container>
		</div>
	)
}
