import { useProductsByGroup } from '@/hooks/tanstack/product-queries'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ProductVariant } from './product-variant'
import { ProductVariantSkeleton } from './product-variant/product-variant-skeleton'

interface Props {
	productId: number
	groupSlug: string
	className?: string
}

const SKELETONS = Array(4).fill(undefined)

export const ProductVariants = ({ productId, groupSlug, className }: Props) => {
	const { data, isPending } = useProductsByGroup(groupSlug)
	return (
		<div
			className={cn(
				className,
				'flex p-1 relative -left-1 overflow-x-auto no-scrollbar gap-4',
			)}
		>
			{isPending && SKELETONS.map((_, i) => <ProductVariantSkeleton key={i} />)}

			{data?.map(product => (
				<Link key={product.id} href={`/${product.slug}`}>
					<ProductVariant
						isActive={product.id === productId}
						imgUrl={product.images[0]}
					/>
				</Link>
			))}
		</div>
	)
}
