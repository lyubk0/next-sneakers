import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Session, signOut } from '@/lib/auth-client'
import { LogoutSquare01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

interface Props {
	session: Session
	className?: string
}

export const UserDropdown = ({ session, className }: Props) => {
	return (
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
	)
}
