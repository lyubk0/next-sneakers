import { Metadata } from 'next'
import { SuccesPageContainer } from './_components/succes-page-container'

export const metadata: Metadata = {
	title: 'Next Sneakers | Success',
}

export default function SuccessPage() {
	return <SuccesPageContainer />
}
