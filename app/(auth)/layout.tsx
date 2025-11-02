export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return <main className='bg-[hsl(0_0_97)]'>{children}</main>
}
