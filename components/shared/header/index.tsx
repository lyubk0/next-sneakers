'use client'

import { useCategories } from '@/hooks/queries/categories/use-categories'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { Container } from '../container'
import { HeaderContent } from './header-content'
import { TopBar } from './top-bar'
import { TopBarSkeleton } from './top-bar-skeleton'

interface Props {
	className?: string
}

export const Header = ({ className }: Props) => {
	const pathname = usePathname()

	const { data: categories, isPending } = useCategories()

	const isHomePage = pathname === '/'
	return (
		<header className={cn('mb-10 mt-3 ', className)}>
			<Container className='bg-white shadow-sm max-w-[1260px] px-0 rounded-2xl '>
				<div className={cn('border-b px-5', !isHomePage && 'border-none')}>
					<HeaderContent />
				</div>
				{isPending && isHomePage && <TopBarSkeleton />}
				{isHomePage && !isPending && categories && (
					<TopBar categories={categories} className='py-6 px-5' />
				)}
			</Container>
		</header>
	)
}
