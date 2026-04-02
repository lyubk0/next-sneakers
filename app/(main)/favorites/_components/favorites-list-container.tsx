'use client'

import { ProductList } from '@/components/shared/product/product-list'
import { SomethingWentWrong } from '@/components/shared/something-went-wrong'
import { ANIMATED_EMOJIS } from '@/constants/animated-emojis.constants'
import { useProducts } from '@/hooks/tanstack/product.queries'
import { useMemo } from 'react'

interface Props {
	className?: string
}

export const FavoritesListContainer = ({ className }: Props) => {
	const { data, isPending } = useProducts({ page: 1 })

	const favoriteProducts = useMemo(() => {
		if (!data) return []
		return data.items.filter(product => product.isFavorite)
	}, [data])

	return (
		<div className={className}>
			{!isPending && favoriteProducts.length === 0 ? (
				<SomethingWentWrong
					lottieEmoji={ANIMATED_EMOJIS.brokenHeart}
					title='Your favorites list is empty!'
					subtext='Start adding products you love'
				/>
			) : (
				<ProductList items={favoriteProducts} isPending={isPending} />
			)}
		</div>
	)
}
