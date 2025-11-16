"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Users, 
  Heart, 
  MessageSquare,
  BookOpen,
  Video,
  Headphones,
  TrendingUp,
  Star,
  Play
} from "lucide-react"

interface SupportGroupsProps {
  userProfile: any
}

export function SupportGroups({ userProfile }: SupportGroupsProps) {
  const [joinedGroups, setJoinedGroups] = useState<string[]>([])

  const groups = [
    {
      id: "beginners",
      name: "Iniciantes na Conquista",
      members: 1247,
      category: "Suporte",
      description: "Grupo para quem está começando a jornada de superar a timidez",
      topics: ["Primeiros passos", "Compartilhar experiências", "Dúvidas básicas"],
      icon: Users,
      color: "blue"
    },
    {
      id: "success",
      name: "Histórias de Sucesso",
      members: 892,
      category: "Motivação",
      description: "Compartilhe e inspire-se com histórias reais de superação",
      topics: ["Conquistas", "Antes e depois", "Inspiração"],
      icon: Star,
      color: "yellow"
    },
    {
      id: "anxiety",
      name: "Lidando com Ansiedade",
      members: 1534,
      category: "Suporte",
      description: "Técnicas e apoio para controlar a ansiedade social",
      topics: ["Técnicas de respiração", "Mindfulness", "Apoio emocional"],
      icon: Heart,
      color: "pink"
    },
    {
      id: "practice",
      name: "Grupo de Prática",
      members: 678,
      category: "Prática",
      description: "Pratique conversação em um ambiente seguro e acolhedor",
      topics: ["Role-play", "Feedback construtivo", "Exercícios em grupo"],
      icon: MessageSquare,
      color: "purple"
    }
  ]

  const resources = [
    {
      id: 1,
      title: "Como Superar a Timidez em 30 Dias",
      type: "Artigo",
      duration: "10 min",
      category: "Leitura",
      icon: BookOpen,
      color: "blue"
    },
    {
      id: 2,
      title: "Técnicas de Respiração para Ansiedade",
      type: "Vídeo",
      duration: "15 min",
      category: "Vídeo",
      icon: Video,
      color: "red"
    },
    {
      id: 3,
      title: "Podcast: Histórias de Transformação",
      type: "Áudio",
      duration: "45 min",
      category: "Áudio",
      icon: Headphones,
      color: "purple"
    },
    {
      id: 4,
      title: "Linguagem Corporal Efetiva",
      type: "Artigo",
      duration: "8 min",
      category: "Leitura",
      icon: BookOpen,
      color: "green"
    },
    {
      id: 5,
      title: "Masterclass: Conversação Natural",
      type: "Vídeo",
      duration: "30 min",
      category: "Vídeo",
      icon: Video,
      color: "orange"
    },
    {
      id: 6,
      title: "Meditação Guiada para Confiança",
      type: "Áudio",
      duration: "20 min",
      category: "Áudio",
      icon: Headphones,
      color: "indigo"
    }
  ]

  const motivationalContent = [
    {
      id: 1,
      quote: "A confiança não vem de sempre estar certo, mas de não ter medo de estar errado.",
      author: "Anônimo"
    },
    {
      id: 2,
      quote: "Cada conversa é uma oportunidade de crescimento. Não tenha medo de começar.",
      author: "Comunidade ConfiançaMatch"
    },
    {
      id: 3,
      quote: "A timidez é temporária. A coragem que você desenvolve é permanente.",
      author: "Especialista em Desenvolvimento Pessoal"
    },
    {
      id: 4,
      quote: "Você não precisa ser perfeito para ser interessante. Seja autêntico.",
      author: "Coach de Relacionamentos"
    }
  ]

  const handleJoinGroup = (groupId: string) => {
    if (joinedGroups.includes(groupId)) {
      setJoinedGroups(joinedGroups.filter(id => id !== groupId))
    } else {
      setJoinedGroups([...joinedGroups, groupId])
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Users className="w-6 h-6 text-purple-600" />
            Comunidade e Suporte
          </CardTitle>
          <CardDescription>
            Conecte-se com outras pessoas, aprenda e cresça junto
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="groups" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="groups">Grupos</TabsTrigger>
          <TabsTrigger value="resources">Recursos</TabsTrigger>
          <TabsTrigger value="motivation">Motivação</TabsTrigger>
        </TabsList>

        {/* Groups Tab */}
        <TabsContent value="groups" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {groups.map((group) => {
              const Icon = group.icon
              const isJoined = joinedGroups.includes(group.id)
              
              return (
                <Card key={group.id} className={isJoined ? "border-purple-500 bg-purple-50" : ""}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`bg-${group.color}-100 p-3 rounded-lg`}>
                          <Icon className={`w-6 h-6 text-${group.color}-600`} />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{group.name}</CardTitle>
                          <CardDescription className="text-xs">
                            {group.members.toLocaleString()} membros
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline">{group.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{group.description}</p>
                    
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground">Tópicos principais:</p>
                      <div className="flex flex-wrap gap-2">
                        {group.topics.map((topic, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button
                      onClick={() => handleJoinGroup(group.id)}
                      className={`w-full ${
                        isJoined
                          ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          : "bg-gradient-to-r from-purple-500 to-pink-500"
                      }`}
                    >
                      {isJoined ? "Sair do Grupo" : "Participar"}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {joinedGroups.length > 0 && (
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                  <div>
                    <h3 className="font-semibold text-lg">Parabéns!</h3>
                    <p className="text-sm text-muted-foreground">
                      Você está participando de {joinedGroups.length} grupo(s). 
                      Continue engajado para acelerar seu crescimento!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Biblioteca de Recursos</CardTitle>
              <CardDescription>
                Conteúdos selecionados para seu desenvolvimento
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {resources.map((resource) => {
              const Icon = resource.icon
              
              return (
                <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <div className={`bg-${resource.color}-100 p-2 rounded-lg`}>
                        <Icon className={`w-5 h-5 text-${resource.color}-600`} />
                      </div>
                      <div className="flex-1">
                        <Badge variant="outline" className="mb-2 text-xs">
                          {resource.category}
                        </Badge>
                        <CardTitle className="text-base leading-tight">
                          {resource.title}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{resource.type}</span>
                      <span>{resource.duration}</span>
                    </div>
                    <Button className="w-full" variant="outline">
                      <Play className="w-4 h-4 mr-2" />
                      Acessar
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* Motivation Tab */}
        <TabsContent value="motivation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Conteúdo Motivacional</CardTitle>
              <CardDescription>
                Inspire-se e mantenha-se motivado em sua jornada
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {motivationalContent.map((content) => (
              <Card 
                key={content.id}
                className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200"
              >
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="text-4xl text-purple-600">"</div>
                    <p className="text-lg font-medium italic leading-relaxed">
                      {content.quote}
                    </p>
                    <p className="text-sm text-muted-foreground text-right">
                      — {content.author}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <Star className="w-12 h-12 mx-auto" />
                <h3 className="text-2xl font-bold">Você está no caminho certo!</h3>
                <p className="text-lg opacity-90">
                  Cada passo que você dá é uma vitória. Continue praticando, 
                  continue crescendo, e lembre-se: você é capaz de muito mais do que imagina.
                </p>
                <div className="flex justify-center gap-4 pt-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold">{userProfile.name}</p>
                    <p className="text-sm opacity-80">Você é incrível!</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dicas de Autoestima</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-semibold mb-2">Celebre Pequenas Vitórias</h4>
                    <p className="text-sm text-muted-foreground">
                      Cada conversa iniciada, cada sorriso compartilhado é uma conquista. 
                      Reconheça seu progresso, por menor que pareça.
                    </p>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                    <h4 className="font-semibold mb-2">Pratique Autocompaixão</h4>
                    <p className="text-sm text-muted-foreground">
                      Seja gentil consigo mesmo. Todos cometem erros e têm momentos difíceis. 
                      O importante é continuar tentando.
                    </p>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                    <h4 className="font-semibold mb-2">Foque no Progresso, Não na Perfeição</h4>
                    <p className="text-sm text-muted-foreground">
                      Você não precisa ser perfeito. O objetivo é melhorar um pouco a cada dia, 
                      não ser impecável desde o início.
                    </p>
                  </div>

                  <div className="p-4 bg-pink-50 rounded-lg border-l-4 border-pink-500">
                    <h4 className="font-semibold mb-2">Lembre-se: Você Não Está Sozinho</h4>
                    <p className="text-sm text-muted-foreground">
                      Milhares de pessoas passam pela mesma jornada. Compartilhar experiências 
                      e apoiar uns aos outros torna tudo mais fácil.
                    </p>
                  </div>

                  <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                    <h4 className="font-semibold mb-2">Visualize Seu Sucesso</h4>
                    <p className="text-sm text-muted-foreground">
                      Dedique alguns minutos por dia para imaginar-se confiante e bem-sucedido 
                      em situações sociais. A visualização é uma ferramenta poderosa.
                    </p>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
