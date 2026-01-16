import { Button } from '@/components/ui/button'

interface Props {
	colorName: string
	colorHex: string
	isActive?: boolean
	onClick?: () => void
	className?: string
}

export const FiltersSidebarColorChip = ({
	colorName,
	colorHex,
	isActive = false,
	onClick,
	className,
}: Props) => {
	return (
		<Button
			className='w-max'
			variant={isActive ? 'default' : 'secondary'}
			onClick={onClick}
		>
			<div className='size-4 rounded-full' style={{ background: colorHex }} />
			{colorName}
		</Button>
	)
}
