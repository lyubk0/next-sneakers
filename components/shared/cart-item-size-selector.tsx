import { Size } from '@/@types/size'
import { cn } from '@/lib/utils'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select'

interface Props {
	selectedSizeId: string
	sizes: Size[]
	className?: string
}

export const CartItemSizeSelector = ({
	selectedSizeId,
	sizes,
	className,
}: Props) => {
	return (
		<Select defaultValue={selectedSizeId}>
			<SelectTrigger className={cn(className, 'p-0 gap-1 bg-transparent')}>
				<SelectValue />
			</SelectTrigger>
			<SelectContent align='start'>
				<SelectGroup>
					{sizes.map(size => (
						<SelectItem key={size.id} value={size.id.toString()}>
							{size.eur_size}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}
