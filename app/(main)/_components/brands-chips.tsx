'use client'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useBrands } from '@/hooks/tanstack/brand.queries'
import { useBrandsMultiselect } from '@/hooks/use-brands-multiselect.hooks'

const mockBrands = [...Array(3)]

export default function BrandChips() {
	const { data: brands, isPending } = useBrands()
	const { selectedBrands, toggleBrand, selectedBrandsQuery } =
		useBrandsMultiselect(brands || [])

	return (
		<div className='flex items-center gap-4 '>
			{isPending &&
				mockBrands.map((_, i) => (
					<Skeleton key={i} className='h-9 w-24 rounded-full' />
				))}

			{brands?.map(brand => (
				<Button
					key={brand.id}
					variant={
						selectedBrandsQuery === null || selectedBrands.includes(brand.id)
							? 'default'
							: 'secondary'
					}
					onClick={() => toggleBrand(brand.id)}
				>
					{brand.name}
				</Button>
			))}
		</div>
	)
}
