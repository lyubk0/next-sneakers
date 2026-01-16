import { Cart } from '@/@types/cart'
import { ButtonWithArrow } from '@/components/shared/button-with-arrow'
import { WhiteBlock } from '@/components/shared/white-block'

interface Props {
	cart: Cart | undefined
	className?: string
}

export const CheckoutSummary = ({ className, cart }: Props) => {
	return (
		<div className='relative w-[600px] h-max '>
			<WhiteBlock className='!p-6 h-max !rounded-b-none '>
				<div className='flex flex-col'>
					<span className='text-lg font-medium'>Всього:</span>
					<span className='text-[32px] font-bold'>{cart?.totalPrice} грн</span>
				</div>
				<ButtonWithArrow rightArrow className='w-full mt-2 mb-7'>
					Перейти до оплати
				</ButtonWithArrow>
			</WhiteBlock>
			<div
				className='w-full h-4  bg-[length:1rem] bg-repeat-x bg-left-bottom'
				style={{
					backgroundImage:
						'linear-gradient(135deg, #fff 0.5rem, transparent 0), linear-gradient(-135deg, #fff 0.5rem, transparent 0)',
				}}
			/>
		</div>
	)
}
