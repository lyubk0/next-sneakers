import { cn } from '@/lib/utils'
import type { Icon } from '@phosphor-icons/react'
import Image from 'next/image'
import type * as React from 'react'

export interface InputProps extends React.ComponentProps<'input'> {
	containerClassName?: string
	leftIcon?: Icon
	rightIcon?: Icon
	leftImage?: string
	rightImage?: string
	leftText?: string
	rightText?: string
}

function Input({
	className,
	containerClassName,
	type,
	leftIcon: LeftIcon,
	rightIcon: RightIcon,
	leftImage,
	rightImage,
	leftText,
	rightText,
	...props
}: InputProps) {
	const haveLeftElement = LeftIcon || leftImage || leftText
	const haveRightElement = RightIcon || rightImage || rightText

	return (
		<div className={cn('relative', containerClassName)}>
			{/* Left element */}
			{(LeftIcon || leftImage || leftText) && (
				<div className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 flex  text-card-muted-foreground gap-2'>
					{LeftIcon ? (
						<LeftIcon size={20} weight='duotone' />
					) : leftImage ? (
						<Image src={leftImage} width={20} height={20} alt='left icon' />
					) : null}

					{leftText && (
						<span className='text-foreground font-medium pt-0.5'>
							{leftText}
						</span>
					)}
				</div>
			)}

			{/* Input */}
			<input
				type={type}
				data-slot='input'
				autoComplete='off'
				className={cn(
					'file:text-foreground placeholder:text-muted-foreground selection:bg-primary font-medium selection:text-primary-foreground dark:bg-input/30 h-11 w-full min-w-0 rounded-xl bg-input px-3 py-1 text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
					'focus-visible:border-ring focus-visible:ring-primary/95 focus-visible:ring-[2px]',
					'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
					haveLeftElement && 'pl-11',
					haveRightElement && 'pr-11',
					className
				)}
				{...props}
			/>

			{/* Right element */}
			{(RightIcon || rightImage || rightText) && (
				<div className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-muted-foreground gap-1'>
					{rightText && <span className='text-foreground'>{rightText}</span>}
					{RightIcon ? (
						<RightIcon size={20} weight='duotone' />
					) : rightImage ? (
						<Image
							src={rightImage}
							width={20}
							height={20}
							className='ml-1'
							alt='right icon'
						/>
					) : null}
				</div>
			)}
		</div>
	)
}

export { Input }
