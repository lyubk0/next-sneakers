import { TablerIcon } from '@tabler/icons-react'

interface Props {
	Icon: TablerIcon
	className?: string
}

export const NavButton = ({ Icon, className }: Props) => {
	return (
		<div
			role='button'
			className='ease-out text-foreground duration-150 active:scale-[0.97] hover:text-primary cursor-pointer'
		>
			<Icon size={20} />
		</div>
	)
}
