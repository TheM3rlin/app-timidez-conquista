"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Heart, MessageCircle, Users, Sparkles } from "lucide-react"

interface OnboardingProps {
  onComplete: (profile: any) => void
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1)
  const [profile, setProfile] = useState({
    name: "",
    age: "",
    shynessLevel: 5,
    interests: [] as string[],
    communicationStyle: "",
    goals: [] as string[],
    difficulties: [] as string[]
  })

  const interestOptions = [
    "Música", "Filmes", "Esportes", "Viagens", "Culinária", 
    "Leitura", "Arte", "Tecnologia", "Natureza", "Jogos"
  ]

  const goalOptions = [
    "Fazer novos amigos",
    "Encontrar um relacionamento",
    "Melhorar confiança social",
    "Superar timidez",
    "Aprender a conversar melhor"
  ]

  const difficultyOptions = [
    "Iniciar conversas",
    "Manter contato visual",
    "Falar em público",
    "Expressar sentimentos",
    "Lidar com rejeição"
  ]

  const toggleArrayItem = (array: string[], item: string) => {
    return array.includes(item)
      ? array.filter(i => i !== item)
      : [...array, item]
  }

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1)
    } else {
      onComplete(profile)
    }
  }

  const canProceed = () => {
    switch (step) {
      case 1:
        return profile.name && profile.age
      case 2:
        return profile.interests.length > 0
      case 3:
        return profile.goals.length > 0
      case 4:
        return profile.difficulties.length > 0
      default:
        return true
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-2xl">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-4 rounded-full">
              <Heart className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Bem-vindo ao ConfiançaMatch
          </CardTitle>
          <CardDescription className="text-base">
            Vamos conhecer você melhor para personalizar sua jornada
          </CardDescription>
          <div className="flex justify-center gap-2 pt-4">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-2 w-12 rounded-full transition-all ${
                  s <= step ? "bg-gradient-to-r from-pink-500 to-purple-600" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pt-6">
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="text-center mb-6">
                <MessageCircle className="w-12 h-12 mx-auto text-purple-600 mb-2" />
                <h3 className="text-xl font-semibold">Informações Básicas</h3>
                <p className="text-sm text-muted-foreground">Conte-nos um pouco sobre você</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="name">Como você gostaria de ser chamado?</Label>
                <Input
                  id="name"
                  placeholder="Seu nome"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="text-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Qual sua idade?</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="18"
                  value={profile.age}
                  onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                  className="text-lg"
                />
              </div>

              <div className="space-y-4">
                <Label>Como você avalia seu nível de timidez?</Label>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">Pouco</span>
                  <Slider
                    value={[profile.shynessLevel]}
                    onValueChange={(value) => setProfile({ ...profile, shynessLevel: value[0] })}
                    max={10}
                    min={1}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-sm text-muted-foreground">Muito</span>
                </div>
                <p className="text-center text-2xl font-bold text-purple-600">{profile.shynessLevel}/10</p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="text-center mb-6">
                <Sparkles className="w-12 h-12 mx-auto text-purple-600 mb-2" />
                <h3 className="text-xl font-semibold">Seus Interesses</h3>
                <p className="text-sm text-muted-foreground">Selecione o que você gosta (mínimo 1)</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {interestOptions.map((interest) => (
                  <div
                    key={interest}
                    className={`flex items-center space-x-2 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      profile.interests.includes(interest)
                        ? "border-purple-600 bg-purple-50"
                        : "border-gray-200 hover:border-purple-300"
                    }`}
                    onClick={() =>
                      setProfile({
                        ...profile,
                        interests: toggleArrayItem(profile.interests, interest)
                      })
                    }
                  >
                    <Checkbox
                      checked={profile.interests.includes(interest)}
                      onCheckedChange={() => {}}
                    />
                    <label className="cursor-pointer flex-1">{interest}</label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="text-center mb-6">
                <Users className="w-12 h-12 mx-auto text-purple-600 mb-2" />
                <h3 className="text-xl font-semibold">Seus Objetivos</h3>
                <p className="text-sm text-muted-foreground">O que você busca? (mínimo 1)</p>
              </div>

              <div className="space-y-3">
                {goalOptions.map((goal) => (
                  <div
                    key={goal}
                    className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      profile.goals.includes(goal)
                        ? "border-purple-600 bg-purple-50"
                        : "border-gray-200 hover:border-purple-300"
                    }`}
                    onClick={() =>
                      setProfile({
                        ...profile,
                        goals: toggleArrayItem(profile.goals, goal)
                      })
                    }
                  >
                    <Checkbox
                      checked={profile.goals.includes(goal)}
                      onCheckedChange={() => {}}
                    />
                    <label className="cursor-pointer flex-1 text-base">{goal}</label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="text-center mb-6">
                <Heart className="w-12 h-12 mx-auto text-purple-600 mb-2" />
                <h3 className="text-xl font-semibold">Suas Dificuldades</h3>
                <p className="text-sm text-muted-foreground">
                  Onde você precisa de mais ajuda? (mínimo 1)
                </p>
              </div>

              <div className="space-y-3">
                {difficultyOptions.map((difficulty) => (
                  <div
                    key={difficulty}
                    className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      profile.difficulties.includes(difficulty)
                        ? "border-purple-600 bg-purple-50"
                        : "border-gray-200 hover:border-purple-300"
                    }`}
                    onClick={() =>
                      setProfile({
                        ...profile,
                        difficulties: toggleArrayItem(profile.difficulties, difficulty)
                      })
                    }
                  >
                    <Checkbox
                      checked={profile.difficulties.includes(difficulty)}
                      onCheckedChange={() => {}}
                    />
                    <label className="cursor-pointer flex-1 text-base">{difficulty}</label>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-6">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
                className="flex-1"
              >
                Voltar
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
            >
              {step === 4 ? "Começar Jornada" : "Próximo"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
