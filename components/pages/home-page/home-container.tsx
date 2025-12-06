'use client'

import { TopBar } from '../../shared/header/top-bar'
import { ProductList } from '../../shared/product/product-list'

interface Props {
	className?: string
}

export const HomeContainer = ({ className }: Props) => {
	return (
		<div className={className}>
			<TopBar />
			<ProductList className='mt-8' />
		</div>
	)
}
