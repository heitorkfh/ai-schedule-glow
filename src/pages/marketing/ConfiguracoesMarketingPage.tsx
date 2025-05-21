
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const ConfiguracoesMarketingPage = () => {
  const [isWhatsAppConnected, setIsWhatsAppConnected] = useState(false);
  const [isInstagramConnected, setIsInstagramConnected] = useState(false);
  
  const handleConnect = (platform: string) => {
    toast.success(`${platform} conectado com sucesso!`);
    if (platform === "WhatsApp") {
      setIsWhatsAppConnected(true);
    } else if (platform === "Instagram") {
      setIsInstagramConnected(true);
    }
  };
  
  const handleDisconnect = (platform: string) => {
    toast.info(`${platform} desconectado`);
    if (platform === "WhatsApp") {
      setIsWhatsAppConnected(false);
    } else if (platform === "Instagram") {
      setIsInstagramConnected(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configurações de Marketing</h1>
        <p className="text-muted-foreground">
          Configure suas integrações para campanhas de marketing
        </p>
      </div>
      
      <Tabs defaultValue="whatsapp" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
          <TabsTrigger value="instagram">Instagram</TabsTrigger>
        </TabsList>
        
        <TabsContent value="whatsapp" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Oficial WhatsApp</CardTitle>
              <CardDescription>
                Configure a conexão com a API oficial do WhatsApp Business através da Meta.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="whatsapp-status">Status da conexão</Label>
                  <div className={`px-2 py-1 rounded-full text-xs ${isWhatsAppConnected ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {isWhatsAppConnected ? 'Conectado' : 'Desconectado'}
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="whatsapp-token">Token de Acesso</Label>
                <Input id="whatsapp-token" type="password" placeholder="Digite seu token da API WhatsApp" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="whatsapp-number">Número do WhatsApp</Label>
                <Input id="whatsapp-number" placeholder="Ex: +5511999998888" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="whatsapp-business-id">ID da Conta Business</Label>
                <Input id="whatsapp-business-id" placeholder="ID da sua conta Business no Facebook" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" disabled={isWhatsAppConnected} onClick={() => handleConnect("WhatsApp")}>
                Conectar WhatsApp
              </Button>
              <Button 
                variant="destructive" 
                type="button" 
                disabled={!isWhatsAppConnected}
                onClick={() => handleDisconnect("WhatsApp")}
              >
                Desconectar
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>API Não-Oficial (Evolution API)</CardTitle>
              <CardDescription>
                Configure a conexão com a Evolution API para WhatsApp.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="evolution-url">URL da API</Label>
                <Input id="evolution-url" placeholder="https://sua-evolution-api.com" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="evolution-token">Token de Acesso</Label>
                <Input id="evolution-token" type="password" placeholder="Token da Evolution API" />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="use-evolution" />
                <Label htmlFor="use-evolution">Usar API Não-Oficial como padrão</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="button">
                Salvar Configurações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="instagram" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Integração com Instagram</CardTitle>
              <CardDescription>
                Configure a conexão com o Instagram para envio de mensagens diretas.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="instagram-status">Status da conexão</Label>
                  <div className={`px-2 py-1 rounded-full text-xs ${isInstagramConnected ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {isInstagramConnected ? 'Conectado' : 'Desconectado'}
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="instagram-username">Usuário do Instagram</Label>
                <Input id="instagram-username" placeholder="@seuusuario" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="instagram-token">Token de Acesso</Label>
                <Input id="instagram-token" type="password" placeholder="Token da API do Instagram" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="instagram-id">ID da Página</Label>
                <Input id="instagram-id" placeholder="ID da página do Instagram" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" disabled={isInstagramConnected} onClick={() => handleConnect("Instagram")}>
                Conectar Instagram
              </Button>
              <Button 
                variant="destructive" 
                type="button" 
                disabled={!isInstagramConnected}
                onClick={() => handleDisconnect("Instagram")}
              >
                Desconectar
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConfiguracoesMarketingPage;
