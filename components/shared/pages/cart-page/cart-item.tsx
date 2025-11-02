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
				<Image
					height={120}
					width={120}
					src={
						'https://sneakers.com.ua/image/cache/catalog/image/catalog/image/catalog/image/newbalance/9060/fks56975/24321.webp'
					}
					alt='kross'
				/>
				<div className='flex flex-col gap-2'>
					<Title className='font-medium' size='xs'>
						{cartItem.product.name}
					</Title>
					<p className='text-muted-foreground text-sm'>
						Розмір: {cartItem.size.eur_size}
					</p>
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
