import { Title } from '@/components/ui/title'
import monokleEmoji from '@/public/emojis/monokle.json'
import Lottie from 'lottie-react'

export const EmptyCartState = () => (
	<div className='flex flex-col h-full justify-center items-center'>
		<Lottie
			className='size-[120px]'
			animationData={monokleEmoji}
			loop
			autoplay
		/>
		<Title size='sm2' className='font-bold text-center uppercase mb-1'>
			YOUR SHOPPING BAG IS EMPTY
		</Title>
	</div>
)
