'use client'

import { Product } from '@/@types/product'
import { Title } from '@/components/shared/title'
import { Accordion } from '@/components/ui/accordian'
import { useAddToCart } from '@/hooks/queries/cart/use-add-to-cart'
import { useCart } from '@/hooks/queries/cart/use-cart'
import { InfoIcon, SparkleIcon, StarIcon } from '@phosphor-icons/react'
import { useQueryState } from 'nuqs'
import toast from 'react-hot-toast'
import { ProductActions } from './product-actions'
import { ProductSizeSelector } from './product-size-selector'

interface Props {
	product: Product
	className?: string
}

export const DetailsSection = ({ product, className }: Props) => {
	const { data: cart } = useCart()

	const [size, setSize] = useQueryState('size')

	const { mutateAsync: addToCartMutation, isPending: isAddToCartPending } =
		useAddToCart()

	const handleAddToCart = async () => {
		if (!size) return toast.error('Виберіть розмір')
		const sizeId = product.sizes.find(s => s.eur_size === size)?.id as number
		if (!cart) return toast.error('Не вдалось отримати корзину')

		await addToCartMutation({
			cart_id: cart.id,
			product_id: product.id,
			size_id: sizeId,
		})
	}
	return (
		<div className='flex space-y-6 flex-1 flex-col'>
			<div className='flex flex-col gap-1'>
				<Title className='font-semibold' size='md'>
					{product?.name}
				</Title>
				<div className='flex mt-2 items-center justify-between'>
					<p className='text-lg'>{product.price} грн</p>
					<div className='flex gap-2 items-center text-sm'>
						<div className='flex text-muted-foreground items-center gap-1'>
							<StarIcon size={16} />
							<StarIcon size={16} />
							<StarIcon size={16} />
							<StarIcon size={16} />
							<StarIcon size={16} />
						</div>
						0 ( 0 оцінок )
					</div>
				</div>
			</div>

			<ProductSizeSelector product={product} setSize={setSize} size={size} />

			<ProductActions
				price={product.price}
				onAddToCart={handleAddToCart}
				loading={isAddToCartPending}
			/>
			<div className='flex flex-col gap-2'>
				<Accordion
					className='max-w-[80%]'
					items={[
						{
							id: 1,
							title: 'Опис',
							icon: SparkleIcon,
							content: (
								<div>{product.description?.replace('Опис товару\n\n', '')}</div>
							),
						},
					]}
				/>
				<Accordion
					className='max-w-[80%]'
					items={[
						{
							id: 1,
							title: 'Xарактеристики',
							icon: InfoIcon,
							content: (
								<div>{product.description?.replace('Опис товару\n\n', '')}</div>
							),
						},
					]}
				/>
			</div>
		</div>
	)
}
