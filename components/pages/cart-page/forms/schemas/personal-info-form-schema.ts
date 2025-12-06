import z from 'zod'

export const personalInfoSchema = z.object({
	firstName: z
		.string()
		.min(2, "Ім'я повинно містити щонайменше 2 символи")
		.max(30, "Ім'я занадто довге"),
	middleName: z
		.string()
		.min(2, 'По батькові повинно містити щонайменше 2 символи')
		.max(30, 'По батькові занадто довге'),
	lastName: z
		.string()
		.min(2, 'Прізвище повинно містити щонайменше 2 символи')
		.max(30, 'Прізвище занадто довге'),
	phone: z
		.string()
		.transform(v => v.replace(/_/g, '').trim())
		.refine(
			v => /^\d{2}\s\d{3}\s\d{2}\s\d{2}$/.test(v),
			'Введіть номер телефону у форматі 12 345 67 89'
		),
	city: z.string().nonempty('Оберіть місто'),
	warehouse: z.string().nonempty('Оберіть відділення'),
})

export type PersonalInfoValues = z.infer<typeof personalInfoSchema>
