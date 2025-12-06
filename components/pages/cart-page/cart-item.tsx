import { CartItem as CartItemType } from '@/@types/cart-item'
import { CartItemCounter } from '@/components/shared/cart-drawer/cart-item-counter'
import { CartItemSizeSelector } from '@/components/shared/cart-item-size-selector'
import { Title } from '@/components/shared/title'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface Props {
	cartItem: CartItemType
	className?: string
}

export const CartItem = ({ cartItem, className }: Props) => {
	return (
		<div className={cn(className, 'flex justify-between items-center')}>
			<div className='flex items-center gap-8'>
				<div className='bg-muted rounded-xl w-[110px] h-[110px] flex items-center justify-center'>
					<Image
						src={'/krossi.png'}
						alt={cartItem.product.name}
						width={90}
						height={90}
						quality={100}
					/>
				</div>
				<div className='flex flex-col gap-2'>
					<Title className='font-medium' size='xs'>
						{cartItem.product.name}
					</Title>
					<CartItemSizeSelector
						selectedSizeId={cartItem.size.id.toString()}
						sizes={cartItem.product.sizes}
					/>
				</div>
			</div>
			<p className='text-lg font-medium'>
				{' '}
				{cartItem.product.price * cartItem.quantity} грн
			</p>

			<CartItemCounter cartItemId={cartItem.id} quantity={cartItem.quantity} />
		</div>
	)
}
