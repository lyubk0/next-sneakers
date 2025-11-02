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
					variant={s.eur_size === size ? 'default' : 'outline'}
					className={cn(
						'size-[50px] hover:border-2 [transition:border-width_0.1s_ease-out]  px-2 text-center',
						s.eur_size !== size && 'text-foreground'
					)}
				>
					{s.eur_size}
				</Button>
			))}
		</div>
	)
}
