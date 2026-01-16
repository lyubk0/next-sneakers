import { cn } from '@/lib/utils'
import { HugeiconsIcon, IconSvgElement } from '@hugeicons/react'
import { Fragment } from 'react'

interface Step {
	id: number
	Icon: IconSvgElement
}

interface StepperProps {
	steps: Step[]
	currentStep: number
}

export function Stepper({ steps, currentStep }: StepperProps) {
	return (
		<div className='flex items-center w-full'>
			{steps.map((step, index) => {
				const isActive = step.id === currentStep
				const isCompleted = step.id < currentStep

				return (
					<Fragment key={step.id}>
						<div className='flex flex-col items-center'>
							<div
								className={cn(
									'flex items-center  justify-center size-10 rounded-full font-medium transition-colors bg-muted text-muted-foreground',
									(isActive || isCompleted) && 'bg-black text-white'
								)}
							>
								<HugeiconsIcon icon={step.Icon} strokeWidth={2} size={22} />
							</div>
						</div>

						{index < steps.length - 1 && (
							<div
								className={cn(
									'flex-1 h-1',
									isCompleted ? 'bg-black' : 'bg-muted'
								)}
							/>
						)}
					</Fragment>
				)
			})}
		</div>
	)
}
