import clsx from 'clsx'
import { createElement, FC, PropsWithChildren } from 'react'

type TitleSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

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
		sm: 'h4',
		md: 'h3',
		lg: 'h2',
		xl: 'h1',
		'2xl': 'h1',
	} as const

	const mapClassNameBySize = {
		xs: 'text-[16px]',
		sm: 'text-[20px]',
		md: 'text-[26px]',
		lg: 'text-[32px]',
		xl: 'text-[40px]',
		'2xl': 'text-[48px]',
	} as const

	return createElement(
		mapTagBySize[size],
		{
			className: clsx(
				mapClassNameBySize[size],
				className,
				'flex items-center gap-2'
			),
		},
		children
	)
}
