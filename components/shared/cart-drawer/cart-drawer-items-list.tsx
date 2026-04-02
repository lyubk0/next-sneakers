import { CartItem } from '@/@types/cart-item.types'
import { CartDrawerItem } from '@/components/shared/cart-drawer/cart-drawer-item'

interface Props {
	items: CartItem[]
}

export const CartDrawerItemsList = ({ items }: Props) => (
	<ul className='flex flex-1 overflow-x-hidden overflow-y-auto flex-col gap-9'>
		{items.map(item => (
			<li key={item.id}>
				<CartDrawerItem cartItem={item} />
			</li>
		))}
	</ul>
)
