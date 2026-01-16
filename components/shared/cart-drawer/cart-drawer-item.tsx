import { CartItem as CartItemType } from '@/@types/cart-item'

import { CartItemCounter } from '@/components/shared/cart-drawer/cart-item-counter'
import { useRemoveCartItem } from '@/hooks/queries/cart/use-remove-cart-item'
import { cn } from '@/lib/utils'
import { Trash } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import Image from 'next/image'
import Link from 'next/link'
import { Title } from '../../ui/title'

interface Props {
	cartItem: CartItemType
	className?: string
}

export const CartDrawerItem = ({ cartItem, className }: Props) => {
	const { isPending: isRemoving, mutateAsync } = useRemoveCartItem()
	return (
		<div
			className={cn(
				className,
				'flex w-full relative h-max transition-all duration-200',
				isRemoving && 'opacity-50 pointer-events-none'
			)}
		>
			<div className='flex gap-4 w-full items-start'>
				<div className='bg-muted rounded-xl w-[110px] h-[110px] flex items-center justify-center'>
					<Image
						src={'/krossi.png'}
						alt={cartItem.product.name}
						width={90}
						height={90}
						quality={100}
					/>
				</div>
				<div className='flex flex-col gap-4 h-full flex-1 justify-between'>
					<div className='flex items-start w-full justify-between gap-3'>
						<div className='flex  flex-col gap-0'>
							<Link
								href={`/${cartItem?.product?.category?.slug}/${cartItem.product.slug}`}
							>
								{' '}
								<Title
									size='xs'
									className='font-semibold tracking-[0.014em] !text-sm'
								>
									{cartItem.product.name}
								</Title>
							</Link>
							<div className='flex text-muted-foreground font-semibold text-sm  tracking-[0.014em] gap-0.5'>
								<span className=''>Size:</span>
								<span>{cartItem.size.eur_size}</span>
							</div>
						</div>
						<p className='font-semibold text-sm'>
							${cartItem.product.price * cartItem.quantity}
						</p>
					</div>

					<div className='flex items-center justify-between w-full'>
						<CartItemCounter
							cartItemId={cartItem.id}
							quantity={cartItem.quantity}
						/>
						<button
							onClick={() => mutateAsync(cartItem.id)}
							className='cursor-pointer'
						>
							<HugeiconsIcon strokeWidth={2} size={18} icon={Trash} />
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
