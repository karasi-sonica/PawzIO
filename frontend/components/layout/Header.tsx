'use client'

import { motion } from 'framer-motion'
import { PawPrint } from 'lucide-react'

export default function Header() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="sticky top-0 z-40 bg-gradient-to-b from-white/80 to-white/50 backdrop-blur-lg border-b border-rose-50"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-center">
        <div className="flex items-center justify-center gap-3">
          {/* Left Paw */}
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [-10, 0, 10] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <PawPrint className="h-5 w-5 text-rose-400 fill-rose-400" />
          </motion.div>

          {/* Logo Text */}
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-rose-500 via-pink-500 to-orange-400 bg-clip-text text-transparent">
              PawzIO
            </h1>
            <p className="text-xs text-gray-500 tracking-wide">Pet Wellness Platform</p>
          </div>

          {/* Right Paw */}
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [10, 0, -10] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.3 }}
          >
            <PawPrint className="h-5 w-5 text-amber-400 fill-amber-400" />
          </motion.div>
        </div>
      </div>
    </motion.header>
  )
}
