import clsx from 'clsx'
import { createElement, FC, PropsWithChildren } from 'react'

type TitleSize = 'xs' | 'xs2' | 'sm' | 'sm2' | 'md' | 'lg' | 'xl' | '2xl'

interface Props {
	size?: TitleSize
	className?: string
}

export const Title: FC<PropsWithChildren<Props>> = ({
	children,
	size = 'sm',
	className,
}) => {
	const mapTagBySize = {
		xs: 'h5',
		xs2: 'h5',
		sm: 'h4',
		sm2: 'h4',
		md: 'h3',
		lg: 'h2',
		xl: 'h1',
		'2xl': 'h1',
	} as const

	const mapClassNameBySize = {
		xs: 'text-[16px]',
		xs2: 'text-[18px]',
		sm: 'text-[20px]',
		sm2: 'text-[24px]',
		md: 'text-[26px]',
		lg: 'text-[32px]',
		xl: 'text-[40px] font-bold',
		'2xl': 'text-[48px] font-bold [line-height:1.2]',
	} as const

	return createElement(
		mapTagBySize[size],
		{
			className: clsx(
				mapClassNameBySize[size],
				className,
				'flex items-center gap-2',
			),
		},
		children,
	)
}
