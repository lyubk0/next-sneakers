'use client'

import { Product } from '@/@types/product.types'
import { useIsFavorite } from '@/hooks/tanstack/favorite/favorite.queries'
import { ImageSection } from '.'

interface Props {
	product: Product
	className?: string
}

export const ImageSectionWrapper = ({ product, className }: Props) => {
	const { data, isPending } = useIsFavorite(product.id)
	return (
		<ImageSection
			product={{ ...product, isFavorite: data?.isFavorite }}
			isFavoriteLoading={isPending}
			className={className}
		/>
	)
}
