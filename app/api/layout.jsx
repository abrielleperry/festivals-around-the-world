import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Dark Theme Data App',
  description: 'A sleek, dark-themed app with dynamic data loading',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-900 text-gray-100`}>
        <header className="bg-gray-800 p-4">
          <h1 className="text-2xl font-bold text-purple-400">Dark Theme Data App</h1>
        </header>
        <main className="p-4">
          {children}
        </main>
      </body>
    </html>
  )
}

