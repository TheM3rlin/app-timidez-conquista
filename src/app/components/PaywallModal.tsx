"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Check, 
  Crown, 
  Sparkles, 
  Zap,
  Lock,
  X
} from "lucide-react"

interface PaywallModalProps {
  onSubscribe: (plan: 'monthly' | 'yearly') => void
  onClose?: () => void
}

export function PaywallModal({ onSubscribe, onClose }: PaywallModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly')

  const features = [
    "Acesso ilimitado a todos os módulos de treino",
    "Simulador de conversa com IA avançada",
    "Feedback personalizado em tempo real",
    "Grupos de suporte exclusivos",
    "Conteúdo novo toda semana",
    "Acompanhamento de progresso detalhado",
    "Certificados de conquistas",
    "Suporte prioritário"
  ]

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <Card className="border-0 shadow-2xl">
          <CardHeader className="text-center bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 text-white pb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
                <Crown className="w-12 h-12" />
              </div>
            </div>
            <CardTitle className="text-3xl md:text-4xl font-bold mb-2">
              Desbloqueie Todo o Potencial
            </CardTitle>
            <CardDescription className="text-white/90 text-lg">
              Transforme sua confiança e habilidades sociais com acesso completo
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 md:p-8">
            {/* Plans */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {/* Monthly Plan */}
              <div
                onClick={() => setSelectedPlan('monthly')}
                className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedPlan === 'monthly'
                    ? 'border-purple-600 bg-purple-50 shadow-lg scale-105'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">Mensal</h3>
                  {selectedPlan === 'monthly' && (
                    <Badge className="bg-purple-600">Selecionado</Badge>
                  )}
                </div>
                <div className="mb-4">
                  <span className="text-4xl font-bold">R$ 29,90</span>
                  <span className="text-muted-foreground">/mês</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Cancele quando quiser
                </p>
              </div>

              {/* Yearly Plan */}
              <div
                onClick={() => setSelectedPlan('yearly')}
                className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedPlan === 'yearly'
                    ? 'border-purple-600 bg-purple-50 shadow-lg scale-105'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-pink-600">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Economize 50%
                </Badge>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">Anual</h3>
                  {selectedPlan === 'yearly' && (
                    <Badge className="bg-purple-600">Selecionado</Badge>
                  )}
                </div>
                <div className="mb-2">
                  <span className="text-4xl font-bold">R$ 179,90</span>
                  <span className="text-muted-foreground">/ano</span>
                </div>
                <p className="text-sm text-green-600 font-medium">
                  Apenas R$ 14,99/mês
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Economia de R$ 178,90 por ano
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-purple-600" />
                Tudo que você terá acesso:
              </h4>
              <div className="grid md:grid-cols-2 gap-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="bg-green-100 rounded-full p-1 mt-0.5">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <Button
              onClick={() => onSubscribe(selectedPlan)}
              className="w-full h-14 text-lg font-bold bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 hover:opacity-90 transition-opacity"
            >
              <Lock className="w-5 h-5 mr-2" />
              Assinar {selectedPlan === 'monthly' ? 'Plano Mensal' : 'Plano Anual'}
            </Button>

            {/* Trust Badges */}
            <div className="mt-6 text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                ✓ Garantia de 7 dias • ✓ Cancele quando quiser • ✓ Pagamento seguro
              </p>
              <p className="text-xs text-muted-foreground">
                Mais de 10.000 pessoas já transformaram suas vidas
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
