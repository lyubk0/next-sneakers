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
			<DrawerContent className={cn(className, '!max-w-md')}>
				<DrawerHeader>
					<DrawerTitle className='text-2xl font-bold'>Корзина</DrawerTitle>
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
						<ul className='flex h-[685px] overflow-y-auto flex-col gap-9'>
							{cart?.items?.map(item => (
								<li key={item.id}>
									<CartDrawerItem cartItem={item} />
									<div className='w-full h-[1px] bg-muted mt-6'></div>
								</li>
							))}
						</ul>

						<div className='-mx-7 p-5 bg-white'>
							<div className='flex gap-6 flex-col'>
								<div className='flex flex-col gap-2'>
									<div className='flex font-medium justify-between items-center'>
										<p className='flex items-center gap-1'> Всього:</p>
										<p>{cart?.totalPrice} грн</p>
									</div>
								</div>
								<Link className='w-full' href='/checkout'>
									{' '}
									<Button className='w-full' size={'xl'}>
										Оформити замовлення
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
