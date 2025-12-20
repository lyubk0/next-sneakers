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
import { SignOutIcon } from '@phosphor-icons/react'
import { IconHeart, IconUser, IconZoom } from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'
import { CartButton } from './cart-button'
import { NavButton } from './nav-button'
interface Props {
	className?: string
}

export const HeaderContent = ({ className }: Props) => {
	const { data: session, isPending } = useSession()

	return (
		<div className={cn(className, 'py-8 flex items-center justify-between')}>
			<Link href={'/'}>
				<Image src={'/logo.svg'} height={150} width={150} alt='Logo' />
			</Link>
			<div className='flex  gap-5 items-center'>
				<CartButton />

				<NavButton Icon={IconZoom} />
				<Link href='/favorites'>
					<NavButton Icon={IconHeart} />
				</Link>
				{!session?.user && (
					<Link href='/sign-in'>
						<NavButton Icon={IconUser} />
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
