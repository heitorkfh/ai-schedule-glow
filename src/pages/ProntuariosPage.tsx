
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ProntuariosPage = () => {
  // SEO optimization
  useEffect(() => {
    document.title = "Prontuários | LuminaCare - Sistema de Prontuário Eletrônico";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", 
        "Sistema eletrônico de prontuários médicos com processamento de IA para identificação de padrões e histórico completo");
    }
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Prontuários</h1>
        <p className="text-muted-foreground mt-2">
          Gerenciamento de históricos e prontuários médicos.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Prontuários Eletrônicos</CardTitle>
          <CardDescription>
            Acesso ao histórico médico completo dos pacientes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="py-20 text-center text-muted-foreground">
            Conteúdo de prontuários a ser implementado.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProntuariosPage;
