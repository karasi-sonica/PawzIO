'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AuthModal from './AuthModal'
import LandingContent from './LandingContent'

export default function AuthGate() {
  const [authOpen, setAuthOpen] = useState(true)
  const router = useRouter()

  useEffect(() => {
    setAuthOpen(true)
  }, [])

  const handleAuthClose = () => {
    setAuthOpen(false)
    // Simulate successful auth and redirect to role selection
    // In a real app, this would check auth state
    setTimeout(() => {
      router.push('/role-selection')
    }, 500)
  }

  return (
    <>
      <LandingContent />
      <AuthModal open={authOpen} onClose={handleAuthClose} />
    </>
  )
}