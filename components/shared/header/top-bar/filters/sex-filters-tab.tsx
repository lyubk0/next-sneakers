import { ToggleTabs } from '@/components/ui/toggle-tabs'
import { Sex, SEXES } from '@/constants/product.constants'
import { Mars, Venus } from 'lucide-react'

interface Props {
	selectedSexes: Sex[]
	onChange: (value: Sex | 'all') => void
	className?: string
}

const OPTIONS = [
	{ value: 'all', label: 'All' },
	...SEXES.map(s => ({
		...s,
		icon: s.value === 'men' ? <Mars size={18} /> : <Venus size={18} />,
	})),
]

export const SexFilterTabs = ({
	selectedSexes,
	onChange,
	className,
}: Props) => {
	const value = selectedSexes.length === 1 ? selectedSexes[0] : 'all'

	return (
		<ToggleTabs
			onChange={(v: string) => onChange(v as Sex | 'all')}
			value={value}
			options={OPTIONS}
			className={className}
		/>
	)
}
