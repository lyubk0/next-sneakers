'use client'

import { TooltipProvider } from '@/components/ui/tooltip'
import {
	QueryClient,
	QueryClientProvider,
	isServer,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { PropsWithChildren } from 'react'
import { Toaster } from 'react-hot-toast'

interface Props {
	className?: string
}

function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 1000 * 60 * 5,
			},
		},
	})
}

let browserQueryClient: QueryClient | undefined

function getQueryClient() {
	if (isServer) {
		return makeQueryClient()
	}

	if (!browserQueryClient) {
		browserQueryClient = makeQueryClient()
	}

	return browserQueryClient
}

export const Providers = ({ children }: PropsWithChildren<Props>) => {
	const queryClient = getQueryClient()

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
