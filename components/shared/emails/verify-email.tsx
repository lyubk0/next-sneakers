import {
	Body,
	Button,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Preview,
	Section,
	Tailwind,
	Text,
} from '@react-email/components'

interface Props {
	magicLink?: string
}

const tailwindConfig = {
	theme: {
		extend: {},
	},
}

const baseUrl = `${process.env.NEXT_PUBLIC_URL}`

export const VerifyEmail = ({ magicLink }: Props) => (
	<Html>
		<Head />

		<Tailwind config={tailwindConfig}>
			<Body className='bg-white font-sans'>
				<Preview>Sign in to Next Sneakers using your magic link.</Preview>

				<Container className='mx-auto my-0 max-w-[480px] border border-black px-8 py-10'>
					{/* Heading */}
					<Heading className='text-[26px] font-bold text-black mt-4 mb-6'>
						Your magic link
					</Heading>

					{/* Message */}
					<Section className='mb-6'>
						<Text className='text-[14px] leading-6 text-black mb-4'>
							Click the button below to securely sign in to your Next Sneakers
							account.
						</Text>

						{/* Button */}
						<Button
							href={magicLink}
							className='bg-black text-white text-sm font-medium px-6 py-3 border border-black'
						>
							Sign in to Next Sneakers
						</Button>

						<Text className='text-[13px] leading-6 text-black mt-6'>
							If you didn’t request this email, you can safely ignore it.
						</Text>
					</Section>

					{/* Footer */}
					<Hr className='border-black my-8' />

					<Text className='text-xs text-black leading-5'>Next Sneakers</Text>

					<Text className='text-xs text-black leading-5'>
						Premium sneakers marketplace
					</Text>
				</Container>
			</Body>
		</Tailwind>
	</Html>
)
