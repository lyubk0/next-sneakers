import { easeOut } from 'motion/react'

export const cardVariants = {
	hidden: { opacity: 0, scale: 0.92 },
	visible: { opacity: 1, scale: 1 },
	exit: { opacity: 0, scale: 0.92 },
}

export const transition = {
	duration: 0.15,
	ease: easeOut,
}

export const getCardTransition = (i: number) => ({
	...transition,
	delay: (i % 8) * 0.04,
})
