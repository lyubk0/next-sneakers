import { MoreHorizontalIcon } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowLeft01Icon, ArrowRight01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import Link from 'next/link'

function Pagination({ className, ...props }: React.ComponentProps<'nav'>) {
	return (
		<nav
			role='navigation'
			aria-label='pagination'
			data-slot='pagination'
			className={cn('mx-auto flex w-full  justify-center', className)}
			{...props}
		/>
	)
}

function PaginationContent({
	className,
	...props
}: React.ComponentProps<'ul'>) {
	return (
		<ul
			data-slot='pagination-content'
			className={cn('flex items-center gap-0.5', className)}
			{...props}
		/>
	)
}

function PaginationItem({ ...props }: React.ComponentProps<'li'>) {
	return <li data-slot='pagination-item' {...props} />
}

type PaginationLinkProps = {
	isActive?: boolean
	size?: React.ComponentProps<typeof Button>['size']
} & React.ComponentProps<typeof Link>

function PaginationLink({
	className,
	isActive,
	size = 'icon',
	href,
	...props
}: PaginationLinkProps) {
	return (
		<Button
			asChild
			variant={isActive ? 'default' : 'ghost'}
			size={size}
			className={cn(className)}
		>
			<Link
				href={href}
				aria-current={isActive ? 'page' : undefined}
				data-slot='pagination-link'
				data-active={isActive}
				className={className}
				{...props}
			/>
		</Button>
	)
}
function PaginationPrevious({
	className,
	text = 'Previous',
	...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
	return (
		<PaginationLink
			aria-label='Go to previous page'
			size='icon'
			className={cn('', className)}
			{...props}
		>
			<HugeiconsIcon
				icon={ArrowLeft01Icon}
				strokeWidth={2}
				data-icon='inline-start'
				className='cn-rtl-flip'
			/>
		</PaginationLink>
	)
}

function PaginationNext({
	className,
	text = 'Next',
	...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
	return (
		<PaginationLink
			aria-label='Go to next page'
			size='icon'
			className={cn('', className)}
			{...props}
		>
			<HugeiconsIcon
				icon={ArrowRight01Icon}
				strokeWidth={2}
				data-icon='inline-end'
				className='cn-rtl-flip'
			/>
		</PaginationLink>
	)
}

function PaginationEllipsis({
	className,
	...props
}: React.ComponentProps<'span'>) {
	return (
		<span
			aria-hidden
			data-slot='pagination-ellipsis'
			className={cn(
				"flex size-8 items-center justify-center [&_svg:not([class*='size-'])]:size-4",
				className,
			)}
			{...props}
		>
			<MoreHorizontalIcon />
			<span className='sr-only'>More pages</span>
		</span>
	)
}

export {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
}
