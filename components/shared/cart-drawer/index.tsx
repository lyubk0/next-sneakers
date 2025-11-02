'use client'

import { Cart } from '@/@types/cart'
import { CartDrawerItem } from '@/components/shared/cart-drawer/cart-drawer-item'
import { cn } from '@/lib/utils'
import { ArrowLeftIcon, PackageIcon, ReceiptIcon } from '@phosphor-icons/react'
import Image from 'next/image'
import { PropsWithChildren, useState } from 'react'
import { Button } from '../../ui/button'
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '../../ui/drawer'
import { Title } from '../title'

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
	console.log(cart)
	return (
		<Drawer open={open} onOpenChange={setOpen} direction='right'>
			<DrawerTrigger>{children}</DrawerTrigger>
			<DrawerContent className={cn(className, '!max-w-lg')}>
				<DrawerHeader>
					<DrawerTitle className='text-2xl font-bold'>Корзина</DrawerTitle>
				</DrawerHeader>
				{cart && cart?.items.length === 0 && (
					<div className='flex flex-col space-y-3 h-full justify-center items-center'>
						<Image
							height={120}
							width={120}
							src={'/empty-cart.jpg'}
							alt='empty cart'
							quality={100}
						/>
						<Title size='sm' className='font-semibold'>
							Корзина порожня
						</Title>
						<p className='text-muted-foreground text-center'>
							Додайте хоча б один товар, щоб зробити замовлення
						</p>
						<Button onClick={handleClose} className='group' size={'lg'}>
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
						<ul className='flex h-[685px] overflow-y-auto flex-col gap-7'>
							{cart?.items?.map(item => (
								<li key={item.id}>
									<CartDrawerItem cartItem={item} />
								</li>
							))}
						</ul>

						<div className='-mx-7 p-5 bg-white'>
							<div className='flex gap-8 flex-col'>
								<div className='flex flex-col gap-2'>
									<div className='flex text-muted-foreground justify-between items-center'>
										<p className='flex items-center gap-1'>
											<PackageIcon size={20} />
											Доставка
										</p>
										<p>80 грн</p>
									</div>
									<div className='flex font-bold justify-between items-center'>
										<p className='flex items-center gap-1'>
											{' '}
											<ReceiptIcon size={20} />
											Всього
										</p>
										<p>{cart?.totalPrice} грн</p>
									</div>
								</div>
								<Button size={'lg'}>Оформити замовлення</Button>
							</div>
						</div>
					</>
				)}
			</DrawerContent>
		</Drawer>
	)
}
