import { Product } from '@/@types/product.types'
import { CommandItem } from '@/components/ui/command'
import { Title } from '@/components/ui/title'
import Image from 'next/image'

interface Props {
	product: Product
	onSelect: (productSlug: string) => void
	className?: string
}

export const SearchCommandItem = ({ product, onSelect, className }: Props) => {
	return (
		<CommandItem onSelect={() => onSelect(product.slug)} key={product.id}>
			<div className='flex gap-4'>
				<div className='bg-muted rounded-xl aspect-square w-[90px] shrink-0 flex items-center justify-center'>
					<Image
						src={product.images[0]}
						alt={product.name}
						width={70}
						height={70}
					/>
				</div>
				<div className='flex gap-1 flex-col'>
					<Title
						size='xs'
						className='font-semibold tracking-[0.014em] !text-sm'
					>
						{product.name}
					</Title>
					<span className='text-sm font-semibold'>${product.price}</span>
				</div>
			</div>
		</CommandItem>
	)
}
