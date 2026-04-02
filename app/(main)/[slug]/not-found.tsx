import { Container } from '@/components/shared/container'
import { SomethingWentWrong } from '@/components/shared/something-went-wrong'
import { ANIMATED_EMOJIS } from '@/constants/animated-emojis.constants'

export default function NotFound() {
	return (
		<Container className='max-w-3xl'>
			<SomethingWentWrong
				title='Oops… This product isn’t here'
				subtext='Try searching for something else or head back to the catalog.'
				lottieEmoji={ANIMATED_EMOJIS.magnificationGlass}
				btnText='Go back to catalog'
				link='/'
			/>
		</Container>
	)
}
