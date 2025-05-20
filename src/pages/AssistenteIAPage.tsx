
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageSquare, Bot, ArrowUp } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AssistenteIAPage = () => {
  const [message, setMessage] = useState("");
  
  // SEO optimization
  useEffect(() => {
    document.title = "Assistente IA | LuminaCare - Assistente Médico Inteligente";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", 
        "Assistente médico com inteligência artificial para suporte diagnóstico, sugestões de tratamento e análise de prontuários");
    }
  }, []);

  const chatMessages = [
    { role: "bot", content: "Olá! Sou o assistente médico do LuminaCare. Como posso ajudar hoje?" },
    { role: "user", content: "Preciso de ajuda com sugestões para pacientes com hipertensão." },
    { role: "bot", content: "Com certeza! Para pacientes com hipertensão, além do tratamento medicamentoso, é importante recomendar mudanças no estilo de vida como: redução do consumo de sódio, prática regular de exercícios físicos (pelo menos 150 minutos por semana), redução do consumo de álcool, implementação da dieta DASH rica em frutas e vegetais, monitoramento regular da pressão arterial em casa. Deseja que eu elabore um plano personalizado para algum paciente específico?" },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() === "") return;
    
    // Message would be sent to the IA in a real implementation
    setMessage("");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Assistente IA</h1>
        <p className="text-muted-foreground mt-2">
          Seu assistente médico inteligente para suporte em decisões clínicas.
        </p>
      </div>

      <Tabs defaultValue="chat" className="w-full">
        <TabsList className="mb-4 w-full sm:w-fit">
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Chat
          </TabsTrigger>
          <TabsTrigger value="tools" className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            Ferramentas IA
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="chat">
          <Card className="border-medical-100">
            <CardHeader className="pb-3">
              <CardTitle>Chat com Assistente IA</CardTitle>
              <CardDescription>
                Converse com a IA para obter suporte diagnóstico e sugestões de tratamento
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col h-[calc(100vh-320px)] min-h-[400px]">
              <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                {chatMessages.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                      <Avatar className={`h-8 w-8 ${msg.role === 'user' ? 'bg-medical-100' : 'bg-healing-100'}`}>
                        <AvatarFallback className={msg.role === 'user' ? 'text-medical-800' : 'text-healing-800'}>
                          {msg.role === 'user' ? 'EU' : 'IA'}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`rounded-lg px-4 py-2 text-sm ${
                        msg.role === 'user' 
                          ? 'bg-medical-500 text-white' 
                          : 'bg-muted border'
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              <form className="flex gap-2" onSubmit={handleSendMessage}>
                <Input
                  placeholder="Digite sua mensagem..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" className="gap-2">
                  Enviar
                  <ArrowUp className="h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tools">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="hover:border-medical-200 transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle>Análise de Prontuário</CardTitle>
                <CardDescription>
                  Processamento inteligente de prontuários
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  A IA resume e destaca pontos importantes em prontuários extensos, permitindo que você tenha acesso rápido às informações relevantes.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:border-medical-200 transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle>Suporte Diagnóstico</CardTitle>
                <CardDescription>
                  Sugestões baseadas em dados médicos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Receba sugestões diagnósticas baseadas em sintomas, exames e histórico do paciente, com referências a literatura médica atualizada.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:border-medical-200 transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle>Plano de Tratamento</CardTitle>
                <CardDescription>
                  Criação de planos personalizados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Gere planos de tratamento personalizados considerando o perfil do paciente, comorbidades e medicações em uso.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AssistenteIAPage;
