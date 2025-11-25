import './globals.css'

export const metadata = {
  title: 'Incoming Call',
  description: 'Create fake incoming calls',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}