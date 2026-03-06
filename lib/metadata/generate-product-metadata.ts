import { ApiServer } from '@/services/api-server'
import { Metadata } from 'next'

export const generateProductMetadata = async (
	slug: string,
): Promise<Metadata> => {
	const product = await ApiServer.product.getProductBySlug({
		productSlug: slug,
	})

	if (!product) {
		return { title: 'Next Sneakers' }
	}

	return {
		title: `Next Sneakers | ${product.name}`,
		openGraph: {
			title: product.name,
			description: `$${product.price}`,
			images: [
				{
					url: product.images[0],
					width: 1200,
					height: 630,
					alt: product.name,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title: product.name,
			description: `$${product.price}`,
			images: [product.images[0]],
		},
	}
}
