import { create } from 'zustand'

interface FiltersDrawerState {
	open: boolean
	toggle: (open?: boolean) => void
}

export const useFiltersDrawerStore = create<FiltersDrawerState>()(set => ({
	open: false,
	toggle: open => {
		if (open) return set({ open })

		set(state => ({ open: !state.open }))
	},
}))
