import { Skeleton } from '@/components/ui/skeleton'
import { Session } from '@/lib/auth-client'
import { UserCircleIcon } from '@hugeicons/core-free-icons'
import Link from 'next/link'
import { NavButton } from '../nav-button'
import { UserDropdown } from './user-dropdown'

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
			{session?.user && <UserDropdown session={session} />}
		</div>
	)
}
