import { Size } from '@/@types/size'

interface Props {
	sizes: Size[]
	className?: string
}

export const SizeBar = ({ sizes, className }: Props) => {
	return (
		<div className='flex text-muted-foreground text-sm bg-muted items-center px-3 py-1.5 gap-2 rounded-xl w-max'>
			{sizes.map(size => (
				<div className='font-medium'>{size.eur_size}</div>
			))}
		</div>
	)
}
