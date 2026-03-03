'use client'

import { TooltipProvider } from '@/components/ui/tooltip'
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
			<TooltipProvider>
				<Toaster
					position='bottom-center'
					reverseOrder={false}
					toastOptions={{
						style: {
							borderRadius: '99px',
							border: 'none',
							background: 'white',
							backgroundColor: 'white',
							boxShadow: `
        0 0 15px rgba(0, 0, 0, 0.031),
        0 2px 30px rgba(0, 0, 0, 0.078),
        0 0 1px rgba(0, 0, 0, 0.302)
      `,
							fontWeight: '500',
						},
					}}
				/>
				<NuqsAdapter>{children}</NuqsAdapter>
			</TooltipProvider>
		</QueryClientProvider>
	)
}
