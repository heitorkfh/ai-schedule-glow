
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WhatsAppPanel from "@/components/configuracoes/WhatsAppPanel";

const ConfiguracoesPage = () => {
  // SEO optimization
  useEffect(() => {
    document.title = "Configurações | LuminaCare - Sistema de Gestão Médica";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", 
        "Configure seu sistema de gestão médica LuminaCare para atender às necessidades específicas da sua clínica");
    }
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground mt-2">
          Personalize as configurações do seu sistema LuminaCare.
        </p>
      </div>

      <Tabs defaultValue="geral" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="geral">Geral</TabsTrigger>
          <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
          <TabsTrigger value="integracao">Integrações</TabsTrigger>
        </TabsList>
        
        <TabsContent value="geral" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Gerais</CardTitle>
              <CardDescription>
                Ajuste as preferências gerais do sistema de acordo com suas necessidades
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="py-20 text-center text-muted-foreground">
                Configurações gerais a serem implementadas.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="whatsapp" className="space-y-4">
          <WhatsAppPanel />
        </TabsContent>
        
        <TabsContent value="integracao" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Outras Integrações</CardTitle>
              <CardDescription>
                Configure integrações com outros sistemas e serviços
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="py-20 text-center text-muted-foreground">
                Outras integrações a serem implementadas.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConfiguracoesPage;
