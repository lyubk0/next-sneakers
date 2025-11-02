import { CartItem as CartItemType } from '@/@types/cart-item'

import { CartItemCounter } from '@/components/shared/cart-drawer/cart-item-counter'
import { useRemoveCartItem } from '@/hooks/queries/cart/use-remove-cart-item'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { Title } from '../title'

interface Props {
	cartItem: CartItemType
	className?: string
}

export const CartDrawerItem = ({ cartItem, className }: Props) => {
	const { isPending: isRemoving } = useRemoveCartItem()

	return (
		<div
			className={cn(
				className,
				'flex w-full bg-card shadow-sm relative rounded-2xl py-1 px-4  h-max transition-all duration-200',
				isRemoving && 'opacity-50 pointer-events-none'
			)}
		>
			<div className='flex gap-4 items-start'>
				<Image
					src={
						'https://sneakers.com.ua/image/cache/catalog/image/catalog/image/catalog/image/newbalance/9060/fks56975/24322.webp'
					}
					alt={cartItem.product.name}
					width={150}
					height={150}
					quality={100}
					className='rounded-xl object-cover'
				/>
				<div className='flex flex-col h-full py-3 justify-between flex-1'>
					<div className='flex flex-col gap-1.5'>
						<Link
							href={`/${cartItem?.product?.category?.slug}/${cartItem.product.slug}`}
						>
							{' '}
							<Title
								size='xs'
								className='font-medium hover:text-primary duration-100 ease'
							>
								{cartItem.product.name}
							</Title>
						</Link>
						<span className='text-muted-foreground text-sm'>
							Розмір: {cartItem.size.eur_size}
						</span>
					</div>
					<div className='flex items-center mt-4 justify-between w-full'>
						<p className='font-medium text-lg'>
							{cartItem.product.price * cartItem.quantity} грн
						</p>
						<CartItemCounter
							cartItemId={cartItem.id}
							quantity={cartItem.quantity}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
