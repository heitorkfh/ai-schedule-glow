
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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

      <Card>
        <CardHeader>
          <CardTitle>Configurações do Sistema</CardTitle>
          <CardDescription>
            Ajuste as preferências do sistema de acordo com suas necessidades
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="py-20 text-center text-muted-foreground">
            Configurações a serem implementadas.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfiguracoesPage;
