'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Stethoscope, User, Menu } from 'lucide-react'


export default function Navbar() {
return (
<motion.header
initial={{ y: -20, opacity: 0 }}
animate={{ y: 0, opacity: 1 }}
transition={{ duration: 0.4, ease: 'easeOut' }}
className="sticky top-0 z-50"
>
{/* Glass background */}
<div className="absolute inset-0 bg-white/70 backdrop-blur-xl border-b border-slate-200" />


<div className="relative max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
{/* Brand */}
<Link href="/" className="flex items-center gap-2">
<div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-semibold">
C
</div>
<span className="font-semibold tracking-tight text-slate-800">
CareTrio
</span>
</Link>


{/* Center Nav (desktop) */}
<nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
<Link href="/doctor" className="flex items-center gap-1 hover:text-blue-600 transition">
<Stethoscope className="h-4 w-4" /> Doctor
</Link>
<Link href="/patient" className="flex items-center gap-1 hover:text-blue-600 transition">
<User className="h-4 w-4" /> Patient
</Link>
</nav>


{/* Actions */}
<div className="flex items-center gap-3">
<Link
href="/login"
className="hidden sm:inline-flex px-4 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
>
Sign in
</Link>
<Link
href="/signup"
className="px-4 py-2 rounded-xl text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition shadow-md"
>
Get Started
</Link>


{/* Mobile menu icon (future use) */}
<button className="md:hidden p-2 rounded-lg hover:bg-slate-100">
<Menu className="h-5 w-5" />
</button>
</div>
</div>
</motion.header>
)
}