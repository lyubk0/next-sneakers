import z from 'zod'

export const personalInfoSchema = z.object({
	firstName: z.string().nonempty('First name is required'),
	lastName: z.string().nonempty('Last name is required'),
	phone: z
		.string()
		.transform(v => v.replace(/_/g, '').trim())
		.refine(v => /^\d{2}\s\d{3}\s\d{2}\s\d{2}$/.test(v), 'Input 12 345 67 89'),
	city: z.string().nonempty('Choose a city'),
	warehouse: z.string().nonempty('Choose a warehouse'),
})

export type PersonalInfoValues = z.infer<typeof personalInfoSchema>
