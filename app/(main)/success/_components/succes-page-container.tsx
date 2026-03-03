'use client'

import { Container } from '@/components/shared/container'
import { SomethingWentWrong } from '@/components/shared/something-went-wrong'
import { ANIMATED_EMOJIS } from '@/constants/animated-emojis-constant'

interface Props {
	className?: string
}

export const SuccesPageContainer = ({ className }: Props) => {
	return (
		<Container className='max-w-3xl'>
			<SomethingWentWrong
				lottieEmoji={ANIMATED_EMOJIS.money}
				title='Your payment was successfully processed!'
				subtext='Thank you for your purchase'
				btnText='Continue shopping'
				link='/'
			/>
		</Container>
	)
}
