import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"

// Modify font loading to be more resilient
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Ensures text remains visible during font load
  variable: '--font-inter' // Allows us to use it as a CSS variable
})

export const metadata: Metadata = {
  title: "Book Tracker",
  description: "Track your reading progress",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>{children}</body>
    </html>
  )
}

