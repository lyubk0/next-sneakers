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

	const isHomePage = pathname === '/'
	return (
		<header className={'mb-10 pt-3'}>
			<Container
				className={cn('bg-muted max-w-[1250px] px-0 rounded-2xl', className)}
			>
				<div className={'px-7'}>
					<HeaderContent />
				</div>
			</Container>
		</header>
	)
}
