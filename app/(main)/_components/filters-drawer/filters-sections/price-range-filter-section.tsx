'use client'

import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { FiltersTitle } from '../filters-title'
import { useLocalPriceRange } from './use-local-price-range-hook'

interface Props {
	className?: string
}

export const PriceRangeFilterSection = ({ className }: Props) => {
	const { localPrice, setLocalPrice } = useLocalPriceRange()

	return (
		<AccordionItem value='price-range'>
			<AccordionTrigger>
				<FiltersTitle title='Price range' />
			</AccordionTrigger>
			<AccordionContent>
				<div className='flex flex-col gap-4'>
					<div className='flex gap-4'>
						<Input
							onChange={e => {
								const value = e.target.value
								setLocalPrice([value ? Number(value) : 0, localPrice[1]])
							}}
							value={localPrice[0] || 0}
							className='h-9 text-sm focus-visible:ring-0'
							type='number'
							placeholder='0$'
						/>
						<Input
							value={localPrice[1] || ''}
							onChange={e => {
								const value = e.target.value
								setLocalPrice([localPrice[0], value ? Number(value) : 1000])
							}}
							className='h-9 text-sm focus-visible:ring-0'
							type='number'
							placeholder='1000$'
						/>
					</div>
					<Slider
						value={localPrice}
						onValueChange={([from, to]) => setLocalPrice([from, to])}
						min={0}
						max={1000}
						step={10}
					/>
				</div>
			</AccordionContent>
		</AccordionItem>
	)
}
