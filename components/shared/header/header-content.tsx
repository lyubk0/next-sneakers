'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { signOut, useSession } from '@/lib/auth-client'
import { cn } from '@/lib/utils'
import {
	HeartIcon,
	MagnifyingGlassIcon,
	SignOutIcon,
	UserCircleIcon,
} from '@phosphor-icons/react'
import Image from 'next/image'
import Link from 'next/link'
import { Title } from '../title'
import { CartButton } from './cart-button'
import { NavButton } from './nav-button'

interface Props {
	className?: string
}

export const HeaderContent = ({ className }: Props) => {
	const { data: session, isPending } = useSession()

	return (
		<div className={cn(className, 'py-8 flex items-center justify-between')}>
			<div className='flex items-center gap-4'>
				<Image src={'/logo.svg'} width={40} height={40} alt='Logo' />
				<div className='flex flex-col'>
					<Title className='font-bold !text-[1.17em] leading-tight'>
						NEXT SNEAKERS
					</Title>
					<p className='text-muted-foreground/70'>Магазин найкращих кросівок</p>
				</div>
			</div>
			<div className='flex  gap-5 items-center'>
				<CartButton />

				<NavButton Icon={MagnifyingGlassIcon} />
				<Link href='/favorites'>
					<NavButton Icon={HeartIcon} />
				</Link>
				{!session?.user && (
					<Link href='/sign-in'>
						<NavButton Icon={UserCircleIcon} />
					</Link>
				)}
				{!isPending && session?.user && (
					<div className='h-[25] w-[1px] bg-muted -mx-[11px]'></div>
				)}

				{session?.user && (
					<DropdownMenu>
						<DropdownMenuTrigger className='flex cursor-pointer group items-center gap-2'>
							<Avatar>
								<AvatarImage
									src={session?.user.image as string}
									alt={session?.user.name}
								/>
								<AvatarFallback className='text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'>
									{session?.user.name[0]}
								</AvatarFallback>
							</Avatar>

							<p className='text-muted-foreground group-hover:text-primary'>
								{session?.user.name}
							</p>
						</DropdownMenuTrigger>
						<DropdownMenuContent className='w-[180px]'>
							<DropdownMenuItem onClick={() => signOut()}>
								<SignOutIcon />
								Вихід
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				)}
			</div>
		</div>
	)
}
