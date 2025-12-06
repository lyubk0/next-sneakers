import { CartItem as CartItemType } from '@/@types/cart-item'

import { CartItemCounter } from '@/components/shared/cart-drawer/cart-item-counter'
import { useRemoveCartItem } from '@/hooks/queries/cart/use-remove-cart-item'
import { cn } from '@/lib/utils'
import { IconTrash } from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'
import { CartItemSizeSelector } from '../cart-item-size-selector'
import { Title } from '../title'

interface Props {
	cartItem: CartItemType
	className?: string
}

export const CartDrawerItem = ({ cartItem, className }: Props) => {
	const { isPending: isRemoving } = useRemoveCartItem()
	console.log('cartItem', cartItem)
	return (
		<div
			className={cn(
				className,
				'flex w-full relative h-max transition-all duration-200',
				isRemoving && 'opacity-50 pointer-events-none'
			)}
		>
			<div className='flex gap-4 items-start'>
				<div className='bg-muted rounded-xl w-[110px] h-[110px] flex items-center justify-center'>
					<Image
						src={'/krossi.png'}
						alt={cartItem.product.name}
						width={90}
						height={90}
						quality={100}
					/>
				</div>
				<div className='flex flex-col gap-2 h-full justify-between flex-1'>
					<div className='flex items-start gap-2'>
						<Link
							href={`/${cartItem?.product?.category?.slug}/${cartItem.product.slug}`}
						>
							{' '}
							<Title size='xs' className='font-semibold'>
								{cartItem.product.name}
							</Title>
						</Link>
						<button className='hover:text-red-500 text-card-muted-foreground duration-100 ease-out cursor-pointer'>
							{' '}
							<IconTrash size={20} />
						</button>
					</div>
					<CartItemSizeSelector
						selectedSizeId={cartItem.size.id.toString()}
						sizes={cartItem.product.sizes}
					/>
					<div className='flex items-end justify-between w-full'>
						<p className='font-semibold'>
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
