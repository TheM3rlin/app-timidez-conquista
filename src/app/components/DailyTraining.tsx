"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Heart, 
  MessageSquare, 
  Eye, 
  Smile,
  CheckCircle2,
  ArrowRight,
  Lightbulb,
  Target
} from "lucide-react"

interface DailyTrainingProps {
  userProfile: any
  onComplete: (xp: number) => void
}

export function DailyTraining({ userProfile, onComplete }: DailyTrainingProps) {
  const [completedModules, setCompletedModules] = useState<string[]>([])
  const [selectedModule, setSelectedModule] = useState<string | null>(null)

  const modules = {
    compliments: {
      title: "Elogios e Cantadas",
      icon: Heart,
      color: "pink",
      difficulty: userProfile.shynessLevel <= 5 ? "Iniciante" : "Intermediário",
      content: {
        tips: [
          "Seja específico: 'Adoro como você sorri quando fala sobre música' é melhor que 'você é bonita'",
          "Observe detalhes: comente sobre algo único que você notou",
          "Seja genuíno: elogios sinceros são sempre melhores",
          "Timing é tudo: escolha o momento certo para elogiar"
        ],
        examples: [
          "Seu jeito de falar sobre [interesse] é contagiante!",
          "Percebi que você tem um ótimo gosto para [algo específico]",
          "Sua energia quando fala sobre [paixão] é inspiradora",
          "Admiro como você [qualidade observada]"
        ],
        exercises: [
          "Pense em 3 elogios específicos que você poderia dar hoje",
          "Pratique dizer um elogio em voz alta olhando no espelho",
          "Identifique algo único em alguém que você conhece"
        ]
      }
    },
    conversation: {
      title: "Iniciar Conversas",
      icon: MessageSquare,
      color: "blue",
      difficulty: "Essencial",
      content: {
        tips: [
          "Use perguntas abertas: 'O que você acha de...' em vez de 'Você gosta de...'",
          "Mostre interesse genuíno: faça perguntas de acompanhamento",
          "Compartilhe também: não apenas pergunte, conte sobre você",
          "Use o contexto: comente sobre o ambiente ou situação"
        ],
        examples: [
          "O que te trouxe aqui hoje?",
          "Como você conheceu [pessoa/lugar]?",
          "Qual é a história por trás de [algo interessante]?",
          "O que você tem feito ultimamente que te deixa animado?"
        ],
        exercises: [
          "Liste 5 perguntas abertas que você poderia usar",
          "Pratique transformar perguntas fechadas em abertas",
          "Pense em 3 formas de iniciar conversa em diferentes contextos"
        ]
      }
    },
    bodyLanguage: {
      title: "Linguagem Corporal",
      icon: Eye,
      color: "purple",
      difficulty: "Intermediário",
      content: {
        tips: [
          "Mantenha contato visual por 3-5 segundos, depois desvie naturalmente",
          "Postura aberta: ombros relaxados, braços descruzados",
          "Sorria genuinamente: envolve os olhos, não apenas a boca",
          "Espelhe sutilmente: copie levemente a linguagem corporal da pessoa"
        ],
        examples: [
          "Ao ouvir: incline-se levemente para frente mostrando interesse",
          "Ao falar: use gestos naturais das mãos para enfatizar",
          "Ao concordar: acene com a cabeça suavemente",
          "Ao rir: deixe ser natural e contagiante"
        ],
        exercises: [
          "Pratique contato visual no espelho por 30 segundos",
          "Observe sua postura ao longo do dia e corrija",
          "Grave um vídeo de você falando e analise sua linguagem corporal"
        ]
      }
    },
    confidence: {
      title: "Controle da Ansiedade",
      icon: Smile,
      color: "green",
      difficulty: "Fundamental",
      content: {
        tips: [
          "Respiração 4-7-8: inspire por 4s, segure por 7s, expire por 8s",
          "Visualização positiva: imagine a conversa indo bem antes de começar",
          "Aceite o nervosismo: é normal e pode até ser charmoso",
          "Foque no outro: tire o foco de si mesmo e concentre-se na pessoa"
        ],
        examples: [
          "Antes de falar: respire fundo 3 vezes lentamente",
          "Durante ansiedade: aperte e relaxe os punhos discretamente",
          "Se gaguejar: sorria e continue, não se desculpe excessivamente",
          "Se ficar em branco: 'Deixa eu pensar melhor...' é perfeitamente ok"
        ],
        exercises: [
          "Pratique a respiração 4-7-8 por 2 minutos diariamente",
          "Escreva 3 afirmações positivas sobre suas habilidades sociais",
          "Visualize uma conversa bem-sucedida por 5 minutos"
        ]
      }
    }
  }

  const handleCompleteModule = (moduleKey: string) => {
    if (!completedModules.includes(moduleKey)) {
      setCompletedModules([...completedModules, moduleKey])
      onComplete(25) // 25 XP por módulo
    }
  }

  const ModuleCard = ({ moduleKey, module }: { moduleKey: string; module: any }) => {
    const Icon = module.icon
    const isCompleted = completedModules.includes(moduleKey)
    const colorClasses = {
      pink: "from-pink-500 to-rose-500",
      blue: "from-blue-500 to-cyan-500",
      purple: "from-purple-500 to-pink-500",
      green: "from-green-500 to-emerald-500"
    }

    return (
      <Card 
        className={`cursor-pointer transition-all hover:shadow-lg ${
          isCompleted ? "border-green-500 bg-green-50" : ""
        }`}
        onClick={() => setSelectedModule(moduleKey)}
      >
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={`bg-gradient-to-r ${colorClasses[module.color as keyof typeof colorClasses]} p-3 rounded-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">{module.title}</CardTitle>
                <CardDescription>{module.difficulty}</CardDescription>
              </div>
            </div>
            {isCompleted && (
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            )}
          </div>
        </CardHeader>
        <CardContent>
          <Button 
            variant={isCompleted ? "outline" : "default"}
            className="w-full"
          >
            {isCompleted ? "Revisar" : "Começar"} <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (selectedModule) {
    const module = modules[selectedModule as keyof typeof modules]
    const Icon = module.icon
    const isCompleted = completedModules.includes(selectedModule)

    return (
      <div className="space-y-6">
        <Button 
          variant="ghost" 
          onClick={() => setSelectedModule(null)}
          className="mb-4"
        >
          ← Voltar aos Módulos
        </Button>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className={`bg-gradient-to-r from-${module.color}-500 to-${module.color}-600 p-3 rounded-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">{module.title}</CardTitle>
                <CardDescription>Nível: {module.difficulty}</CardDescription>
              </div>
            </div>
            {isCompleted && (
              <Badge className="w-fit bg-green-600">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Concluído
              </Badge>
            )}
          </CardHeader>
        </Card>

        <Tabs defaultValue="tips" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tips">Dicas</TabsTrigger>
            <TabsTrigger value="examples">Exemplos</TabsTrigger>
            <TabsTrigger value="exercises">Exercícios</TabsTrigger>
          </TabsList>

          <TabsContent value="tips" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-600" />
                  <CardTitle>Dicas Práticas</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    {module.content.tips.map((tip: string, index: number) => (
                      <div key={index} className="flex gap-3 p-4 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                          {index + 1}
                        </div>
                        <p className="flex-1 text-sm leading-relaxed">{tip}</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="examples" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                  <CardTitle>Exemplos Práticos</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-3">
                    {module.content.examples.map((example: string, index: number) => (
                      <div key={index} className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                        <p className="text-sm font-medium text-blue-900">{example}</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="exercises" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-600" />
                  <CardTitle>Exercícios Práticos</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    {module.content.exercises.map((exercise: string, index: number) => (
                      <div key={index} className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {index + 1}
                          </div>
                          <p className="flex-1 text-sm">{exercise}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold mb-1">
                  {isCompleted ? "Módulo Concluído!" : "Complete este módulo"}
                </p>
                <p className="text-sm opacity-90">
                  {isCompleted ? "Você ganhou 25 XP" : "Ganhe 25 XP ao concluir"}
                </p>
              </div>
              <Button
                onClick={() => handleCompleteModule(selectedModule)}
                disabled={isCompleted}
                className="bg-white text-purple-600 hover:bg-gray-100"
              >
                {isCompleted ? "Concluído" : "Marcar como Concluído"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Treino Diário</CardTitle>
          <CardDescription>
            Complete os módulos para ganhar XP e melhorar suas habilidades
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(modules).map(([key, module]) => (
          <ModuleCard key={key} moduleKey={key} module={module} />
        ))}
      </div>

      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <Lightbulb className="w-8 h-8 text-blue-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-lg mb-2">Dica de Progresso</h3>
              <p className="text-sm text-muted-foreground">
                Complete pelo menos um módulo por dia para manter sua sequência ativa. 
                Quanto mais você pratica, mais confiante você se torna!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
