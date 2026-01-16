'use client'

import { Sex } from '@/@types/product'
import { Button } from '@/components/ui/button'
import { CheckboxLabel } from '@/components/ui/checkbox-label'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import {
	useBrandsFilter,
	usePriceRangeFilter,
	useSexFilter,
} from '@/hooks/nuqs'
import { useColorsFilter } from '@/hooks/nuqs/use-colors-filter'
import { useSizeFilter } from '@/hooks/nuqs/use-size-filters'
import { useBrands } from '@/hooks/queries/use-brands'
import { useColors } from '@/hooks/queries/use-colors'
import { useSizes } from '@/hooks/queries/use-sizes'
import { cn } from '@/lib/utils'
import { FiltersSidebarColorChip } from './filters-sidebar-color-chip'
import { FiltersSidebarTitle } from './filters-sidebar-title'

interface Props {
	className?: string
}

const SIZES = [36, 37, 38, 39, 40, 41, 42, 43, 44]

const SEXES = [
	{ label: 'Men', value: 'men' },
	{ label: 'Women', value: 'women' },
	{ label: 'Unisex', value: 'unisex' },
]

export const FiltersSidebar = ({ className }: Props) => {
	const { data: brands } = useBrands()
	const { data: sizes } = useSizes()
	const { data: colors } = useColors()

	const { selectedSexes, toggleSex } = useSexFilter()
	const { selectedBrands, toggleBrand } = useBrandsFilter(brands || [])
	const { priceFrom, priceTo, setPriceRange } = usePriceRangeFilter()
	const { selectedSizes, toggleSize } = useSizeFilter(sizes || [])
	const { selectedColors, toggleColor } = useColorsFilter([])

	return (
		<div className={cn(className, 'flex flex-col')}>
			<FiltersSidebarTitle title='Sex' />
			<div className='flex gap-1.5 flex-col'>
				{SEXES.map(sex => (
					<CheckboxLabel
						onCheckedChange={() => toggleSex(sex.value as Sex)}
						checked={selectedSexes.includes(sex.value as Sex)}
						id={sex.value}
						label={sex.label}
					/>
				))}
			</div>
			<Separator className='my-4' orientation='horizontal' />
			<FiltersSidebarTitle title='Brands' />
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
			<Separator className='my-4' orientation='horizontal' />
			<FiltersSidebarTitle title='Price range' />
			<div className='flex gap-4'>
				<Input
					onChange={e => {
						const value = e.target.value

						setPriceRange({
							from: value ? Number(value) : null,
						})
					}}
					value={Number(priceFrom) || ''}
					className='h-9 text-sm'
					type='number'
					placeholder='0$'
				/>
				<Input
					value={Number(priceTo) || ''}
					onChange={e => {
						const value = e.target.value

						setPriceRange({
							to: value ? Number(value) : null,
						})
					}}
					className='h-9 text-sm'
					type='number'
					placeholder='1000$'
				/>
			</div>
			<Separator className='my-4' orientation='horizontal' />
			<FiltersSidebarTitle title='Size' />
			<div className='grid grid-cols-[repeat(auto-fill,minmax(34px,1fr))] gap-2'>
				{sizes?.map(size => (
					<Button
						onClick={() => toggleSize(size)}
						key={size}
						className={cn(
							'size-7  text-foreground text-xs font-semibold text-center bg-transparent rounded-none border-border hover:bg-transparent  border-2',
							selectedSizes.includes(size)
								? 'border-foreground'
								: 'border-border'
						)}
					>
						{Number(size)}
					</Button>
				))}
			</div>
			<Separator className='my-4' orientation='horizontal' />
			<FiltersSidebarTitle title='Color' />
			<div className='grid grid-cols-[repeat(auto-fill,minmax(70px,1fr))] gap-2 w-full'>
				{colors?.map(color => (
					<FiltersSidebarColorChip
						onClick={() => toggleColor(String(color.id))}
						colorHex={color.hex}
						colorName={color.name}
						isActive={selectedColors.includes(String(color.id))}
					/>
				))}
			</div>
		</div>
	)
}
