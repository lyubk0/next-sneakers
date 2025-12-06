import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function BrandChips() {
	const brands = ['Nike', 'Puma', 'New Balance', 'Adidas']
	const [selected, setSelected] = useState<string[]>([])

	const toggleBrand = (brand: string) => {
		setSelected(prev =>
			prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
		)
	}

	return (
		<div className='flex gap-4 flex-wrap'>
			{brands.map(brand => (
				<Button
					key={brand}
					variant={selected.includes(brand) ? 'default' : 'secondary'}
					onClick={() => toggleBrand(brand)}
				>
					{brand}
				</Button>
			))}
		</div>
	)
}
