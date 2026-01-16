import { AutoComplete } from '@/components/ui/auto-complete'
import { useCities } from '@/hooks/queries/nova-post/use-cities'
import { useWarehouses } from '@/hooks/queries/nova-post/use-warehouses'
import { cn } from '@/lib/utils'
import { useMemo, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { useDebounce } from 'use-debounce'

interface Props {
	className?: string
}

export const ShippingAddressSection = ({ className }: Props) => {
	const { control, watch } = useFormContext()

	const [searchCityValue, setSearchCityValue] = useState('')
	const [searchWarehouseValue, setSearchWarehouseValue] = useState('')

	const [debouncedSearchCity] = useDebounce(searchCityValue, 500)

	const { data: cities } = useCities(debouncedSearchCity)

	const selectedCity = watch('city')

	const { data: warehouses } = useWarehouses(
		searchCityValue,
		searchWarehouseValue
	)

	const mappedCities = useMemo(
		() =>
			cities?.data.map(city => ({
				value: city.Ref,
				label: city.Description,
			})) || [],
		[cities]
	)

	const mappedWarehouses = useMemo(
		() =>
			warehouses?.data.map(wh => ({
				value: wh.Ref,
				label: wh.Description,
			})) || [],
		[warehouses]
	)

	return (
		<div className={cn('w-full flex gap-4', className)}>
			<Controller
				name='city'
				control={control}
				render={({ field }) => (
					<AutoComplete
						{...field}
						items={mappedCities}
						className='flex-1'
						placeholder='Select city'
						label='City'
						onChange={value => {
							field.onChange(value)
							setSearchCityValue(value)
						}}
					/>
				)}
			/>

			<Controller
				name='warehouse'
				control={control}
				render={({ field }) => (
					<AutoComplete
						{...field}
						items={mappedWarehouses}
						className={cn(
							'flex-1',
							!selectedCity && 'pointer-events-none opacity-50'
						)}
						placeholder='Select warehouse'
						label='Warehouse'
						onChange={value => {
							field.onChange(value)
							setSearchWarehouseValue(value)
						}}
					/>
				)}
			/>
		</div>
	)
}
