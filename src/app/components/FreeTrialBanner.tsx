"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Crown, Clock } from "lucide-react"

interface FreeTrialBannerProps {
  onUpgrade: () => void
}

export function FreeTrialBanner({ onUpgrade }: FreeTrialBannerProps) {
  return (
    <Card className="border-2 border-orange-500 bg-gradient-to-r from-orange-50 to-pink-50 mb-6">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-orange-500 p-2 rounded-full">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-orange-900">Versão Gratuita Limitada</p>
              <p className="text-sm text-orange-700">
                Desbloqueie todos os recursos e acelere seu progresso
              </p>
            </div>
          </div>
          <Button
            onClick={onUpgrade}
            className="bg-gradient-to-r from-orange-500 to-pink-600 hover:opacity-90 whitespace-nowrap"
          >
            <Crown className="w-4 h-4 mr-2" />
            Fazer Upgrade
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
