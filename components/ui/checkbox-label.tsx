import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

interface Props {
	id: string
	label: string
	checked?: boolean
	onCheckedChange?: (checked: boolean) => void
}

export const CheckboxLabel = ({
	id,
	label,
	checked,
	onCheckedChange,
}: Props) => {
	return (
		<div className='flex items-center gap-2'>
			<Checkbox id={id} checked={checked} onCheckedChange={onCheckedChange} />
			<Label htmlFor={id} className='cursor-pointer select-none'>
				{label}
			</Label>
		</div>
	)
}
