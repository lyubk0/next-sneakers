import { AuthBlock } from '@/components/shared/auth/auth-block'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Next Sneakers | Sign In',
}

export default function SignInPage() {
	return <AuthBlock isSignIn className='w-[500px]' />
}
