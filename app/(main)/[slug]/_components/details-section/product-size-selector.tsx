import { Product } from '@/@types/product'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Props {
	className?: string
	product: Product
	setSize: (size: string) => void
	size?: string | null
}

export const ProductSizeSelector = ({
	className,
	product,
	setSize,
	size,
}: Props) => {
	return (
		<div className={cn('flex flex-wrap gap-2 w-full', className)}>
			{product.sizes.map(s => (
				<Button
					key={s.id}
					onClick={() => setSize(s.eur_size as string)}
					className={cn(
						'size-10  text-foreground font-semibold text-center bg-transparent rounded-none border-border hover:bg-transparent  border-2',
						s.eur_size === size && 'border-foreground'
					)}
				>
					{s.eur_size}
				</Button>
			))}
		</div>
	)
}
