'use client'
import { cn } from '@/lib/utils'
import { Icon } from '@phosphor-icons/react'
import { Title } from '../ui/title'

interface Props {
	title: string
	Icon?: Icon
	className?: string
}

export const PageTitle = ({ title, Icon, className }: Props) => {
	return (
		<Title size='lg' className={cn(className, 'font-bold mb-9')}>
			{Icon && <Icon size={26} weight='duotone' />}
			{title}
		</Title>
	)
}
