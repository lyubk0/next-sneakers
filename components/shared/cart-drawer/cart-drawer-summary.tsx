import { Cart } from '@/@types/cart.types'
import { Calligraph } from 'calligraph'
import { Button } from '../../ui/button'

interface Props {
	cart?: Cart
	isLoading?: boolean
	onCheckout: () => void
}

export const CartDrawerSummary = ({ cart, isLoading, onCheckout }: Props) => (
	<div className='-mx-7 p-5 bg-white'>
		<div className='flex gap-6 flex-col'>
			<div className='flex flex-col gap-2'>
				<div className='flex justify-between text-sm items-center'>
					<p className='flex items-center font-medium gap-1'>Total</p>
					<p className='font-semibold'>
						<Calligraph variant='number'>{`${cart?.totalPrice} USD`}</Calligraph>
					</p>
				</div>
				<div className='flex justify-between text-sm items-center'>
					<p className='flex items-center font-medium gap-1'>Shipping</p>
					<p className='font-semibold'>Calculated at checkout</p>
				</div>
			</div>

			<Button
				onClick={onCheckout}
				isLoading={isLoading}
				disabled={cart?.items.length === 0}
				className='w-full uppercase'
				size={'xl'}
			>
				Go to Checkout
			</Button>
		</div>
	</div>
)
