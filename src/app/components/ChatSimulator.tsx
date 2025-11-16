"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  MessageCircle, 
  Send, 
  RotateCcw,
  Sparkles,
  ThumbsUp,
  ThumbsDown,
  Lightbulb
} from "lucide-react"

interface ChatSimulatorProps {
  userProfile: any
  onComplete: (xp: number) => void
}

interface Message {
  id: number
  sender: "user" | "ai"
  text: string
  feedback?: "good" | "improve"
  suggestion?: string
}

export function ChatSimulator({ userProfile, onComplete }: ChatSimulatorProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "ai",
      text: "Oi! Prazer em conhecer você. Como está seu dia?"
    }
  ])
  const [input, setInput] = useState("")
  const [scenario, setScenario] = useState("casual")
  const [conversationCount, setConversationCount] = useState(0)

  const scenarios = {
    casual: {
      name: "Conversa Casual",
      description: "Pratique uma conversa descontraída",
      persona: "uma pessoa amigável em um café"
    },
    romantic: {
      name: "Interesse Romântico",
      description: "Pratique demonstrar interesse",
      persona: "alguém que você acha interessante"
    },
    professional: {
      name: "Networking",
      description: "Pratique conversa profissional",
      persona: "um colega de trabalho"
    },
    group: {
      name: "Grupo Social",
      description: "Pratique em contexto de grupo",
      persona: "alguém em um evento social"
    }
  }

  const getAIResponse = (userMessage: string): { text: string; feedback: "good" | "improve"; suggestion?: string } => {
    const lowerMessage = userMessage.toLowerCase()
    
    // Análise simples da mensagem
    const isQuestion = userMessage.includes("?")
    const isShort = userMessage.split(" ").length < 3
    const hasEmoji = /[\u{1F600}-\u{1F64F}]/u.test(userMessage)
    const isPersonal = lowerMessage.includes("você") || lowerMessage.includes("seu") || lowerMessage.includes("sua")
    
    let feedback: "good" | "improve" = "good"
    let suggestion = ""
    let response = ""

    // Feedback baseado na qualidade da mensagem
    if (isShort && !isQuestion) {
      feedback = "improve"
      suggestion = "Tente elaborar mais sua resposta. Mensagens muito curtas podem parecer desinteressadas."
      response = "Entendo... Pode me contar mais sobre isso?"
    } else if (!isPersonal && conversationCount > 2) {
      feedback = "improve"
      suggestion = "Mostre mais interesse na outra pessoa fazendo perguntas sobre ela."
      response = "Sim, interessante! E você, o que gosta de fazer?"
    } else if (isQuestion && isPersonal) {
      feedback = "good"
      suggestion = "Ótimo! Perguntas pessoais demonstram interesse genuíno."
      response = "Que legal que você perguntou! Eu adoro [atividade]. E você, tem algum hobby?"
    } else {
      feedback = "good"
      response = "Que interessante! Conte-me mais sobre isso."
    }

    // Respostas contextuais baseadas no cenário
    if (scenario === "romantic") {
      if (lowerMessage.includes("bonit") || lowerMessage.includes("lind")) {
        feedback = "good"
        suggestion = "Elogios são ótimos! Lembre-se de ser específico e genuíno."
        response = "Obrigado(a)! Você é muito gentil. 😊"
      }
    }

    if (scenario === "professional") {
      if (lowerMessage.includes("trabalh") || lowerMessage.includes("profiss")) {
        feedback = "good"
        suggestion = "Perfeito! Manter o foco profissional é importante neste contexto."
        response = "Sim, trabalho com [área]. É um campo muito interessante!"
      }
    }

    return { text: response, feedback, suggestion }
  }

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      sender: "user",
      text: input
    }

    const aiResponseData = getAIResponse(input)
    const aiMessage: Message = {
      id: messages.length + 2,
      sender: "ai",
      text: aiResponseData.text,
      feedback: aiResponseData.feedback,
      suggestion: aiResponseData.suggestion
    }

    setMessages([...messages, userMessage, aiMessage])
    setInput("")
    setConversationCount(conversationCount + 1)

    // Dar XP a cada 5 mensagens
    if (conversationCount > 0 && conversationCount % 5 === 0) {
      onComplete(15)
    }
  }

  const handleReset = () => {
    setMessages([
      {
        id: 1,
        sender: "ai",
        text: `Oi! Prazer em conhecer você. Sou ${scenarios[scenario as keyof typeof scenarios].persona}. Como está seu dia?`
      }
    ])
    setConversationCount(0)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <MessageCircle className="w-6 h-6 text-purple-600" />
            Simulador de Conversa
          </CardTitle>
          <CardDescription>
            Pratique suas habilidades de conversação em um ambiente seguro
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Scenario Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Escolha o Cenário</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(scenarios).map(([key, s]) => (
              <Button
                key={key}
                variant={scenario === key ? "default" : "outline"}
                onClick={() => {
                  setScenario(key)
                  handleReset()
                }}
                className="h-auto flex-col items-start p-4"
              >
                <span className="font-semibold text-sm">{s.name}</span>
                <span className="text-xs opacity-80 mt-1">{s.description}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <Card className="h-[600px] flex flex-col">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  AI
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">
                  {scenarios[scenario as keyof typeof scenarios].name}
                </CardTitle>
                <CardDescription className="text-xs">
                  Simulação com IA
                </CardDescription>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reiniciar
            </Button>
          </div>
        </CardHeader>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="space-y-2">
                <div
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === "user"
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>

                {message.feedback && message.sender === "ai" && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%]">
                      <Badge
                        variant="outline"
                        className={
                          message.feedback === "good"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-orange-50 text-orange-700 border-orange-200"
                        }
                      >
                        {message.feedback === "good" ? (
                          <ThumbsUp className="w-3 h-3 mr-1" />
                        ) : (
                          <ThumbsDown className="w-3 h-3 mr-1" />
                        )}
                        {message.feedback === "good" ? "Boa resposta!" : "Pode melhorar"}
                      </Badge>
                      {message.suggestion && (
                        <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="flex items-start gap-2">
                            <Lightbulb className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                            <p className="text-xs text-blue-900">{message.suggestion}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>

        <CardContent className="border-t p-4">
          <div className="flex gap-2">
            <Input
              placeholder="Digite sua mensagem..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim()}
              className="bg-gradient-to-r from-purple-500 to-pink-500"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Ganhe 15 XP a cada 5 mensagens enviadas
          </p>
        </CardContent>
      </Card>

      {/* Tips Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <Lightbulb className="w-8 h-8 text-blue-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-lg mb-2">Dicas para Praticar</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Faça perguntas abertas para manter a conversa fluindo</li>
                <li>• Mostre interesse genuíno nas respostas</li>
                <li>• Compartilhe também sobre você, não apenas pergunte</li>
                <li>• Use emojis com moderação para transmitir emoção</li>
                <li>• Preste atenção no feedback para melhorar</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
