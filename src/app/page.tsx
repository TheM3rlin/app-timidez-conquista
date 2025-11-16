"use client"

import { useState } from "react"
import { Onboarding } from "./components/Onboarding"
import { Dashboard } from "./components/Dashboard"
import { PaywallModal } from "./components/PaywallModal"

export default function Home() {
  const [userProfile, setUserProfile] = useState<any>(null)
  const [isPremium, setIsPremium] = useState(false)
  const [showPaywall, setShowPaywall] = useState(false)

  const handleSubscribe = (plan: 'monthly' | 'yearly') => {
    // Aqui você integraria com seu sistema de pagamento (Stripe, Mercado Pago, etc)
    console.log(`Usuário escolheu o plano: ${plan}`)
    
    // Simulando sucesso da assinatura
    setIsPremium(true)
    setShowPaywall(false)
    
    // Em produção, você redirecionaria para o checkout:
    // window.location.href = `/checkout?plan=${plan}`
  }

  // Mostrar paywall após onboarding
  if (userProfile && !isPremium && !showPaywall) {
    setShowPaywall(true)
  }

  if (!userProfile) {
    return <Onboarding onComplete={setUserProfile} />
  }

  return (
    <>
      <Dashboard userProfile={userProfile} isPremium={isPremium} onUpgrade={() => setShowPaywall(true)} />
      {showPaywall && !isPremium && (
        <PaywallModal onSubscribe={handleSubscribe} />
      )}
    </>
  )
}
