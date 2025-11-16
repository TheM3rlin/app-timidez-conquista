"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Heart, 
  MessageCircle, 
  Target, 
  Trophy, 
  Sparkles, 
  BookOpen,
  Users,
  TrendingUp,
  Zap,
  Award,
  CheckCircle2,
  Crown
} from "lucide-react"
import { DailyTraining } from "./DailyTraining"
import { ChatSimulator } from "./ChatSimulator"
import { SupportGroups } from "./SupportGroups"
import { FreeTrialBanner } from "./FreeTrialBanner"
import { LockedFeatureCard } from "./LockedFeatureCard"

interface DashboardProps {
  userProfile: any
  isPremium?: boolean
  onUpgrade: () => void
}

export function Dashboard({ userProfile, isPremium = false, onUpgrade }: DashboardProps) {
  const [currentLevel, setCurrentLevel] = useState(1)
  const [xp, setXp] = useState(0)
  const [streak, setStreak] = useState(0)
  const [completedChallenges, setCompletedChallenges] = useState(0)
  const [activeTab, setActiveTab] = useState("home")

  const xpToNextLevel = currentLevel * 100
  const progressPercentage = (xp / xpToNextLevel) * 100

  // Limites da versão gratuita
  const FREE_DAILY_LIMIT = 3
  const [dailyUsage, setDailyUsage] = useState(0)
  const canUseFreeFeature = isPremium || dailyUsage < FREE_DAILY_LIMIT

  const achievements = [
    { id: 1, name: "Primeiro Passo", icon: "🎯", unlocked: true },
    { id: 2, name: "Conversador", icon: "💬", unlocked: completedChallenges >= 5 },
    { id: 3, name: "Confiante", icon: "⭐", unlocked: currentLevel >= 3 },
    { id: 4, name: "Persistente", icon: "🔥", unlocked: streak >= 7 },
  ]

  const dailyTips = [
    "Sorria ao falar - isso transmite confiança e simpatia",
    "Faça perguntas abertas para manter a conversa fluindo",
    "Pratique contato visual por 3-5 segundos",
    "Elogie algo específico, não genérico",
    "Respire fundo antes de iniciar uma conversa"
  ]

  const todayTip = dailyTips[new Date().getDay() % dailyTips.length]

  const handleFeatureUse = () => {
    if (!isPremium) {
      setDailyUsage(dailyUsage + 1)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-2 rounded-full">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold">Olá, {userProfile.name}! 👋</h1>
                  {isPremium && (
                    <Badge className="bg-gradient-to-r from-orange-500 to-pink-600">
                      <Crown className="w-3 h-3 mr-1" />
                      Premium
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">Continue sua jornada de crescimento</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {!isPremium && (
                <Button
                  onClick={onUpgrade}
                  size="sm"
                  className="bg-gradient-to-r from-orange-500 to-pink-600 hover:opacity-90"
                >
                  <Crown className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Upgrade</span>
                </Button>
              )}
              <div className="text-right">
                <p className="text-sm font-medium">Nível {currentLevel}</p>
                <p className="text-xs text-muted-foreground">{xp}/{xpToNextLevel} XP</p>
              </div>
              <div className="flex items-center gap-2 bg-orange-100 px-3 py-1 rounded-full">
                <Zap className="w-4 h-4 text-orange-600" />
                <span className="font-bold text-orange-600">{streak} dias</span>
              </div>
            </div>
          </div>
          <Progress value={progressPercentage} className="mt-3 h-2" />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Free Trial Banner */}
        {!isPremium && <FreeTrialBanner onUpgrade={onUpgrade} />}

        {/* Usage Limit Warning */}
        {!isPremium && dailyUsage > 0 && (
          <Card className="mb-6 border-orange-300 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-orange-900">
                  Você usou <strong>{dailyUsage}/{FREE_DAILY_LIMIT}</strong> recursos gratuitos hoje
                </p>
                {!canUseFreeFeature && (
                  <Button
                    onClick={onUpgrade}
                    size="sm"
                    className="bg-gradient-to-r from-orange-500 to-pink-600"
                  >
                    Acesso Ilimitado
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="home" className="gap-2">
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline">Início</span>
            </TabsTrigger>
            <TabsTrigger value="training" className="gap-2">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Treino</span>
            </TabsTrigger>
            <TabsTrigger value="practice" className="gap-2">
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Prática</span>
            </TabsTrigger>
            <TabsTrigger value="community" className="gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Comunidade</span>
            </TabsTrigger>
          </TabsList>

          {/* Home Tab */}
          <TabsContent value="home" className="space-y-6">
            {/* Daily Tip */}
            <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  <CardTitle className="text-white">Dica do Dia</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-lg">{todayTip}</p>
              </CardContent>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Desafios Completos</CardDescription>
                  <CardTitle className="text-3xl">{completedChallenges}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">Continue assim!</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Nível Atual</CardDescription>
                  <CardTitle className="text-3xl">{currentLevel}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-purple-600">
                    <Trophy className="w-4 h-4" />
                    <span className="text-sm">{xpToNextLevel - xp} XP para próximo</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Sequência</CardDescription>
                  <CardTitle className="text-3xl">{streak} dias</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-orange-600">
                    <Zap className="w-4 h-4" />
                    <span className="text-sm">Não perca o ritmo!</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-600" />
                  <CardTitle>Conquistas</CardTitle>
                </div>
                <CardDescription>Suas realizações na jornada</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`p-4 rounded-lg border-2 text-center transition-all ${
                        achievement.unlocked
                          ? "border-purple-600 bg-purple-50"
                          : "border-gray-200 bg-gray-50 opacity-50"
                      }`}
                    >
                      <div className="text-4xl mb-2">{achievement.icon}</div>
                      <p className="text-sm font-medium">{achievement.name}</p>
                      {achievement.unlocked && (
                        <CheckCircle2 className="w-4 h-4 text-green-600 mx-auto mt-2" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {canUseFreeFeature ? (
                <>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveTab("training")}>
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-purple-600" />
                        <CardTitle>Treino Diário</CardTitle>
                      </div>
                      <CardDescription>
                        Aprenda novas técnicas e dicas personalizadas
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600">
                        Começar Treino
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveTab("practice")}>
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <MessageCircle className="w-5 h-5 text-blue-600" />
                        <CardTitle>Simulador de Conversa</CardTitle>
                      </div>
                      <CardDescription>
                        Pratique suas habilidades com IA
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-600">
                        Iniciar Prática
                      </Button>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <>
                  <LockedFeatureCard
                    title="Treino Diário"
                    description="Aprenda novas técnicas e dicas personalizadas"
                    icon={<BookOpen className="w-5 h-5 text-gray-400" />}
                    onUpgrade={onUpgrade}
                  />
                  <LockedFeatureCard
                    title="Simulador de Conversa"
                    description="Pratique suas habilidades com IA"
                    icon={<MessageCircle className="w-5 h-5 text-gray-400" />}
                    onUpgrade={onUpgrade}
                  />
                </>
              )}
            </div>
          </TabsContent>

          {/* Training Tab */}
          <TabsContent value="training">
            {canUseFreeFeature ? (
              <DailyTraining 
                userProfile={userProfile}
                onComplete={(earnedXp) => {
                  handleFeatureUse()
                  setXp(xp + earnedXp)
                  setCompletedChallenges(completedChallenges + 1)
                  if (xp + earnedXp >= xpToNextLevel) {
                    setCurrentLevel(currentLevel + 1)
                    setXp((xp + earnedXp) - xpToNextLevel)
                  }
                }}
              />
            ) : (
              <LockedFeatureCard
                title="Treino Diário Completo"
                description="Acesso ilimitado a todos os módulos de treino e exercícios"
                icon={<BookOpen className="w-5 h-5 text-gray-400" />}
                onUpgrade={onUpgrade}
              />
            )}
          </TabsContent>

          {/* Practice Tab */}
          <TabsContent value="practice">
            {canUseFreeFeature ? (
              <ChatSimulator 
                userProfile={userProfile}
                onComplete={(earnedXp) => {
                  handleFeatureUse()
                  setXp(xp + earnedXp)
                  setStreak(streak + 1)
                }}
              />
            ) : (
              <LockedFeatureCard
                title="Simulador de Conversa com IA"
                description="Pratique conversas ilimitadas com feedback personalizado"
                icon={<MessageCircle className="w-5 h-5 text-gray-400" />}
                onUpgrade={onUpgrade}
              />
            )}
          </TabsContent>

          {/* Community Tab */}
          <TabsContent value="community">
            {isPremium ? (
              <SupportGroups userProfile={userProfile} />
            ) : (
              <LockedFeatureCard
                title="Grupos de Suporte Exclusivos"
                description="Conecte-se com outras pessoas e compartilhe experiências"
                icon={<Users className="w-5 h-5 text-gray-400" />}
                onUpgrade={onUpgrade}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
