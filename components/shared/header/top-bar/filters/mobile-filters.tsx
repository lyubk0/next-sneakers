import BrandChips from '@/app/(main)/_components/brands-chips'
import { Sex } from '@/constants/product.constants'
import { SexFilterTabs } from './sex-filters-tab'

interface Props {
	selectedSexes: Sex[]
	onSexChange: (value: Sex | 'all') => void
	className?: string
}

export const MobileFilters = ({
	selectedSexes,
	onSexChange,
	className,
}: Props) => (
	<div className='flex overflow-x-auto items-center no-scrollbar lg:hidden gap-4 w-full'>
		<SexFilterTabs
			selectedSexes={selectedSexes}
			onChange={onSexChange}
			className={className}
		/>
		<div className='h-8 w-[1px] shrink-0 bg-border' />
		<BrandChips />
	</div>
)
