import { AutoComplete } from '@/components/ui/auto-complete'
import { useCities } from '@/hooks/queries/nova-post/use-cities'
import { useWarehouses } from '@/hooks/queries/nova-post/use-warehouses'
import { cn } from '@/lib/utils'
import { useState } from 'react'
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

	return (
		<div
			className={cn('w-full mt-6 flex flex-col md:flex-row gap-4', className)}
		>
			{/* Выбор города */}
			<Controller
				name='city'
				control={control}
				render={({ field: { onChange, onBlur, value } }) => (
					<AutoComplete
						placeholder='Оберіть місто'
						searchValue={searchCityValue}
						onSearchValueChange={setSearchCityValue}
						selectedValue={value}
						onSelectedValueChange={onChange}
						items={
							cities?.data.map(city => ({
								value: city.Ref,
								label: city.Description,
							})) || []
						}
					/>
				)}
			/>

			<Controller
				name='warehouse'
				control={control}
				render={({ field: { onChange, onBlur, value } }) => (
					<AutoComplete
						placeholder={
							selectedCity ? 'Оберіть відділення' : 'Спочатку виберіть місто'
						}
						searchValue={searchWarehouseValue}
						onSearchValueChange={setSearchWarehouseValue}
						selectedValue={value}
						onSelectedValueChange={onChange}
						disabled={!selectedCity}
						items={
							warehouses?.data.map(wh => ({
								value: wh.Ref,
								label: wh.Description,
							})) || []
						}
					/>
				)}
			/>
		</div>
	)
}
