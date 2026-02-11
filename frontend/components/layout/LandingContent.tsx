'use client'

import { motion } from 'framer-motion'
import { Heart, PawPrint, Users, Stethoscope } from 'lucide-react'

export default function LandingContent() {
  const features = [
    { icon: Stethoscope, title: 'Expert Vets', desc: 'Verified veterinarians' },
    { icon: Heart, title: 'Pet Care', desc: 'Complete wellness' },
    { icon: Users, title: 'Pet Owners', desc: 'Easy booking' },
  ]

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Blurred background pattern */}
      <div className="absolute inset-0 blur-3xl opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-rose-300 to-pink-300 rounded-full" />
        <div className="absolute -bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-orange-200 to-yellow-200 rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-32 text-center">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
            Your Pet's<br />
            <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-orange-400 bg-clip-text text-transparent">
              Wellness Companion
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
            Professional veterinary care, experienced walkers, and loving pet owners in one platform.
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="glass-effect card-shadow p-8 rounded-3xl"
            >
              <feature.icon className="h-12 w-12 mx-auto text-rose-500 mb-4" />
              <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center justify-center gap-8 text-sm text-gray-600"
        >
          <div className="flex items-center gap-2">
            <PawPrint className="h-5 w-5 text-amber-400 fill-amber-400" />
            <span>100% Trusted</span>
          </div>
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-rose-400 fill-rose-400" />
            <span>Pet Focused</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}