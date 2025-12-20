import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Props {
	onAddToCart: () => void
	loading?: boolean
	className?: string
}

export const ProductActions = ({ onAddToCart, loading, className }: Props) => (
	<div className={cn('flex flex-col gap-2', className)}>
		<Button className='' onClick={onAddToCart} size='xl' loading={loading}>
			ADD TO BAG
		</Button>
	</div>
)
