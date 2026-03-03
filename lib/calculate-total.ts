import { CartItem } from '@/@types/cart-item-types'

export const calculateTotal = (items: CartItem[]) => {
	return items.reduce((sum, item) => {
		const price = item.product?.price ?? 0
		return sum + price * item.quantity
	}, 0)
}
