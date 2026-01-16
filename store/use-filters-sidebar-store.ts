import { create } from 'zustand'

interface FiltersSidebarState {
	open: boolean
	toggle: (open?: boolean) => void
}

export const useFiltersSidebarStore = create<FiltersSidebarState>()(set => ({
	open: true,
	toggle: open => {
		if (open) return set({ open })

		set(state => ({ open: !state.open }))
	},
}))
