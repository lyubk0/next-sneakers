'use client'

import { Product } from '@/@types/product.types'
import { Title } from '@/components/ui/title'
import { useQueryState } from 'nuqs'
import toast from 'react-hot-toast'
import { ProductSizeSelector } from './product-size-selector'

import { Button } from '@/components/ui/button'
import { useAddToCart } from '@/hooks/tanstack/cart/cart.mutations'
import { useCart } from '@/hooks/tanstack/cart/cart.queries'
import { ProductVariants } from './product-variants'

interface Props {
	product: Product
	className?: string
}

export const DetailsSection = ({ product, className }: Props) => {
	const { data: cart } = useCart()

	const [size, setSize] = useQueryState('size', {
		defaultValue: String(product.sizes[0]?.eur_size),
	})

	const { mutateAsync: addToCartMutation, isPending: isAddToCartPending } =
		useAddToCart()

	const handleAddToCart = async () => {
		try {
			const sizeId = product.sizes.find(s => s.eur_size === size)?.id as number

			if (!cart) return toast.error('Something went wrong. Please try again.')

			await addToCartMutation({
				cart_id: cart.id,
				product_id: product.id,
				size_id: sizeId,
			})
			toast.success('The item has been added to your cart')
		} catch (error) {
			console.log(error)
			toast.error('Something went wrong. Please try again.')
		}
	}
	return (
		<div className='flex-1'>
			<div className='flex w-full lg:max-w-[80%] flex-col'>
				<div className='flex flex-col'>
					<Title className='font-bold uppercase' size='sm2'>
						{product?.name}
					</Title>
					<Title className='font-bold' size='sm2'>
						${product?.price}
					</Title>
				</div>
				<p className='font-medium text-card-muted-foreground mt-5'>
					{product.description}
				</p>
				<div className='flex mt-7 h-full gap-8 flex-1 flex-col'>
					<div className='flex gap-5 flex-col'>
						<ProductVariants
							groupSlug={product.groupSlug}
							productId={product.id}
						/>
						<ProductSizeSelector
							product={product}
							setSize={setSize}
							size={size}
						/>
					</div>
					<Button
						onClick={handleAddToCart}
						size='xl'
						isLoading={isAddToCartPending}
					>
						ADD TO BAG
					</Button>
				</div>
			</div>
		</div>
	)
}
