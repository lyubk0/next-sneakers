'use client'

import { Button } from '@/components/ui/button'
import { useSignUp } from '@/hooks/queries/auth/use-sign-up'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { EnvelopeIcon, LockKeyIcon, SignInIcon } from '@phosphor-icons/react'
import { FormProvider, useForm } from 'react-hook-form'
import { FormInput } from '../../form-components/form-input'
import { SignUpFormData, signUpSchema } from '../schemas/sign-up-form-schema'
interface Props {
	className?: string
}

export const SignUpForm = ({ className }: Props) => {
	const form = useForm<SignUpFormData>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			fullName: '',
			email: '',
			password: '',
		},
	})
	const { handleSubmit } = form

	const signUpMutation = useSignUp()

	const onSubmit = async (data: SignUpFormData) => {
		await signUpMutation.mutateAsync(data)
	}

	return (
		<FormProvider {...form}>
			<form
				className={cn('w-full', className)}
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className='w-full space-y-3 mt-10'>
					<FormInput
						name='fullName'
						leftIcon={SignInIcon}
						placeholder="Повне ім'я"
					/>
					<FormInput
						name='email'
						leftIcon={EnvelopeIcon}
						placeholder='Електронна пошта'
					/>
					<FormInput
						name='password'
						leftIcon={LockKeyIcon}
						placeholder='Пароль'
					/>
				</div>
				<Button
					loading={signUpMutation.isPending}
					type='submit'
					className='w-full group mt-5'
				>
					<SignInIcon
						weight='bold'
						className='group-hover:-translate-x-1 duration-150 ease-out'
					/>
					Зареєструватися
				</Button>
			</form>
		</FormProvider>
	)
}
