'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { ErrorText } from '@/components/ui/error-text'
import { useSignIn } from '@/hooks/tanstack/auth.mutations'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { LockPasswordIcon, Mail01Icon } from '@hugeicons/core-free-icons'
import { useEffect } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
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

	const rootError = form.formState.errors.root?.message

	const onSubmit = async (data: SignInFormData) => {
		try {
			await signInMutation.mutateAsync(data)
		} catch (error) {
			const status = (error as any)?.status
			if (status === 401 || status === 400) {
				form.setError('root', { message: 'Invalid email or password' })
			} else {
				toast.error('Something went wrong. Please try again later.')
			}
		}
	}

	useEffect(() => {
		const subscription = form.watch(() => form.clearErrors('root'))
		return () => subscription.unsubscribe()
	}, [])

	return (
		<FormProvider {...form}>
			<form
				className={cn('w-full', className)}
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className='w-full space-y-3 '>
					<FormInput
						name='email'
						label='Email'
						required
						leftIcon={Mail01Icon}
						placeholder='Email'
					/>
					<FormInput
						type='password'
						name='password'
						label='Password'
						required
						leftIcon={LockPasswordIcon}
						placeholder='Password'
					/>

					{rootError && <ErrorText>{rootError}</ErrorText>}
					<Controller
						name='rememberMe'
						control={control}
						render={({ field }) => (
							<label
								htmlFor='rememberMe'
								className='flex items-center font-medium text-sm text-start w-full gap-2 mt-3 cursor-pointer select-none'
							>
								<Checkbox
									id='rememberMe'
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
								Remember me
							</label>
						)}
					/>
				</div>

				<Button
					isLoading={signInMutation.isPending}
					type='submit'
					size={'xl'}
					className='w-full mt-5'
				>
					Log In
				</Button>
			</form>
		</FormProvider>
	)
}
