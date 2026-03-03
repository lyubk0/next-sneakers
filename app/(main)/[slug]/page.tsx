import { DetailsSection } from '@/app/(main)/[slug]/_components/details-section'
import { Container } from '@/components/shared/container'
import { db } from '@/db/drizzle'
import { ApiServer } from '@/services/api-server'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ImageSectionWrapper } from './_components/image-section/image-section-wrapper'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params
	const product = await ApiServer.product.getProductBySlug({
		productSlug: slug,
	})

	return {
		title: product ? `Next Sneakers | ${product.name}` : 'Next Sneakers',
	}
}

export const revalidate = false
export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
	const products = await db.query.product.findMany({
		columns: {
			slug: true,
		},
	})

	return products.map(product => ({ slug: product.slug }))
}

interface Props {
	params: Promise<{ slug: string }>
}

export default async function ProductPage({ params }: Props) {
	const { slug } = await params

	const product = await ApiServer.product.getProductBySlug({
		productSlug: slug,
	})

	console.log(product)

	if (!product) {
		notFound()
	}

	return (
		<Container className='max-w-[1280px] pb-4'>
			<div className='flex flex-col md:flex-row gap-10'>
				<ImageSectionWrapper product={product} />
				<DetailsSection product={product} />
			</div>
		</Container>
	)
}
