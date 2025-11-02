'use client'

import { cn } from '@/lib/utils'
import clsx from 'clsx'
import Link from 'next/link'
import { PropsWithChildren } from 'react'

interface Props {
	href?: string
	children: string
	colorClass?: string
	className?: string
}

export const Underline = ({
	href,
	children,
	colorClass = 'text-primary',
	className,
}: PropsWithChildren<Props>) => {
	const lineCount = Math.max(3, Math.floor(children.length / 1.5))

	const content = (
		<span className='relative inline-block  group'>
			<span className={cn('text-primary cursor-pointer', colorClass)}>
				{children}
			</span>
			<div
				className={clsx(
					'absolute left-0 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 duration-150 ease-out right-0 top-[80%] mt-1 flex gap-1 justify-center',
					className
				)}
			>
				{Array.from({ length: lineCount }).map((_, i) => (
					<div
						key={i}
						className={clsx(
							'w-3 h-[2px] rounded-xl bg-primary transition-all duration-300'
						)}
					/>
				))}
			</div>
		</span>
	)

	if (href) {
		return <Link href={href}>{content}</Link>
	}

	return content
}
