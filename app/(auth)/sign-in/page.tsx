import { AuthBlock } from '@/components/shared/auth/auth-block'

export default function SignIn() {
	return (
		<div className='w-full h-full flex justify-center items-center'>
			<AuthBlock isSignIn />
		</div>
	)
}
