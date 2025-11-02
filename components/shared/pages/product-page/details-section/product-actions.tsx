import { Button } from '@/components/ui/button'
import { ShoppingCartIcon } from '@phosphor-icons/react'

export const ProductActions = ({
	onAddToCart,
	loading,
}: {
	price: number
	onAddToCart: () => void
	loading?: boolean
}) => (
	<div className='flex flex-col max-w-[80%] gap-2'>
		<Button onClick={onAddToCart} size='lg' loading={loading}>
			<ShoppingCartIcon size={20} weight='duotone' />
			Додати в корзину
		</Button>
	</div>
)
