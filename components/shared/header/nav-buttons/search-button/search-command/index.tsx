'use client'

import { Product } from '@/@types/product.types'
import {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandList,
} from '@/components/ui/command'
import { Spinner } from '@/components/ui/spinner'
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
						placeholder='Start typing the sneaker name'
					/>
				</div>
				<CommandList className='no-scrollbar'>
					{isLoading && (
						<div className='flex items-center justify-center py-6'>
							<Spinner className='size-5 text-muted-foreground' />
						</div>
					)}

					{!searchValue && !isLoading && (
						<CommandEmpty>Start typing to find your perfect pair</CommandEmpty>
					)}

					{!isLoading &&
						searchResults?.length === 0 &&
						searchValue &&
						searchValue === debouncedSearchValue && (
							<CommandEmpty>
								No sneakers matched{' '}
								<span className='font-semibold'>
									&quot;
									{searchValue.length > 30
										? searchValue.slice(0, 30) + '...'
										: searchValue}
									&quot;
								</span>
							</CommandEmpty>
						)}

					{!isLoading && searchResults && searchResults.length > 0 && (
						<CommandGroup heading='Sneakers'>
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
