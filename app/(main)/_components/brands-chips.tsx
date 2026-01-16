'use client'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useBrandsFilter } from '@/hooks/nuqs'
import { useBrands } from '@/hooks/queries/use-brands'

const mockBrands = [...Array(3)]

export default function BrandChips() {
	const { data: brands, isPending } = useBrands()
	const { selectedBrands, toggleBrand } = useBrandsFilter(brands || [])

	return (
		<div className='flex gap-4 flex-wrap'>
			{isPending &&
				mockBrands.map((_, i) => (
					<Skeleton key={i} className='h-9 w-24 rounded-full' />
				))}

			{brands?.map(brand => (
				<Button
					key={brand.id}
					variant={selectedBrands.includes(brand.id) ? 'default' : 'secondary'}
					onClick={() => toggleBrand(brand.id)}
				>
					{brand.name}
				</Button>
			))}
		</div>
	)
}
