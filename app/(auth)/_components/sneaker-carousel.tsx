'use client'

import { AnimatePresence, motion, useAnimation } from 'motion/react'
import { useEffect, useState } from 'react'

const sneakerImageUrls = [
	'/krossi.png',
	'/blue-krossi.png',
	'/green-krossi.png',
	'/red-krossi.png',
]
const SLIDE_DURATION = 5

const SneakerImage = ({ src }: { src: string }) => {
	const controls = useAnimation()

	useEffect(() => {
		const run = () => {
			controls.start({
				opacity: 1,
				scale: 1,
				x: 0,
				rotate: -16,
				y: 0,
				filter: 'blur(0px)',
				transition: { type: 'spring', stiffness: 120, damping: 18 },
			})
			controls.start({
				rotate: [-16, -13, -16],
				y: [0, -6, 0],
				transition: { duration: 2.5, ease: 'easeInOut', repeat: Infinity },
			})
		}

		run()

		return () => {
			controls.stop()
		}
	}, [controls])

	return (
		<motion.img
			src={src}
			className='absolute w-[80%] max-w-[420px] select-none pointer-events-none [transform-style:preserve-3d] [backface-visibility:hidden]'
			initial={{
				opacity: 0,
				scale: 0.7,
				rotate: -25,
				x: -120,
				y: 40,
				filter: 'blur(6px)',
			}}
			animate={controls}
			exit={{
				opacity: 0,
				scale: 0.85,
				rotate: 20,
				x: 120,
				y: -40,
				filter: 'blur(6px)',
				transition: { duration: 0.4, ease: 'easeInOut' },
			}}
		/>
	)
}

export function SneakerCarousel() {
	const [index, setIndex] = useState(0)

	useEffect(() => {
		const interval = setInterval(() => {
			setIndex(prev => (prev + 1) % sneakerImageUrls.length)
		}, SLIDE_DURATION * 1000)

		return () => clearInterval(interval)
	}, [])

	return (
		<div className='relative w-full h-full flex items-center justify-center overflow-hidden'>
			<AnimatePresence mode='wait'>
				<SneakerImage key={index} src={sneakerImageUrls[index]} />
			</AnimatePresence>
			<div className='absolute bottom-6 left-1/2 -translate-x-1/2 w-40 h-1 rounded-full bg-[#dfdfdf] overflow-hidden'>
				<motion.div
					key={index}
					className='h-full bg-foreground rounded-full origin-left'
					initial={{ scaleX: 0 }}
					animate={{ scaleX: 1 }}
					transition={{
						duration: SLIDE_DURATION,
						ease: 'linear',
					}}
				/>
			</div>
		</div>
	)
}
