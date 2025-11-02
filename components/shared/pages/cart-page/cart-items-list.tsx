import { CartItem as CartItemType } from '@/@types/cart-item'
import { CartItem } from '@/components/shared/pages/cart-page/cart-item'
import { cn } from '@/lib/utils'

interface Props {
	cartItems: CartItemType[]
	className?: string
}

export const CartItemsList = ({ cartItems, className }: Props) => {
	return (
		<ul className={cn(className, 'flex flex-col gap-4')}>
			{cartItems.map((item, i) => (
				<li className='flex flex-col gap-2' key={item.id}>
					<CartItem cartItem={item} />
					{cartItems.length - 1 !== i && (
						<div className='w-full h-[1px] bg-muted' />
					)}
				</li>
			))}
		</ul>
	)
}
