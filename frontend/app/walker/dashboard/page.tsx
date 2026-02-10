'use client'

import { motion } from 'framer-motion'
import { MapPin, Clock, DollarSign, CheckCircle, X, Phone, Zap } from 'lucide-react'
import { useState } from 'react'

// Mock walk requests
const mockWalks = [
  {
    id: 1,
    ownerName: 'John Doe',
    petName: 'Max',
    petType: 'Golden Retriever',
    location: '123 Park Ave, Downtown',
    startTime: '3:00 PM',
    duration: '30 mins',
    rate: '$20',
    status: 'active',
  },
  {
    id: 2,
    ownerName: 'Sarah Smith',
    petName: 'Luna',
    petType: 'Cat - Indoor',
    location: '456 Elm St, Midtown',
    startTime: '4:30 PM',
    duration: '45 mins',
    rate: '$25',
    status: 'pending',
  },
  {
    id: 3,
    ownerName: 'Mike Johnson',
    petName: 'Buddy',
    petType: 'Labrador',
    location: '789 Oak Rd, Uptown',
    startTime: '5:15 PM',
    duration: '60 mins',
    rate: '$30',
    status: 'pending',
  },
]

export default function WalkerDashboard() {
  const [walks, setWalks] = useState(mockWalks)
  const [selectedWalk, setSelectedWalk] = useState<(typeof mockWalks)[0] | null>(null)
  const [completedWalks, setCompletedWalks] = useState(0)
  const [totalEarnings, setTotalEarnings] = useState(75)

  const handleAcceptWalk = (id: number) => {
    const walk = walks.find(w => w.id === id)
    if (walk) {
      setWalks(walks.map(w => (w.id === id ? { ...w, status: 'active' } : w)))
      setSelectedWalk(walk)
    }
  }

  const handleCompleteWalk = (id: number) => {
    const walk = walks.find(w => w.id === id)
    if (walk) {
      setWalks(walks.filter(w => w.id !== id))
      setCompletedWalks(completedWalks + 1)
      // Extract amount from rate string
      const amount = parseInt(walk.rate.replace('$', ''))
      setTotalEarnings(totalEarnings + amount)
      setSelectedWalk(null)
    }
  }

  const handleDeclineWalk = (id: number) => {
    setWalks(walks.filter(w => w.id !== id))
    setSelectedWalk(null)
  }

  const activeWalks = walks.filter(w => w.status === 'active')
  const pendingWalks = walks.filter(w => w.status === 'pending')

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Walking Dashboard</h1>
          <p className="text-gray-600">Accept and manage pet walking requests</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            {
              label: 'Today\'s Walks',
              value: activeWalks.length,
              icon: MapPin,
              color: 'from-blue-400 to-cyan-400',
            },
            {
              label: 'Completed',
              value: completedWalks,
              icon: CheckCircle,
              color: 'from-green-400 to-emerald-400',
            },
            {
              label: 'Today\'s Earnings',
              value: `$${totalEarnings}`,
              icon: DollarSign,
              color: 'from-rose-400 to-orange-400',
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-effect rounded-3xl p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Walk Requests */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Walk Requests</h2>

            {pendingWalks.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-effect rounded-3xl p-12 text-center"
              >
                <p className="text-gray-600">
                  No pending walk requests at the moment.{' '}
                  <Zap className="inline h-4 w-4 text-amber-500" />
                </p>
              </motion.div>
            ) : (
              <div className="space-y-6">
                {pendingWalks.map((walk, index) => (
                  <motion.div
                    key={walk.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-effect rounded-3xl p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-1">{walk.petName}</h3>
                        <p className="text-sm text-gray-600">{walk.ownerName} • {walk.petType}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-rose-600">{walk.rate}</p>
                        <p className="text-xs text-gray-600">{walk.duration}</p>
                      </div>
                    </div>

                    <div className="bg-white/50 rounded-2xl p-4 mb-6 space-y-3">
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-rose-500 flex-shrink-0" />
                        <p className="text-sm text-gray-700">{walk.location}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-rose-500 flex-shrink-0" />
                        <p className="text-sm text-gray-700">Starts at {walk.startTime}</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        onClick={() => handleDeclineWalk(walk.id)}
                        className="flex-1 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 flex items-center justify-center gap-2"
                      >
                        <X className="h-4 w-4" />
                        Decline
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        onClick={() => handleAcceptWalk(walk.id)}
                        className="flex-1 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-orange-400 text-white font-semibold hover:shadow-lg flex items-center justify-center gap-2"
                      >
                        <CheckCircle className="h-4 w-4" />
                        Accept
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Active Walks Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="glass-effect rounded-3xl p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Zap className="h-5 w-5 text-amber-500" />
                Active Walks
              </h2>

              <div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto">
                {activeWalks.length === 0 ? (
                  <p className="text-center text-gray-500 text-sm py-8">No active walks</p>
                ) : (
                  activeWalks.map((walk, index) => (
                    <motion.div
                      key={walk.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gradient-to-r from-rose-100 to-orange-100 rounded-2xl p-4"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-bold text-gray-800">{walk.petName}</h4>
                          <p className="text-xs text-gray-600">{walk.ownerName}</p>
                        </div>
                        <Phone className="h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-600" />
                      </div>

                      <div className="text-sm text-gray-700 space-y-2 mb-4">
                        <p className="flex items-center gap-2">
                          <MapPin className="h-3 w-3" />
                          {walk.location}
                        </p>
                        <p className="flex items-center gap-2">
                          <Clock className="h-3 w-3" />
                          {walk.startTime}
                        </p>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        onClick={() => handleCompleteWalk(walk.id)}
                        className="w-full py-2 rounded-lg bg-green-500 text-white font-semibold text-sm hover:bg-green-600 transition-all"
                      >
                        Complete Walk
                      </motion.button>
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
