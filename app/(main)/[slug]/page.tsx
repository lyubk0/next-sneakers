import { DetailsSection } from '@/app/(main)/[slug]/_components/details-section'
import { ImageSection } from '@/app/(main)/[slug]/_components/image-section'
import { Container } from '@/components/shared/container'
import { ApiServer } from '@/services/api-server'

interface Props {
	params: {
		slug: string
	}
}

export default async function Sneaker({ params }: Props) {
	const { slug } = await params

	const product = await ApiServer.product.getProductBySlug({
		productSlug: slug,
	})

	console.log(product)

	if (!product) return null

	return (
		<Container className='max-w-[1280px]'>
			<div className='flex gap-10'>
				<ImageSection product={product} />
				<DetailsSection product={product} />
			</div>
			{/* <RecommendationsSection className='mt-8' products={products} /> */}
		</Container>
	)
}
