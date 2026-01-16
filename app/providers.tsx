'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { PropsWithChildren } from 'react'
import { Toaster } from 'react-hot-toast'

interface Props {
	className?: string
}

export const Providers = ({ children }: PropsWithChildren<Props>) => {
	const queryClient = new QueryClient()
	return (
		<QueryClientProvider client={queryClient}>
			<Toaster
				position='bottom-center'
				reverseOrder={false}
				toastOptions={{
					style: {
						borderRadius: '99px',
						border: 'none',
						background: 'rgba(255, 255, 255, 0.72)',
						backgroundColor: '#f2f2f2',
						boxShadow: 'none',
						fontWeight: '500',
					},
				}}
			/>
			<NuqsAdapter>{children}</NuqsAdapter>
		</QueryClientProvider>
	)
}
