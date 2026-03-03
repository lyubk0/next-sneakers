import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { useSizeFilter } from '@/hooks/nuqs/use-size-filters'
import { sizeKeys } from '@/hooks/tanstack/sizes-queries'
import { cn } from '@/lib/utils'
import { useQueryClient } from '@tanstack/react-query'
import { FiltersTitle } from '../filters-title'

interface Props {
	className?: string
}

export const SizesFilterSection = ({ className }: Props) => {
	const queryClient = useQueryClient()

	const sizes = queryClient.getQueryData(sizeKeys.all) as string[]

	const { selectedSizes, toggleSize } = useSizeFilter()
	return (
		<AccordionItem value='sizes'>
			<AccordionTrigger>
				<FiltersTitle title='Size' />
			</AccordionTrigger>
			<AccordionContent>
				<div className='grid grid-cols-5 gap-2'>
					{sizes?.map(size => (
						<Button
							isScaled={false}
							onClick={() => toggleSize(size)}
							key={size}
							className={cn(
								'size-7 !w-full text-foreground rounded-md text-xs font-semibold text-center bg-transparent border-border hover:bg-transparent border-2',
								selectedSizes.includes(size)
									? 'border-foreground'
									: 'border-border',
							)}
						>
							{Number(size)}
						</Button>
					))}
				</div>
			</AccordionContent>
		</AccordionItem>
	)
}
