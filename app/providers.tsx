'use client'

import { TooltipProvider } from '@/components/ui/tooltip'
import { productKeys } from '@/hooks/tanstack/product.queries'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { PropsWithChildren } from 'react'
import { Toaster } from 'react-hot-toast'

interface Props {
	className?: string
}

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5,
		},
	},
})

queryClient.setQueryDefaults(productKeys.lists(), {
	gcTime: 0,
})
export const Providers = ({ children }: PropsWithChildren<Props>) => {
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			<TooltipProvider>
				<Toaster
					position='bottom-center'
					reverseOrder={false}
					toastOptions={{
						style: {
							color: 'white',
							fontSize: '14px',
							borderRadius: '18px',
							border: 'none',
							background: 'rgb(26 26 26)',
							backgroundColor: 'rgb(26 26 26)',
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
