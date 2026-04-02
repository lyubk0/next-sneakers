'use client'

import { Color } from '@/@types/color.types'
import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { useFilters } from '@/hooks/nuqs/filters/use-filters'
import { colorKeys } from '@/hooks/tanstack/color.queries'
import { useQueryClient } from '@tanstack/react-query'
import { FiltersColorChip } from '../filters-color-chip'
import { FiltersTitle } from '../filters-title'

interface Props {
	className?: string
}

export const ColorsFilterSection = ({ className }: Props) => {
	const queryClient = useQueryClient()

	const colors = queryClient.getQueryData(colorKeys.all) as Color[]

	const { selectedColors, toggleColor, selectedSizes } = useFilters()
	console.log(selectedColors)
	return (
		<AccordionItem value='colors'>
			<AccordionTrigger>
				<FiltersTitle title='Color' />
			</AccordionTrigger>
			<AccordionContent>
				<div className='grid grid-cols-7 gap-3 w-full'>
					{colors?.map(color => (
						<div key={color.id} className='flex items-center flex-col'>
							<FiltersColorChip
								onClick={() => toggleColor(String(color.id))}
								colorHex={color.hex}
								colorName={color.name}
								isActive={selectedColors.includes(String(color.id))}
							/>
						</div>
					))}
				</div>
			</AccordionContent>
		</AccordionItem>
	)
}
