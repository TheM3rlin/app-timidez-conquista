"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lock, Crown } from "lucide-react"

interface LockedFeatureCardProps {
  title: string
  description: string
  icon: React.ReactNode
  onUpgrade: () => void
}

export function LockedFeatureCard({ title, description, icon, onUpgrade }: LockedFeatureCardProps) {
  return (
    <Card className="relative overflow-hidden border-2 border-dashed border-gray-300 bg-gray-50/50">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5" />
      <div className="absolute top-4 right-4">
        <div className="bg-gradient-to-r from-orange-500 to-pink-600 p-2 rounded-full">
          <Lock className="w-4 h-4 text-white" />
        </div>
      </div>
      <CardHeader className="relative">
        <div className="flex items-center gap-2 opacity-60">
          {icon}
          <CardTitle className="text-gray-600">{title}</CardTitle>
        </div>
        <CardDescription className="text-gray-500">{description}</CardDescription>
      </CardHeader>
      <CardContent className="relative">
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
        </div>
        <Button
          onClick={onUpgrade}
          className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90"
        >
          <Crown className="w-4 h-4 mr-2" />
          Desbloquear Recurso
        </Button>
      </CardContent>
    </Card>
  )
}
