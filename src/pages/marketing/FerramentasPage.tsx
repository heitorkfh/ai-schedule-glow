
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FerramentasPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Ferramentas de Marketing</h1>
        <p className="text-muted-foreground">
          Ferramentas avançadas para suas campanhas de marketing
        </p>
      </div>
      
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Funcionalidade em desenvolvimento</AlertTitle>
        <AlertDescription>
          Esta seção está sendo implementada e estará disponível em breve.
        </AlertDescription>
      </Alert>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-muted/40">
          <CardHeader className="pb-2">
            <CardTitle>Automações</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Automatize o envio de mensagens baseado em eventos ou cronogramas.
              <span className="block mt-2 text-xs opacity-70">Em breve</span>
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-muted/40">
          <CardHeader className="pb-2">
            <CardTitle>Templates de Mensagem</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Crie modelos reutilizáveis para suas campanhas de marketing.
              <span className="block mt-2 text-xs opacity-70">Em breve</span>
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-muted/40">
          <CardHeader className="pb-2">
            <CardTitle>Segmentação de Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Segmente seus leads em grupos para mensagens personalizadas.
              <span className="block mt-2 text-xs opacity-70">Em breve</span>
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-muted/40">
          <CardHeader className="pb-2">
            <CardTitle>Análise de Campanhas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Visualize métricas e resultados das suas campanhas de marketing.
              <span className="block mt-2 text-xs opacity-70">Em breve</span>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FerramentasPage;
