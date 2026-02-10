'use client'

import { motion } from 'framer-motion'
import { Stethoscope, Heart, PawPrint, Users, ArrowRight, CheckCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function RoleSelectionPage() {
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState<'doctor' | 'owner' | 'walker' | null>(null)

  const roles = [
    {
      id: 'doctor',
      title: 'Veterinarian',
      icon: Stethoscope,
      color: 'from-blue-400 to-cyan-400',
      description: 'Provide professional veterinary care',
      details: ['Create consultations', 'Write prescriptions', 'Manage patient records'],
    },
    {
      id: 'owner',
      title: 'Pet Owner',
      icon: Heart,
      color: 'from-rose-400 to-pink-400',
      description: 'Care for your beloved pets',
      details: ['Book appointments', 'Track pet health', 'Connect with vets'],
    },
    {
      id: 'walker',
      title: 'Pet Walker',
      icon: Users,
      color: 'from-amber-400 to-orange-400',
      description: 'Provide expert walking services',
      details: ['Accept walk requests', 'Track locations', 'Earn income'],
    },
  ]

  const handleRoleSelect = (role: 'doctor' | 'owner' | 'walker') => {
    setSelectedRole(role)
    setTimeout(() => {
      if (role === 'doctor') {
        router.push('/doctor/onboarding')
      } else if (role === 'owner') {
        router.push('/owner/dashboard')
      } else {
        router.push('/walker/dashboard')
      }
    }, 800)
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            What's your role?
          </h1>
          <p className="text-lg text-gray-600">
            Select how you'll use PawzIO to make the most of our platform
          </p>
        </motion.div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {roles.map((role, index) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => handleRoleSelect(role.id as 'doctor' | 'owner' | 'walker')}
              className={`relative group cursor-pointer p-8 rounded-3xl transition-all duration-300 ${
                selectedRole === role.id
                  ? 'glass-effect ring-2 ring-rose-400'
                  : 'glass-effect hover:shadow-xl'
              }`}
            >
              {/* Selection indicator */}
              {selectedRole === role.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-4 right-4"
                >
                  <CheckCircle className="h-6 w-6 text-rose-500" />
                </motion.div>
              )}

              {/* Icon with gradient background */}
              <motion.div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${role.color} flex items-center justify-center mb-6 text-white shadow-lg`}
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <role.icon className="h-8 w-8" />
              </motion.div>

              {/* Title and description */}
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{role.title}</h3>
              <p className="text-gray-600 mb-5">{role.description}</p>

              {/* Details list */}
              <ul className="space-y-3 mb-8">
                {role.details.map((detail, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="flex items-center gap-2 text-sm text-gray-600"
                  >
                    <PawPrint className="h-4 w-4 text-rose-400 flex-shrink-0" />
                    {detail}
                  </motion.li>
                ))}
              </ul>

              {/* CTA Button */}
              <motion.button
                whileHover={{ gap: 12 }}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-rose-500 to-orange-400 text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
              >
                Select Role
                <ArrowRight className="h-5 w-5" />
              </motion.button>

              {/* Hover gradient effect */}
              <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-10 bg-gradient-to-br ${role.color} pointer-events-none transition-opacity duration-300`} />
            </motion.div>
          ))}
        </div>

        {/* Loading state */}
        {selectedRole && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="relative bg-white rounded-3xl p-8 shadow-2xl"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-12 w-12 border-4 border-rose-200 border-t-rose-500 rounded-full"
              />
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
