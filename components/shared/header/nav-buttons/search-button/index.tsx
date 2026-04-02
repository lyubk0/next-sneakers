import { useDefaultProducts } from '@/hooks/tanstack/product.queries'
import { useSearchProducts } from '@/hooks/tanstack/search-products.queries'
import { useDebounce } from '@/hooks/use-debounce.hooks'
import { FavouriteIcon, Search01Icon } from '@hugeicons/core-free-icons'
import Link from 'next/link'
import { useState } from 'react'
import { NavButton } from '../nav-button'
import { SearchCommand } from './search-command'

interface Props {
	className?: string
}

export const SearchButton = ({ className }: Props) => {
	const [open, setOpen] = useState(false)
	const [searchValue, setSearchValue] = useState('')

	const debouncedSearchValue = useDebounce(searchValue, 400)

	const { data: searchResults, isFetching } =
		useSearchProducts(debouncedSearchValue)
	const { data: defaultProducts, isFetching: isDefaultFetching } =
		useDefaultProducts()

	const results = searchValue ? searchResults : defaultProducts?.items
	const isLoading =
		isFetching || isDefaultFetching || searchValue !== debouncedSearchValue
	return (
		<>
			<SearchCommand
				open={open}
				setOpen={setOpen}
				searchValue={searchValue}
				searchResults={results}
				setSearchValue={setSearchValue}
				isLoading={isLoading}
				debouncedSearchValue={debouncedSearchValue}
			/>
			<NavButton onClick={() => setOpen(true)} Icon={Search01Icon} />
			<Link href='/favorites'>
				<NavButton Icon={FavouriteIcon} />
			</Link>
		</>
	)
}
