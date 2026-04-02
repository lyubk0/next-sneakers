'use client' // Error boundaries must be Client Components

import { SomethingWentWrong } from '@/components/shared/something-went-wrong'
import { ANIMATED_EMOJIS } from '@/constants/animated-emojis.constants'
import { useEffect } from 'react'

export default function ErrorPage({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	useEffect(() => {
		console.error('Error in segment:', error)
	}, [error])

	return (
		<div className='flex items-center justify-center h-screen'>
			<SomethingWentWrong
				title='Something went wrong!'
				subtext='An unexpected error has occurred. Please try again.'
				lottieEmoji={ANIMATED_EMOJIS.exclamationQuestionMark}
				onClick={() => reset()}
			/>
		</div>
	)
}
