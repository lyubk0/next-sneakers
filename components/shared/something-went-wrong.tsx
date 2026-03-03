'use client'

import { cn } from '@/lib/utils'
import type { LottieOptions } from 'lottie-react'
import Lottie from 'lottie-react'
import Link from 'next/link'
import { Button } from '../ui/button'
import { Title } from '../ui/title'

interface Props {
	title: string
	subtext: string
	lottieEmoji: LottieOptions['animationData']
	btnText?: string
	link?: string
	onClick?: () => void
	className?: string
}

export const SomethingWentWrong = ({
	title,
	subtext,
	lottieEmoji,
	btnText = 'Try again',
	link,
	onClick,
	className,
}: Props) => {
	return (
		<div
			className={cn(
				className,
				'flex flex-col items-center gap-4 md:px-0 px-4 md:text-left text-center',
			)}
		>
			<Lottie
				className='md:size-[230px] size-[150px]'
				animationData={lottieEmoji}
				loop
				autoplay
			/>
			<Title size='2xl' className='font-bold [line-height:1.2] !text-[36px] '>
				{title}
			</Title>
			<p className='md:text-[18px] text-base text-[#707070]'>{subtext}</p>
			{onClick && (
				<Button size={'xl'} className='md:w-auto w-full' onClick={onClick}>
					{btnText}
				</Button>
			)}
			{link && (
				<Link href={link} className='md:w-auto w-full'>
					<Button size={'xl'} className='md:w-auto w-full' onClick={onClick}>
						{btnText}
					</Button>
				</Link>
			)}
		</div>
	)
}
