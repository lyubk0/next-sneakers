'use client'

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination'

import { useMemo } from 'react'

interface Props {
	page: number
	totalPages: number
	onPageChange: (page: number) => void
	className?: string
}

export const PaginationControl = ({
	page,
	totalPages,
	onPageChange,
	className,
}: Props) => {
	const currentPage = Math.min(Math.max(page, 1), Math.max(totalPages, 1))

	const handlePageChange = (p: number) => {
		const safePage = Math.min(Math.max(p, 1), totalPages)

		if (safePage === currentPage) return

		onPageChange(safePage)
	}

	const pages = useMemo<(number | '...')[]>(() => {
		if (totalPages <= 7) {
			return Array.from({ length: totalPages }, (_, i) => i + 1)
		}

		if (currentPage <= 4) {
			return [1, 2, 3, 4, 5, '...', totalPages]
		}

		if (currentPage >= totalPages - 3) {
			return [
				1,
				'...',
				totalPages - 4,
				totalPages - 3,
				totalPages - 2,
				totalPages - 1,
				totalPages,
			]
		}

		return [
			1,
			'...',
			currentPage - 1,
			currentPage,
			currentPage + 1,
			'...',
			totalPages,
		]
	}, [currentPage, totalPages])

	return (
		<Pagination className={className}>
			<PaginationContent className='gap-1'>
				{/* Previous */}

				<PaginationItem>
					<PaginationPrevious
						href='#'
						onClick={e => {
							e.preventDefault()
							handlePageChange(currentPage - 1)
						}}
						aria-disabled={currentPage === 1}
						className={
							currentPage === 1 ? 'pointer-events-none opacity-40' : ''
						}
					/>
				</PaginationItem>

				{/* Pages */}

				{pages.map((p, index) =>
					p === '...' ? (
						<PaginationItem key={`ellipsis-${index}`}>
							<PaginationEllipsis />
						</PaginationItem>
					) : (
						<PaginationItem key={p}>
							<PaginationLink
								href='#'
								isActive={currentPage === p}
								onClick={e => {
									e.preventDefault()
									handlePageChange(p)
								}}
							>
								{p}
							</PaginationLink>
						</PaginationItem>
					),
				)}

				{/* Next */}

				<PaginationItem>
					<PaginationNext
						href='#'
						onClick={e => {
							e.preventDefault()
							handlePageChange(currentPage + 1)
						}}
						aria-disabled={currentPage === totalPages}
						className={
							currentPage === totalPages ? 'pointer-events-none opacity-40' : ''
						}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	)
}
