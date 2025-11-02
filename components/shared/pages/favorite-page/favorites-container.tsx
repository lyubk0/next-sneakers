'use client'

import { PageTitle } from '@/components/shared/page-title'
import { HeartIcon } from '@phosphor-icons/react'
import { FavoritesList } from './favorites-list'

interface Props {
	className?: string
}

export const FavoritesContainer = ({ className }: Props) => {
	return (
		<div className={className}>
			<PageTitle title='Обрані товари' Icon={HeartIcon} />
			<FavoritesList className='mt-5' />
		</div>
	)
}
