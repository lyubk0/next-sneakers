'use client'

import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { Container } from '../container'
import { HeaderContent } from './header-content'

interface Props {
	className?: string
}

export const Header = ({ className }: Props) => {
	const pathname = usePathname()

	return (
		<header className={'mb-10 pt-3'}>
			<Container className={cn('px-0 ', className)}>
				<div className={'px-5'}>
					<HeaderContent />
				</div>
			</Container>
		</header>
	)
}
