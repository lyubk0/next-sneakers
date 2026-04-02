import BrandChips from '@/app/(main)/_components/brands-chips'
import { Separator } from '@/components/ui/separator'
import { Sex } from '@/constants/product.constants'
import { SexFilterTabs } from './sex-filters-tab'

interface Props {
	selectedSexes: Sex[]
	onSexChange: (value: Sex | 'all') => void
	className?: string
}

export const DesktopFilters = ({
	selectedSexes,
	onSexChange,
	className,
}: Props) => (
	<div className='hidden lg:flex h-9 items-center gap-5'>
		<SexFilterTabs
			selectedSexes={selectedSexes}
			onChange={onSexChange}
			className={className}
		/>
		<Separator orientation='vertical' />
		<BrandChips />
	</div>
)
