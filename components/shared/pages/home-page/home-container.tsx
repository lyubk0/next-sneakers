'use client'

import { useCategoryParams } from '@/hooks/nuqs'
import { SneakerMoveIcon } from '@phosphor-icons/react'
import { PageTitle } from '../../page-title'
import { ProductList } from '../../product/product-list'

interface Props {
	className?: string
}

export const HomeContainer = ({ className }: Props) => {
	const [category] = useCategoryParams()
	return (
		<div className={className}>
			<PageTitle title={category} Icon={SneakerMoveIcon} />
			<ProductList />
		</div>
	)
}
