'use client'

import { PageTitle } from '@/components/shared/page-title'
import { FavoritesList } from './favorites-list'

interface Props {
	className?: string
}

export const FavoritesContainer = ({ className }: Props) => {
	return (
		<div className={className}>
			<PageTitle title='Обрані товари' />
			<FavoritesList className='mt-5' />
		</div>
	)
}
