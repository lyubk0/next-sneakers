'use client'

import { Product } from '@/@types/product'
import { Title } from '@/components/shared/title'
import { useAddToCart } from '@/hooks/queries/cart/use-add-to-cart'
import { useCart } from '@/hooks/queries/cart/use-cart'
import { useQueryState } from 'nuqs'
import toast from 'react-hot-toast'
import { ProductActions } from './product-actions'
import { ProductSizeSelector } from './product-size-selector'

import '@smastrom/react-rating/style.css'

interface Props {
	product: Product
	className?: string
}
const customStyles = {
	itemShapes: (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			className='icon icon-tabler icons-tabler-filled icon-tabler-star'
		>
			<path stroke='none' d='M0 0h24v24H0z' fill='none' />
			<path d='M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z' />
		</svg>
	),
	activeFillColor: 'oklch(85.2% 0.199 91.936)',
	inactiveFillColor: 'oklch(0.9261 0 0 / 72.16%)',
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
		<div className='flex-1'>
			<div className='flex max-w-[80%] flex-col'>
				<div className='flex flex-col'>
					<Title className='font-semibold uppercase' size='sm2'>
						{product?.name}
					</Title>
					{/* <div className='flex relative -left-[1px] items-center gap-2'>
						<Rating
							style={{ maxWidth: 100 }}
							value={4.5}
							itemStyles={customStyles}
							readOnly
						/>
						<Separator className='!h-5' orientation='vertical' />
						<span className='text-card-muted-foreground text-sm'>
							10 reviews
						</span>
					</div> */}
					<Title className='font-semibold' size='sm2'>
						${product?.price}
					</Title>
				</div>
				<p className='font-medium text-card-muted-foreground mt-5'>
					{product.description}
				</p>
				<div className='flex mt-5 h-full flex-1 flex-col gap-10'>
					<div className='flex flex-col'>
						<p className='mb-2 font-medium text-sm'>Size</p>
						<ProductSizeSelector
							product={product}
							setSize={setSize}
							size={size}
						/>
						<ProductActions
							onAddToCart={handleAddToCart}
							loading={isAddToCartPending}
							className='mt-6'
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
