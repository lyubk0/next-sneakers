'use client'

import { Product } from '@/@types/product'
import {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandList,
} from '@/components/ui/command'
import { useRouter } from 'next/navigation'
import { SearchCommandItem } from './search-command-item'

interface Props {
	open: boolean
	searchValue: string
	debouncedSearchValue: string
	searchResults?: Product[]
	setSearchValue: (value: string) => void
	setOpen: (open: boolean) => void

	isLoading: boolean
	className?: string
}

export const SearchCommand = ({
	open,
	searchValue,
	debouncedSearchValue,
	searchResults,
	setSearchValue,
	setOpen,
	isLoading,
	className,
}: Props) => {
	const router = useRouter()

	const handleSelect = (productSlug: string) => {
		setOpen(false)
		router.push(`/${productSlug}`)
	}
	return (
		<CommandDialog showCloseButton={false} open={open} onOpenChange={setOpen}>
			<Command shouldFilter={false}>
				<div className='pb-4'>
					<CommandInput
						value={searchValue}
						onValueChange={setSearchValue}
						isLoading={isLoading}
						placeholder='Start typing the sneaker name'
					/>
				</div>
				<CommandList className='no-scrollbar'>
					{!searchValue && (
						<CommandEmpty>Start typing to find your perfect pair</CommandEmpty>
					)}

					{searchResults?.length === 0 &&
						searchValue &&
						!isLoading &&
						searchValue === debouncedSearchValue && (
							<CommandEmpty>
								No sneakers matched{' '}
								<span className='font-semibold'>&quot;{searchValue}&quot;</span>
							</CommandEmpty>
						)}

					{searchResults && searchResults.length > 0 && (
						<CommandGroup>
							{searchResults.map(product => (
								<SearchCommandItem product={product} onSelect={handleSelect} />
							))}
						</CommandGroup>
					)}
				</CommandList>
			</Command>
		</CommandDialog>
	)
}
