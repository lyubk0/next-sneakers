import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { IconShoppingBag } from '@tabler/icons-react'

interface Props {
	onAddToCart: () => void
	loading?: boolean
	className?: string
}

export const ProductActions = ({ onAddToCart, loading, className }: Props) => (
	<div className={cn('flex flex-col gap-2', className)}>
		<Button onClick={onAddToCart} size='xl' loading={loading}>
			<IconShoppingBag size={20} />
			Додати в корзину
		</Button>
	</div>
)
