'use client'

import { motion } from 'framer-motion'
import { Plus, Calendar, Heart, MapPin, Star, Trash2 } from 'lucide-react'
import { useState } from 'react'

// Mock pets data
const mockPets = [
  {
    id: 1,
    name: 'Charlie',
    breed: 'Golden Retriever',
    age: 3,
    image: '🐕',
    lastCheckup: '2 weeks ago',
  },
  {
    id: 2,
    name: 'Muffin',
    breed: 'Persian Cat',
    age: 2,
    image: '🐱',
    lastCheckup: '1 month ago',
  },
]

// Mock appointments
const mockAppointments = [
  {
    id: 1,
    petName: 'Charlie',
    doctorName: 'Dr. Sarah Smith',
    date: 'Feb 15, 2026',
    time: '2:30 PM',
    status: 'confirmed',
  },
  {
    id: 2,
    petName: 'Muffin',
    doctorName: 'Dr. James Wilson',
    date: 'Feb 20, 2026',
    time: '10:00 AM',
    status: 'pending',
  },
]

export default function OwnerDashboard() {
  const [pets, setPets] = useState(mockPets)
  const [appointments, setAppointments] = useState(mockAppointments)
  const [showAddPet, setShowAddPet] = useState(false)

  const handleRemovePet = (id: number) => {
    setPets(pets.filter(p => p.id !== id))
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">My Pets</h1>
          <p className="text-gray-600">Manage and care for your beloved companions</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Pets List */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Your Pets</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAddPet(!showAddPet)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-orange-400 text-white font-semibold hover:shadow-lg transition-all"
                >
                  <Plus className="h-5 w-5" />
                  Add Pet
                </motion.button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {pets.map((pet, index) => (
                  <motion.div
                    key={pet.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-effect rounded-3xl p-6 group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-5xl">{pet.image}</div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => handleRemovePet(pet.id)}
                        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all"
                      >
                        <Trash2 className="h-5 w-5" />
                      </motion.button>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-800 mb-1">{pet.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {pet.breed} • {pet.age} years old
                    </p>

                    <div className="bg-white/50 rounded-2xl p-4 mb-4">
                      <p className="text-xs text-gray-500 mb-1">Last Checkup</p>
                      <p className="font-semibold text-gray-700">{pet.lastCheckup}</p>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      className="w-full py-3 rounded-xl border-2 border-rose-500 text-rose-600 font-semibold hover:bg-rose-50 transition-all flex items-center justify-center gap-2"
                    >
                      <Calendar className="h-4 w-4" />
                      Book Appointment
                    </motion.button>
                  </motion.div>
                ))}
              </div>

              {/* Add Pet Form */}
              {showAddPet && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-effect rounded-3xl p-8 mt-8"
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Add New Pet</h3>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      setShowAddPet(false)
                    }}
                    className="space-y-4"
                  >
                    <input
                      type="text"
                      placeholder="Pet name"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                    <input
                      type="text"
                      placeholder="Breed"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                    <input
                      type="number"
                      placeholder="Age (years)"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                    <div className="flex gap-4">
                      <button
                        type="submit"
                        className="flex-1 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-orange-400 text-white font-semibold hover:shadow-lg"
                      >
                        Add Pet
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAddPet(false)}
                        className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </div>
          </div>

          {/* Appointments Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="glass-effect rounded-3xl p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-rose-500" />
                Upcoming Appointments
              </h2>

              <div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto">
                {appointments.length === 0 ? (
                  <p className="text-center text-gray-500 text-sm py-8">
                    No appointments scheduled
                  </p>
                ) : (
                  appointments.map((apt, index) => (
                    <motion.div
                      key={apt.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/50 rounded-2xl p-4"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-bold text-gray-800">{apt.petName}</h4>
                          <p className="text-xs text-gray-600">{apt.doctorName}</p>
                        </div>
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded-full ${
                            apt.status === 'confirmed'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {apt.status}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>{apt.date}</p>
                        <p className="font-semibold">{apt.time}</p>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
