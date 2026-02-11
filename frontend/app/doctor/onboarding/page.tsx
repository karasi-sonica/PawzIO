'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Stethoscope, Clock, ArrowRight, Upload } from 'lucide-react'
import { useState } from 'react'
import { CheckCircle } from 'lucide-react';


export default function DoctorOnboarding() {
  const [step, setStep] = useState<'choice' | 'new' | 'existing' | 'pending' | 'verified' | 'dashboard'>('choice')
  const [formData, setFormData] = useState({
    name: '',
    qualification: '',
    licenseNumber: '',
    clinicName: '',
  })
  const [doctorName, setDoctorName] = useState('')

  const handleNewDoctor = () => {
    setStep('new')
  }

  const handleExistingDoctor = () => {
    setStep('existing')
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmitNewDoctor = (e: React.FormEvent) => {
    e.preventDefault()
    // Store doctor name for later display
    setDoctorName(formData.name)
    // Simulate submission
    setStep('pending')
  }

  const handleGoToDashboard = () => {
    setStep('dashboard')
  }

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {/* Step 1: Choice */}
        {step === 'choice' && (
          <motion.div
            key="choice"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-4xl mx-auto px-6 py-20"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Welcome, Doctor</h2>
            <p className="text-lg text-gray-600 mb-12">
              Are you a new doctor or already registered?
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* New Doctor Card */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleNewDoctor}
                className="glass-effect rounded-3xl p-8 text-left hover:shadow-xl transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-white mb-4">
                  <Upload className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">New Doctor</h3>
                <p className="text-gray-600 mb-4">Create a new doctor profile</p>
                <p className="text-sm text-gray-500">You'll need to provide credentials for verification</p>
                <div className="mt-6 flex items-center gap-2 text-rose-600 font-semibold">
                  Get Started <ArrowRight className="h-4 w-4" />
                </div>
              </motion.button>

              {/* Existing Doctor Card */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleExistingDoctor}
                className="glass-effect rounded-3xl p-8 text-left hover:shadow-xl transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-400 to-indigo-400 flex items-center justify-center text-white mb-4">
                  <Stethoscope className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Existing Doctor</h3>
                <p className="text-gray-600 mb-4">Sign in with your existing profile</p>
                <p className="text-sm text-gray-500">You'll be verified already</p>
                <div className="mt-6 flex items-center gap-2 text-rose-600 font-semibold">
                  Sign In <ArrowRight className="h-4 w-4" />
                </div>
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Step 2: New Doctor Form */}
        {step === 'new' && (
          <motion.div
            key="new"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-2xl mx-auto px-6 py-20"
          >
            <button
              onClick={() => setStep('choice')}
              className="text-rose-600 hover:text-rose-700 font-semibold mb-8 flex items-center gap-2"
            >
              ← Back
            </button>

            <h2 className="text-4xl font-bold text-gray-800 mb-2">Create Your Doctor Profile</h2>
            <p className="text-lg text-gray-600 mb-8">
              Provide your professional details for verification
            </p>

            <form onSubmit={handleSubmitNewDoctor} className="space-y-6">
              {/* Full Name */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder="Dr. Jane Smith"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  required
                />
              </motion.div>

              {/* Qualification */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Qualification (e.g., BVSc, DVM)
                </label>
                <input
                  type="text"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleFormChange}
                  placeholder="Doctor of Veterinary Medicine"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  required
                />
              </motion.div>

              {/* License Number */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  License Number
                </label>
                <input
                  type="text"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleFormChange}
                  placeholder="VET-2024-12345"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  required
                />
              </motion.div>

              {/* Clinic Name */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Clinic / Hospital Name
                </label>
                <input
                  type="text"
                  name="clinicName"
                  value={formData.clinicName}
                  onChange={handleFormChange}
                  placeholder="Happy Paws Clinic"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  required
                />
              </motion.div>

              {/* Submit Button */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-500 to-orange-400 text-white font-semibold hover:shadow-lg transition-all"
              >
                Submit for Verification
              </motion.button>
            </form>
          </motion.div>
        )}

        {/* Step 3: Existing Doctor Login */}
        {step === 'existing' && (
          <motion.div
            key="existing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-2xl mx-auto px-6 py-20"
          >
            <button
              onClick={() => setStep('choice')}
              className="text-rose-600 hover:text-rose-700 font-semibold mb-8 flex items-center gap-2"
            >
              ← Back
            </button>

            <h2 className="text-4xl font-bold text-gray-800 mb-2">Sign In as Doctor</h2>
            <p className="text-lg text-gray-600 mb-8">
              Use your registered email and password
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleGoToDashboard()
              }}
              className="space-y-6"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="doctor@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  required
                />
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.02 }}
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-500 to-orange-400 text-white font-semibold hover:shadow-lg transition-all"
              >
                Sign In
              </motion.button>
            </form>
          </motion.div>
        )}

        {/* Step 4: Verification Pending */}
        {step === 'pending' && (
          <motion.div
            key="pending"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="min-h-screen flex items-center justify-center px-6"
          >
            <div className="max-w-md text-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-orange-200 to-pink-200 flex items-center justify-center mb-6"
              >
                <Clock className="h-10 w-10 text-orange-600" />
              </motion.div>

              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Verification Pending
              </h2>
              <p className="text-gray-600 mb-8">
                Verification mail sent to the team. We'll let you know when you are verified.
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
                <p className="text-sm text-blue-800 mb-4">
                  Our team is reviewing your credentials and will notify you once your profile is verified.
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => setStep('dashboard')}
                className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-rose-500 to-orange-400 text-white font-semibold hover:shadow-lg transition-all mb-4"
              >
                Go to Dashboard
              </motion.button>

              <button
                onClick={() => setStep('choice')}
                className="text-rose-600 hover:text-rose-700 font-semibold text-sm"
              >
                Back to Options
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 5: Dashboard (simulated) */}
        {step === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-4xl mx-auto px-6 py-20"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-12"
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-green-200 to-emerald-200 flex items-center justify-center mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Welcome, {doctorName || 'Doctor'}!
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Your email has been verified. You can now use the doctor dashboard.
              </p>
              <div className="glass-effect rounded-3xl p-8 mb-8">
                <div className="text-left space-y-4 mb-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Account Details:</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white/50 rounded-2xl p-4">
                      <p className="text-xs text-gray-500 uppercase mb-1">Name</p>
                      <p className="font-semibold text-gray-800">{formData.name}</p>
                    </div>
                    <div className="bg-white/50 rounded-2xl p-4">
                      <p className="text-xs text-gray-500 uppercase mb-1">Qualification</p>
                      <p className="font-semibold text-gray-800">{formData.qualification}</p>
                    </div>
                    <div className="bg-white/50 rounded-2xl p-4">
                      <p className="text-xs text-gray-500 uppercase mb-1">License Number</p>
                      <p className="font-semibold text-gray-800">{formData.licenseNumber}</p>
                    </div>
                    <div className="bg-white/50 rounded-2xl p-4">
                      <p className="text-xs text-gray-500 uppercase mb-1">Clinic Name</p>
                      <p className="font-semibold text-gray-800">{formData.clinicName}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mb-8">
                  <p className="text-sm text-yellow-800 mb-2">
                    <strong>Important:</strong> Your profile is now awaiting final approval from our admin team.
                  </p>
                  <p className="text-xs text-yellow-700">
                    You'll receive a confirmation email within 24-48 hours. Once approved, you'll have full access to the doctor dashboard and can start accepting consultations.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <a
                  href="/doctor/dashboard"
                  className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-rose-500 to-orange-400 text-white font-semibold hover:shadow-lg transition-all inline-block"
                >
                  View Doctor Dashboard
                </a>
                <a
                  href="/"
                  className="flex-1 py-3 px-6 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all inline-block"
                >
                  Go Home
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
