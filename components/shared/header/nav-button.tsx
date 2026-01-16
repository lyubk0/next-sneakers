import { HugeiconsIcon, IconSvgElement } from '@hugeicons/react'

interface Props {
	Icon: IconSvgElement
	className?: string
}

export const NavButton = ({ Icon, className }: Props) => {
	return (
		<div
			role='button'
			className='ease-out text-foreground duration-150 active:scale-[0.97] hover:text-primary cursor-pointer'
		>
			<HugeiconsIcon icon={Icon} strokeWidth={2} size={20} />
		</div>
	)
}
