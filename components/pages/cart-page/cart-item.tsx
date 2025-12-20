import { CartItem as CartItemType } from '@/@types/cart-item'
import { CartItemCounter } from '@/components/shared/cart-drawer/cart-item-counter'
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
				<div className='bg-muted rounded-xl w-[90px] h-[90px] flex items-center justify-center'>
					<Image
						src={'/krossi.png'}
						alt={cartItem.product.name}
						width={70}
						height={70}
						quality={100}
					/>
				</div>
				<div className='flex font-semibold text-sm flex-col gap-2'>
					<Title className='!text-sm'>{cartItem.product.name}</Title>
					<span>{cartItem.size.eur_size}</span>
				</div>
			</div>
			<p className='font-semibold !text-sm'>
				${cartItem.product.price * cartItem.quantity}
			</p>

			<CartItemCounter cartItemId={cartItem.id} quantity={cartItem.quantity} />
		</div>
	)
}
