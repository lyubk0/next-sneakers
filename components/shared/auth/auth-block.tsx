'use client'

import { Title } from '@/components/shared/title'
import { Button } from '@/components/ui/button'
import { Underline } from '@/components/ui/underline'
import { authClient } from '@/lib/auth-client'
import Image from 'next/image'
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
		<div className='bg-card min-h-[480px] p-8 flex flex-col items-center w-[420px] shadow-md rounded-2xl'>
			<Title size='md' className='font-semibold'>
				{isSignIn ? 'Вхід' : 'Реєстрація'}
			</Title>

			{isSignIn ? <SignInForm /> : <SignUpForm />}

			<div className='flex items-center mt-5 justify-between w-full'>
				<div className='w-[23%] bg-muted h-[2px]'></div>
				<p className='text-muted-foreground text-sm'>або продовжте з</p>
				<div className='w-[23%] bg-muted h-[2px]'></div>
			</div>

			<div className='flex w-full gap-2 mt-5'>
				<Button size={'lg'} className='flex-1' variant={'flat'}>
					<Image src={'/google.svg'} height={20} width={20} alt='Google' />
					Google
				</Button>
				<Button size={'lg'} className='flex-1' variant={'flat'}>
					<Image src={'/github.svg'} height={20} width={20} alt='GitHub' />
					GitHub
				</Button>
			</div>
			<p className='mt-5 text-[15px]'>
				{isSignIn ? 'Ще не зареєстровані?' : 'Вже зареєстровані?'}{' '}
				<Underline
					href={isSignIn ? '/sign-up' : '/sign-in'}
					colorClass='text-primary'
					className='text-base'
				>
					{isSignIn ? 'Реєстрація' : 'Увійти'}
				</Underline>
			</p>
		</div>
	)
}
