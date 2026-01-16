'use client'

import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { SignInForm } from './forms/sign-in-form'
import { SignUpForm } from './forms/sign-up-form'

interface Props {
	isSignIn?: boolean
	className?: string
}

export const AuthBlock = ({ className, isSignIn }: Props) => {
	const {
		data: session,
		isPending, //loading state
		error, //error object
		refetch, //refetch the session
	} = authClient.useSession()

	console.log('session', session)
	return (
		<div className={cn('flex h-full flex-col  items-center', className)}>
			<div className='flex flex-col justify-center items-center h-full w-full'>
				<img src={'/logo.svg'} height={200} width={200} alt='Logo' />

				{isSignIn ? (
					<SignInForm className='mt-8' />
				) : (
					<SignUpForm className='mt-8' />
				)}

				<div className='flex items-center mt-8 justify-between w-full'>
					<div className='w-[23%] bg-muted h-[2px]'></div>
					<p className='text-muted-foreground text-sm'>або продовжте з</p>
					<div className='w-[23%] bg-muted h-[2px]'></div>
				</div>

				<div className='flex w-full gap-4 mt-4'>
					<Button variant='secondary' size={'xl'} className='flex-1'>
						<img src={'/google-logo.svg'} height={16} width={16} alt='Google' />
						Google
					</Button>
					<Button size={'xl'} className='flex-1' variant='secondary'>
						<img src={'/github-logo.svg'} height={16} width={16} alt='GitHub' />
						GitHub
					</Button>
				</div>
				<p className='mt-8 flex gap-1 items-center text-[15px]'>
					{isSignIn ? 'Ще не зареєстровані?' : 'Вже зареєстровані?'}
					<Link
						className='font-semibold'
						href={isSignIn ? '/sign-up' : '/sign-in'}
					>
						{isSignIn ? 'Реєстрація' : 'Вхід'}
					</Link>
				</p>
			</div>
		</div>
	)
}
