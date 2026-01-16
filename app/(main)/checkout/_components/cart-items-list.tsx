import { CartItem as CartItemType } from '@/@types/cart-item'
import { CartItem } from '@/app/(main)/checkout/_components/cart-item'
import { cn } from '@/lib/utils'

interface Props {
	cartItems?: CartItemType[]
	className?: string
}

export const CartItemsList = ({ cartItems, className }: Props) => {
	return (
		<ul className={cn(className, 'flex flex-col gap-8')}>
			{cartItems?.map((item, i) => (
				<li className='flex flex-col gap-2' key={item.id}>
					<CartItem cartItem={item} />
				</li>
			))}
		</ul>
	)
}
