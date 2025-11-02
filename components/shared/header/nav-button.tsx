import { Icon } from '@phosphor-icons/react'

interface Props {
	Icon: Icon
	className?: string
}

export const NavButton = ({ Icon, className }: Props) => {
	return (
		<div
			role='button'
			className='ease-out text-muted-foreground duration-150 active:scale-[0.97] hover:text-primary cursor-pointer'
		>
			<Icon size={22} weight='duotone' />
		</div>
	)
}
