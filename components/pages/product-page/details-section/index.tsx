'use client'

import { Product } from '@/@types/product'
import { Title } from '@/components/shared/title'
import { useAddToCart } from '@/hooks/queries/cart/use-add-to-cart'
import { useCart } from '@/hooks/queries/cart/use-cart'
import { Rating } from '@smastrom/react-rating'
import { useQueryState } from 'nuqs'
import toast from 'react-hot-toast'
import { ProductActions } from './product-actions'
import { ProductSizeSelector } from './product-size-selector'

import { Separator } from '@/components/ui/separator'
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
				<div className='flex flex-col gap-2'>
					<Title className='font-bold' size='md'>
						{product?.name}
					</Title>
					<div className='flex relative -left-[1px] items-center gap-2'>
						<Rating
							style={{ maxWidth: 100 }}
							value={4.5}
							itemStyles={customStyles}
							readOnly
						/>
						<Separator className='!h-5' orientation='vertical' />
						<span className='text-card-muted-foreground text-sm'>
							10 відгуків
						</span>
					</div>
					<div className='flex mt-2 items-center justify-between'>
						<p className='font-bold text-[22px]'>{product.price} грн</p>
					</div>
				</div>
				<p className='text-card-muted-foreground mt-5'>
					New Balance 9060 — ці кросівки є стильним і функціональним взуттям,
					яке поєднує в собі сучасний дизайн і передові технології. Вони є
					одними з нових моделей від всесвітньо відомого бренду New Balance,
					який славиться своєю якістю та комфортом. New Balance 9060 — це
					взуття, розроблене для тих, хто цінує комфорт, якість та стиль. Вони
					ідеально підходять для будь-якої активності, від спорту до
					повсякденного життя. Якщо Ви шукаєте надійну та сучасну пару кросівок,
					New Balance 9060 саме те, що Вам потрібно.
				</p>
				<div className='flex mt-5 h-full flex-col gap-10'>
					<div className='flex flex-col'>
						<p className='mb-2 font-medium text-sm'>Розмір</p>
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
