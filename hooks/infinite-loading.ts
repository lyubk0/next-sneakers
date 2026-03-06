import { useEffect, useRef } from 'react'

interface Options {
	hasNextPage?: boolean
	isFetchingNextPage?: boolean
	onLoadMore?: () => void
}

export const useInfiniteLoading = ({
	hasNextPage,
	isFetchingNextPage,
	onLoadMore,
}: Options) => {
	const sentinelRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
					onLoadMore?.()
				}
			},
			{ threshold: 0.1 },
		)
		if (sentinelRef.current) observer.observe(sentinelRef.current)
		return () => observer.disconnect()
	}, [hasNextPage, isFetchingNextPage, onLoadMore])

	return sentinelRef
}
