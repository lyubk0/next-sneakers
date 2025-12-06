import { Input } from '@/components/ui/input'
import { Popover, PopoverAnchor, PopoverContent } from '@/components/ui/popover'
import { Skeleton } from '@/components/ui/skeleton'
import { Command as CommandPrimitive } from 'cmdk'
import { useMemo, useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandList,
} from './command'
type Props<T extends string> = {
	selectedValue: T
	onSelectedValueChange: (value: T) => void
	searchValue: string
	onSearchValueChange: (value: string) => void
	items: { value: T; label: string }[]
	isLoading?: boolean
	emptyMessage?: string
	placeholder?: string
	disabled?: boolean
}

export function AutoComplete<T extends string>({
	selectedValue,
	onSelectedValueChange,
	searchValue,
	onSearchValueChange,
	items,
	isLoading,
	emptyMessage = 'No items.',
	placeholder = 'Search...',
	disabled,
}: Props<T>) {
	const [open, setOpen] = useState(false)
	const containerRef = useRef<HTMLDivElement>(null)

	useOnClickOutside(
		containerRef as unknown as React.RefObject<HTMLElement>,
		() => setOpen(false)
	)

	const labels = useMemo(
		() =>
			items.reduce((acc, item) => {
				acc[item.value] = item.label
				return acc
			}, {} as Record<string, string>),
		[items]
	)

	const reset = () => {
		onSelectedValueChange('' as T)
		onSearchValueChange('')
	}

	const onInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		if (
			!e.relatedTarget?.hasAttribute('cmdk-list') &&
			labels[selectedValue] !== searchValue
		) {
			reset()
		}
	}

	const onSelectItem = (inputValue: string) => {
		if (inputValue === selectedValue) {
			reset()
		} else {
			onSelectedValueChange(inputValue as T)
			onSearchValueChange(labels[inputValue] ?? '')
		}
		setOpen(false)
	}

	const handleSearchValueChange = (value: string) => {
		if (selectedValue && labels[selectedValue] !== value) {
			onSelectedValueChange('' as T)
		}
		onSearchValueChange(value)
	}

	return (
		<div ref={containerRef} className='flex flex-1 items-center'>
			<Popover open={open} onOpenChange={setOpen}>
				<Command className='overflow-visible' shouldFilter={false}>
					<PopoverAnchor asChild>
						<CommandPrimitive.Input
							asChild
							value={searchValue}
							onValueChange={handleSearchValueChange}
							onKeyDown={e => setOpen(e.key !== 'Escape')}
							onMouseDown={() => setOpen(open => !!searchValue || !open)}
							onFocus={() => setOpen(true)}
							onBlur={onInputBlur}
							disabled={disabled}
						>
							<Input placeholder={placeholder} />
						</CommandPrimitive.Input>
					</PopoverAnchor>
					{!open && <CommandList aria-hidden='true' className='hidden' />}
					<PopoverContent
						className='w-full min-w-[var(--radix-popover-trigger-width)] max-w-[var(--radix-popover-trigger-width)] p-0'
						onOpenAutoFocus={e => e.preventDefault()}
						onInteractOutside={e => {
							if (
								e.target instanceof Element &&
								e.target.hasAttribute('cmdk-input')
							) {
								e.preventDefault()
							}
						}}
					>
						<CommandList>
							{isLoading && (
								<CommandPrimitive.Loading>
									<div className='p-1'>
										<Skeleton className='h-6 w-full' />
									</div>
								</CommandPrimitive.Loading>
							)}
							{items.length > 0 && !isLoading ? (
								<CommandGroup>
									{items.map(option => (
										<CommandItem
											key={option.value}
											value={option.value}
											onMouseDown={e => e.preventDefault()}
											onSelect={onSelectItem}
										>
											{option.label}
										</CommandItem>
									))}
								</CommandGroup>
							) : null}
							{!isLoading ? (
								<CommandEmpty>{emptyMessage ?? 'No items.'}</CommandEmpty>
							) : null}
						</CommandList>
					</PopoverContent>
				</Command>
			</Popover>
		</div>
	)
}
