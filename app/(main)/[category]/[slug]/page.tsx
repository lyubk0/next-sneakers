import { Container } from '@/components/shared/container'
import { DetailsSection } from '@/components/shared/pages/product-page/details-section'
import { ImageSection } from '@/components/shared/pages/product-page/image-section'
import { WhiteBlock } from '@/components/shared/white-block'
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
			<WhiteBlock className='flex gap-8'>
				<ImageSection product={product} />
				<DetailsSection product={product} />
			</WhiteBlock>
			{/* <RecommendationsSection className='mt-8' products={products} /> */}
		</Container>
	)
}
