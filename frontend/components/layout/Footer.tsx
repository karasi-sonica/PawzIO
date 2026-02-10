'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <motion.footer
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mt-20 bg-gradient-to-r from-rose-50 via-pink-50 to-orange-50 border-t border-rose-100"
    >
      <div className="max-w-7xl mx-auto px-6 py-8 text-center">
        <p className="text-sm text-gray-600">
          © 2026 PawzIO. All rights reserved.
        </p>
      </div>
    </motion.footer>
  )
}
