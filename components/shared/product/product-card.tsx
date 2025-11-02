'use client'

import { Product } from '@/@types/product'
import { useToggleFavorite } from '@/hooks/queries/favorite/use-toggle-favorite'
import { cn } from '@/lib/utils'
import { HeartIcon } from '@phosphor-icons/react'
import Image from 'next/image'
import { MouseEvent } from 'react'

interface Props {
	product: Product
	className?: string
}

export const ProductCard = ({ product, className }: Props) => {
	const { mutateAsync: toggleFavorite } = useToggleFavorite()

	const handleClickFavorite = async (e: MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()
		await toggleFavorite(product.id)
	}

	return (
		<div
			className={cn(
				className,
				'p-4 w-[300px] shadow-xs cursor-auto space-y-3 rounded-2xl h-full bg-card flex flex-col',
				'transition-[box-shadow,translate, border] hover:border-border/75 duration-200 ease-in-out',
				'hover:shadow-[0_20px_35px_0_#0000000f] hover:-translate-y-[5px]'
			)}
		>
			<div className='h-[240px] select-none w-full relative'>
				<HeartIcon
					onClick={handleClickFavorite}
					size={18}
					weight='duotone'
					className={cn(
						'absolute active:scale-[0.97] z-10 right-3 top-3 text-muted-foreground cursor-pointer hover:text-red-500 duration-150 ease-out',
						product.isFavorite && 'text-red-500'
					)}
				/>
				<Image
					src={product.images[0]}
					alt='sneaker'
					fill
					className='rounded-[18px] object-cover'
				/>
			</div>

			<div className='flex flex-col flex-1 justify-between'>
				<p className='cursor-pointer font-medium hover:text-primary duration-100 ease-out tracking-[1px]'>
					{product.name}
				</p>
				<div className='flex justify-between items-end mt-4'>
					<div className='flex flex-col'>
						<span className='text-muted-foreground/60 text-sm'>Ціна</span>
						<p className='text-sm font-semibold'>{product.price} грн.</p>
					</div>
				</div>
			</div>
		</div>
	)
}
