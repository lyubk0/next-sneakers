import { useSearchProducts } from '@/hooks/tanstack/search-products-queries'
import { useDebounce } from '@/hooks/use-debounce'
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

	const debouncedSearch = useDebounce(searchValue, 400)

	const { data: searchResults, isFetching } = useSearchProducts(debouncedSearch)

	return (
		<>
			<SearchCommand
				open={open}
				setOpen={setOpen}
				searchValue={searchValue}
				searchResults={searchResults}
				setSearchValue={setSearchValue}
				isLoading={isFetching}
				debouncedSearchValue={debouncedSearch}
			/>
			<NavButton onClick={() => setOpen(true)} Icon={Search01Icon} />
			<Link href='/favorites'>
				<NavButton Icon={FavouriteIcon} />
			</Link>
		</>
	)
}
