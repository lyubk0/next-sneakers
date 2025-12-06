import { Size } from '@/@types/size'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
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
			<SelectTrigger className={className}>
				<SelectValue />
			</SelectTrigger>
			<SelectContent align='start'>
				<SelectGroup>
					<SelectLabel>Розміри</SelectLabel>
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
