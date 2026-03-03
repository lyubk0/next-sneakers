'use client'

import { Brand } from '@/@types/brand-types'
import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { CheckboxLabel } from '@/components/ui/checkbox-label'
import { brandKeys } from '@/hooks/tanstack/brand-queries'
import { useBrandsMultiselect } from '@/hooks/use-brands-multiselect'
import { useQueryClient } from '@tanstack/react-query'
import { FiltersTitle } from '../filters-title'

interface Props {
	className?: string
}

export const BrandsFilterSection = ({ className }: Props) => {
	const queryClient = useQueryClient()

	const brands = queryClient.getQueryData(brandKeys.all) as Brand[]

	const { toggleBrand, selectedBrands } = useBrandsMultiselect(brands || [])
	return (
		<AccordionItem value='brands'>
			<AccordionTrigger>
				<FiltersTitle title='Brands' />
			</AccordionTrigger>
			<AccordionContent>
				<div className='flex gap-1.5 flex-col'>
					{brands?.map(brand => (
						<CheckboxLabel
							key={brand.id}
							label={brand.name}
							id={String(brand.id)}
							checked={selectedBrands.includes(brand.id)}
							onCheckedChange={() => toggleBrand(brand.id)}
						/>
					))}
				</div>
			</AccordionContent>
		</AccordionItem>
	)
}
