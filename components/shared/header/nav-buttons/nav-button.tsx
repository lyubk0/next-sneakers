import { HugeiconsIcon, IconSvgElement } from '@hugeicons/react'

interface Props {
	Icon: IconSvgElement
	onClick?: () => void
	className?: string
}

export const NavButton = ({ Icon, onClick, className }: Props) => {
	return (
		<div
			role='button'
			onClick={onClick}
			className={`ease-out text-foreground duration-150 active:scale-[0.97] hover:text-primary cursor-pointer ${className}`}
		>
			<HugeiconsIcon icon={Icon} strokeWidth={2} size={20} />
		</div>
	)
}
