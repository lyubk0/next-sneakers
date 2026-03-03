'use client'

import { Sex } from '@/@types/product'
import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { CheckboxLabel } from '@/components/ui/checkbox-label'
import { SEXES } from '@/constants/product-constants'
import { useSexFilter } from '@/hooks/nuqs'
import { FiltersTitle } from '../filters-title'

interface Props {
	className?: string
}

export const SexesFilterSection = ({ className }: Props) => {
	const { selectedSexes, toggleSex } = useSexFilter()
	return (
		<AccordionItem value='sexes'>
			<AccordionTrigger>
				<FiltersTitle title='Sex' />
			</AccordionTrigger>
			<AccordionContent>
				<div className='flex gap-1.5 flex-col'>
					{SEXES.map(sex => (
						<CheckboxLabel
							key={sex.value}
							onCheckedChange={() => toggleSex(sex.value as Sex)}
							checked={selectedSexes.includes(sex.value as Sex)}
							id={sex.value}
							label={sex.label}
						/>
					))}
				</div>
			</AccordionContent>
		</AccordionItem>
	)
}
