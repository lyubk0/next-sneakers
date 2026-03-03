'use client'

import { useSession } from '@/lib/auth-client'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { CartButton } from './nav-buttons/cart-button'
import { SearchButton } from './nav-buttons/search-button'
import { UserButton } from './nav-buttons/user-button'

interface Props {
	className?: string
}

export const HeaderContent = ({ className }: Props) => {
	const { data: session, isPending } = useSession()
	console.log(isPending)
	return (
		<div
			className={cn(className, 'h-[100px] flex items-center justify-between')}
		>
			<Link href={'/'}>
				<Image src={'/logo.svg'} height={150} width={150} alt='Logo' />
			</Link>
			<div className='flex gap-5 items-center'>
				<CartButton />
				<SearchButton />
				<UserButton isLoading={isPending} session={session} />
			</div>
		</div>
	)
}
