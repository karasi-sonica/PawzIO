import './globals.css'
import { Inter } from 'next/font/google'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'


const inter = Inter({ subsets: ['latin'] })


export const metadata = {
  title: 'PawzIO | Pet Wellness Platform',
  description: 'Professional pet care platform connecting vets, pet owners, and walkers',
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}