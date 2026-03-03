import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Next Sneakers | Cancel',
}

export default function CancelPage() {
	return (
		<div className='flex flex-col items-center justify-center h-screen'>
			<h1 className='text-4xl font-bold mb-4'>Payment Cancelled</h1>
			<p className='text-lg'>
				Your payment was not completed. Please try again.
			</p>
		</div>
	)
}
