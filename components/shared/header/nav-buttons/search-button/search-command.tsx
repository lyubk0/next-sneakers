'use client'

import { Product } from '@/@types/product'
import {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command'
import { Title } from '@/components/ui/title'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

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
								<span className='font-semibold'>
									`&quot;{searchValue}`&quot;
								</span>
							</CommandEmpty>
						)}

					{searchResults && searchResults.length > 0 && (
						<CommandGroup>
							{searchResults.map(product => (
								<CommandItem
									onSelect={() => handleSelect(product.slug)}
									key={product.id}
								>
									<div className='flex gap-4'>
										<div className='bg-muted rounded-xl aspect-square w-[90px] shrink-0 flex items-center justify-center'>
											<Image
												src={product.images[0]}
												alt={product.name}
												width={70}
												height={70}
												quality={100}
											/>
										</div>
										<div className='flex gap-1 flex-col'>
											<Title
												size='xs'
												className='font-semibold tracking-[0.014em] !text-sm'
											>
												{product.name}
											</Title>
											<span className='text-sm font-semibold'>
												${product.price}
											</span>
										</div>
									</div>
								</CommandItem>
							))}
						</CommandGroup>
					)}
				</CommandList>
			</Command>
		</CommandDialog>
	)
}
