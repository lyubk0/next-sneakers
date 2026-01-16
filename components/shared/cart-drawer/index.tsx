'use client'

import { Cart } from '@/@types/cart'
import { CartDrawerItem } from '@/components/shared/cart-drawer/cart-drawer-item'
import { cn } from '@/lib/utils'
import { ArrowLeftIcon } from '@phosphor-icons/react'
import Image from 'next/image'
import Link from 'next/link'
import { PropsWithChildren, useState } from 'react'
import { Button } from '../../ui/button'
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '../../ui/drawer'
import { Title } from '../../ui/title'

interface Props {
	cart?: Cart
	className?: string
}

export const CartDrawer = ({
	cart,
	className,
	children,
}: PropsWithChildren<Props>) => {
	const [open, setOpen] = useState(false)

	const handleClose = () => {
		setOpen(false)
	}

	return (
		<Drawer open={open} onOpenChange={setOpen} direction='right'>
			<DrawerTrigger>{children}</DrawerTrigger>
			<DrawerContent className={cn(className, '!w-[420px] !max-w-none')}>
				<DrawerHeader>
					<DrawerTitle className='text-xl font-bold uppercase'>bag</DrawerTitle>
				</DrawerHeader>
				{cart && cart?.items.length === 0 && (
					<div className='flex flex-col  h-full justify-center items-center'>
						<Image
							height={120}
							width={120}
							src={'/empty-cart.svg'}
							alt='empty cart'
							quality={100}
						/>
						<Title size='sm' className='font-semibold mb-1'>
							Корзина порожня
						</Title>
						<p className='text-card-muted-foreground text-center mb-6'>
							Додайте хоча б один товар, щоб зробити замовлення
						</p>
						<Button onClick={handleClose} className='group' size={'xl'}>
							<ArrowLeftIcon
								className='group-hover:-translate-x-1 duration-150 ease-out'
								weight='bold'
							/>
							Повернутись назад
						</Button>
					</div>
				)}

				{cart && cart.items?.length > 0 && (
					<>
						<ul className='flex h-[800px] overflow-y-auto flex-col gap-9'>
							{cart?.items?.map(item => (
								<li key={item.id}>
									<CartDrawerItem cartItem={item} />
								</li>
							))}
						</ul>

						<div className='-mx-7 p-5 bg-white'>
							<div className='flex gap-6 flex-col'>
								<div className='flex flex-col gap-2'>
									<div className='flex justify-between text-sm items-center'>
										<p className='flex items-center font-medium gap-1'>Total</p>
										<p className='font-semibold'>{cart?.totalPrice} USD</p>
									</div>
								</div>
								<Link className='w-full' href='/checkout'>
									{' '}
									<Button className='w-full uppercase' size={'xl'}>
										Go to Checkout
									</Button>
								</Link>
							</div>
						</div>
					</>
				)}
			</DrawerContent>
		</Drawer>
	)
}
