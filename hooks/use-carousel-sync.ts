import { CarouselApi } from '@/components/ui/carousel'
import { useEffect, useState } from 'react'

export const useCarouselSync = () => {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [api, setApi] = useState<CarouselApi | undefined>(undefined)

	useEffect(() => {
		const interval = setInterval(() => {
			if (api) setCurrentIndex(api.selectedScrollSnap)
		}, 50)
		return () => clearInterval(interval)
	}, [api])

	const scrollTo = (index: number) => {
		setCurrentIndex(index)
		api?.scrollTo(index)
	}

	return { currentIndex, setCurrentIndex, api, setApi, scrollTo }
}
