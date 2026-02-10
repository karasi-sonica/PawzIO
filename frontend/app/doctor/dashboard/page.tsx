'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Clock, Stethoscope, MessageCircle, X, Printer, Send } from 'lucide-react'
import { useState } from 'react'

// Mock patient data
const mockPatients = [
  {
    id: 1,
    petName: 'Max',
    petType: 'Golden Retriever',
    ownerName: 'John Doe',
    problemSummary: 'Limping, possible injury',
    appointmentTime: '02:30 PM',
    appointmentDate: 'Today',
  },
  {
    id: 2,
    petName: 'Luna',
    petType: 'Cat',
    ownerName: 'Sarah Smith',
    problemSummary: 'Loss of appetite',
    appointmentTime: '03:15 PM',
    appointmentDate: 'Today',
  },
  {
    id: 3,
    petName: 'Buddy',
    petType: 'Labrador',
    ownerName: 'Mike Johnson',
    problemSummary: 'Routine checkup',
    appointmentTime: '04:00 PM',
    appointmentDate: 'Today',
  },
]

export default function DoctorDashboard() {
  const [patients, setPatients] = useState(mockPatients)
  const [selectedPatient, setSelectedPatient] = useState<(typeof mockPatients)[0] | null>(null)
  const [prescription, setPrescription] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSelectPatient = (patient: (typeof mockPatients)[0]) => {
    setSelectedPatient(patient)
    setPrescription('')
  }

  const handleSubmitPrescription = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    // Simulate submission
    setTimeout(() => {
      if (selectedPatient) {
        setPatients(patients.filter(p => p.id !== selectedPatient.id))
        setSelectedPatient(null)
        setPrescription('')
      }
      setSubmitting(false)
    }, 1500)
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
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Doctor Dashboard</h1>
          <p className="text-gray-600">
            {patients.length} patient{patients.length !== 1 ? 's' : ''} awaiting consultation
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Patients List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="glass-effect rounded-3xl p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Stethoscope className="h-5 w-5 text-rose-500" />
                Booked Consultations
              </h2>

              <div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto">
                {patients.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-sm">
                      All consultations completed for today! Great work.
                    </p>
                  </div>
                ) : (
                  patients.map((patient, index) => (
                    <motion.button
                      key={patient.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleSelectPatient(patient)}
                      className={`w-full p-4 rounded-2xl transition-all text-left ${
                        selectedPatient?.id === patient.id
                          ? 'bg-gradient-to-r from-rose-200 to-orange-200 ring-2 ring-rose-500'
                          : 'bg-white/50 hover:bg-white/80'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-gray-800">{patient.petName}</h3>
                          <p className="text-xs text-gray-600">{patient.petType}</p>
                        </div>
                        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-rose-100 text-rose-700">
                          {patient.appointmentTime}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {patient.problemSummary}
                      </p>
                    </motion.button>
                  ))
                )}
              </div>
            </div>
          </motion.div>

          {/* Prescription Area */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {selectedPatient ? (
                <motion.div
                  key="prescription"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  {/* Prescription Header */}
                  <div className="glass-effect rounded-3xl p-8 mb-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800">Prescription</h2>
                        <p className="text-sm text-gray-600">Medical consultation record</p>
                      </div>
                      <button
                        onClick={() => setSelectedPatient(null)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-6 w-6" />
                      </button>
                    </div>

                    {/* Patient Info Card */}
                    <div className="bg-white/50 rounded-2xl p-6 mb-6 grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Pet Name</p>
                        <p className="text-lg font-bold text-gray-800">{selectedPatient.petName}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Pet Type</p>
                        <p className="text-lg font-bold text-gray-800">{selectedPatient.petType}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Owner</p>
                        <p className="text-lg font-bold text-gray-800">{selectedPatient.ownerName}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Problem</p>
                        <p className="text-lg font-bold text-gray-800">{selectedPatient.problemSummary}</p>
                      </div>
                    </div>

                    {/* Prescription Form */}
                    <form onSubmit={handleSubmitPrescription} className="space-y-6">
                      <div>
                        <label className="text-sm font-semibold text-gray-700 block mb-3">
                          Prescription Details
                        </label>
                        <textarea
                          value={prescription}
                          onChange={(e) => setPrescription(e.target.value)}
                          placeholder="Enter prescription details, medications, dosage, frequency, and any special instructions..."
                          className="w-full h-48 px-4 py-3 rounded-2xl border border-gray-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-rose-500 resize-none"
                          required
                        />
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-4">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          type="button"
                          className="flex-1 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 flex items-center justify-center gap-2 transition-all"
                        >
                          <Printer className="h-5 w-5" />
                          Print
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          type="submit"
                          disabled={!prescription.trim() || submitting}
                          className="flex-1 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-orange-400 text-white font-semibold hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2 transition-all"
                        >
                          {submitting ? (
                            <>
                              <div className="animate-spin inline-block">⏳</div>
                              Submitting...
                            </>
                          ) : (
                            <>
                              <Send className="h-5 w-5" />
                              Submit & Complete
                            </>
                          )}
                        </motion.button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass-effect rounded-3xl p-12 text-center"
                >
                  <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    Select a Patient
                  </h3>
                  <p className="text-gray-500">
                    Choose a patient from the list to view their details and write a prescription
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
