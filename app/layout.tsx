import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
})

const humane = localFont({
  src: [
    {
      path: '../public/fonts/Humane-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/Humane-ExtraBold.woff2',
      weight: '800',
      style: 'normal',
    },
  ],
  variable: '--font-humane',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'UHL Slides',
  description: 'UHL Werbeagentur Präsentations-System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className={`${plusJakartaSans.variable} ${humane.variable}`}>
      <body>{children}</body>
    </html>
  )
}
