import { AuthBlock } from '@/components/shared/auth/auth-block'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Next Sneakers | Sign Up',
}

export default function SignUpPage() {
	return <AuthBlock className='w-[500px]' />
}
