import {
	TabsHighlightItem as TabsHighlightItemPrimitive,
	TabsHighlight as TabsHighlightPrimitive,
	TabsList as TabsListPrimitive,
	Tabs as TabsPrimitive,
	TabsTrigger as TabsTriggerPrimitive,
	type TabsListProps as TabsListPrimitiveProps,
	type TabsProps as TabsPrimitiveProps,
	type TabsTriggerProps as TabsTriggerPrimitiveProps,
} from '@/components/ui/animate-ui/primitives/animate/tabs'

import { cn } from '@/lib/utils'

type ToggleTabsProps = TabsPrimitiveProps

function ToggleTabs({ className, ...props }: ToggleTabsProps) {
	return (
		<TabsPrimitive
			className={cn('flex flex-col gap-2', className)}
			{...props}
		/>
	)
}

type ToggleTabsListProps = TabsListPrimitiveProps

function ToggleTabsList({ className, ...props }: ToggleTabsListProps) {
	return (
		<TabsHighlightPrimitive className='absolute z-0 inset-0 border border-transparent rounded-lg bg-background dark:border-input dark:bg-input/30 shadow-sm'>
			<TabsListPrimitive
				className={cn(
					'bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-xl p-1',
					className
				)}
				{...props}
			/>
		</TabsHighlightPrimitive>
	)
}

type ToggleTabsItemProps = TabsTriggerPrimitiveProps

function ToggleTabsItem({ className, ...props }: ToggleTabsItemProps) {
	return (
		<TabsHighlightItemPrimitive value={props.value} className='flex-1'>
			<TabsTriggerPrimitive
				className={cn(
					"data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring \
          text-muted-foreground inline-flex h-[calc(100%)] flex-1 items-center justify-center gap-1.5 rounded-md w-full px-2 py-1 \
          text-sm font-medium whitespace-nowrap transition-colors duration-500 ease-in-out \
          focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 \
          [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
					className
				)}
				{...props}
			/>
		</TabsHighlightItemPrimitive>
	)
}

export {
	ToggleTabs,
	ToggleTabsItem,
	ToggleTabsList,
	type ToggleTabsItemProps,
	type ToggleTabsListProps,
	type ToggleTabsProps,
}
