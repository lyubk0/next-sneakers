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
					style: { borderRadius: '18px', border: '1px solid oklch(0.94 0 0)' },
				}}
			/>
			<NuqsAdapter>{children}</NuqsAdapter>
		</QueryClientProvider>
	)
}
