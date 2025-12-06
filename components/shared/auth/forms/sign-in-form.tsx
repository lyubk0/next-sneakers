'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Underline } from '@/components/ui/underline'
import { useSignIn } from '@/hooks/queries/auth/use-sign-in'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { EnvelopeIcon, LockKeyIcon, SignInIcon } from '@phosphor-icons/react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { FormInput } from '../../form-components/form-input'
import { SignInFormData, signInSchema } from './schemas/sign-in-form-schema'

interface Props {
	className?: string
}

export const SignInForm = ({ className }: Props) => {
	const form = useForm<SignInFormData>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: '',
			password: '',
			rememberMe: false,
		},
	})

	const { handleSubmit, control } = form

	const signInMutation = useSignIn()

	const onSubmit = async (data: SignInFormData) => {
		await signInMutation.mutateAsync(data)
	}

	return (
		<FormProvider {...form}>
			<form
				className={cn('w-full', className)}
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className='w-full space-y-3 mt-10'>
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

					<Controller
						name='rememberMe'
						control={control}
						render={({ field }) => (
							<label
								htmlFor='rememberMe'
								className='flex items-center text-start w-full gap-2 mt-3 cursor-pointer select-none'
							>
								<Checkbox
									id='rememberMe'
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
								<Underline
									colorClass='text-foreground'
									className='cursor-pointer text-sm'
								>
									Запам&apos;ятати мене
								</Underline>
							</label>
						)}
					/>
				</div>

				<Button
					loading={signInMutation.isPending}
					type='submit'
					size={'lg'}
					className='w-full group mt-5'
				>
					<SignInIcon
						weight='bold'
						className='group-hover:-translate-x-1 duration-150 ease-out'
					/>
					Увійти
				</Button>
			</form>
		</FormProvider>
	)
}
