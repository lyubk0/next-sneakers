import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'
import { Session, signOut } from '@/lib/auth-client'
import { LogoutSquare01Icon, UserCircleIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import Link from 'next/link'
import { NavButton } from './nav-button'

interface Props {
	session?: Session | null
	isLoading: boolean
	className?: string
}

export const UserButton = ({ session, isLoading, className }: Props) => {
	return (
		<div className={className}>
			{isLoading && <Skeleton className='rounded-full size-[20px]' />}
			{!session?.user && !isLoading && (
				<Link href='/sign-in'>
					<NavButton Icon={UserCircleIcon} />
				</Link>
			)}
			{session?.user && (
				<DropdownMenu>
					<DropdownMenuTrigger className='flex cursor-pointer group items-center gap-2'>
						<Avatar>
							<AvatarImage
								src={session?.user.image as string}
								alt={session?.user.name}
							/>
							<AvatarFallback className='group-hover:bg-primary/10 group-hover:text-primary'>
								{session?.user.name[0]}
							</AvatarFallback>
						</Avatar>
						<p className='text-sm hidden sm:block  font-medium'>
							{session?.user.name}
						</p>
					</DropdownMenuTrigger>
					<DropdownMenuContent className='w-[180px]'>
						<DropdownMenuItem onClick={() => signOut()}>
							<HugeiconsIcon strokeWidth={2} icon={LogoutSquare01Icon} />
							Exit
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)}
		</div>
	)
}
