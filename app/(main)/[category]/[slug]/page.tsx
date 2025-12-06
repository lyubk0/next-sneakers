import { DetailsSection } from '@/components/pages/product-page/details-section'
import { ImageSection } from '@/components/pages/product-page/image-section'
import { Container } from '@/components/shared/container'
import { ApiServer } from '@/services/api-server'

interface Props {
	params: {
		category: string
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
		<Container>
			<div className='flex gap-10'>
				<ImageSection product={product} />
				<DetailsSection product={product} />
			</div>
			{/* <RecommendationsSection className='mt-8' products={products} /> */}
		</Container>
	)
}
