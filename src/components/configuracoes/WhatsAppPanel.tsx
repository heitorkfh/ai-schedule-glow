
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { QrCode, Smartphone, Wifi, WifiOff, RefreshCw, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface WhatsAppPanelProps {}

const WhatsAppPanel = ({}: WhatsAppPanelProps) => {
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  const [qrCode, setQrCode] = useState<string>('');
  const [isGeneratingQR, setIsGeneratingQR] = useState(false);
  const [lastConnection, setLastConnection] = useState<Date | null>(null);

  // Simula verificação de status da conexão
  const checkConnectionStatus = () => {
    // Aqui seria feita a verificação real com a API do WhatsApp
    const isConnected = Math.random() > 0.7; // Simulação
    
    if (isConnected && connectionStatus === 'disconnected') {
      setConnectionStatus('connected');
      setLastConnection(new Date());
      toast.success("WhatsApp conectado com sucesso!");
    } else if (!isConnected && connectionStatus === 'connected') {
      setConnectionStatus('disconnected');
      toast.error("Conexão com WhatsApp perdida!", {
        description: "Clique em 'Conectar' para gerar um novo QR Code"
      });
    }
  };

  // Gera QR Code para conexão
  const generateQRCode = async () => {
    setIsGeneratingQR(true);
    setConnectionStatus('connecting');
    
    // Simulação de geração de QR Code
    setTimeout(() => {
      // Este seria o QR Code real da API
      const mockQR = `data:image/svg+xml;base64,${btoa(`
        <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
          <rect width="200" height="200" fill="white"/>
          <rect x="20" y="20" width="160" height="160" fill="black"/>
          <rect x="40" y="40" width="120" height="120" fill="white"/>
          <text x="100" y="105" text-anchor="middle" fill="black" font-size="12">QR Code</text>
        </svg>
      `)}`;
      
      setQrCode(mockQR);
      setIsGeneratingQR(false);
      
      // Simula conexão após 10 segundos
      setTimeout(() => {
        if (Math.random() > 0.3) {
          setConnectionStatus('connected');
          setLastConnection(new Date());
          toast.success("WhatsApp conectado com sucesso!");
        } else {
          setConnectionStatus('disconnected');
          toast.error("Falha na conexão. Tente novamente.");
        }
      }, 10000);
    }, 2000);
  };

  // Desconecta WhatsApp
  const disconnect = () => {
    setConnectionStatus('disconnected');
    setQrCode('');
    setLastConnection(null);
    toast.info("WhatsApp desconectado");
  };

  // Verifica status periodicamente
  useEffect(() => {
    const interval = setInterval(checkConnectionStatus, 30000); // Verifica a cada 30 segundos
    return () => clearInterval(interval);
  }, [connectionStatus]);

  // Notifica quando inativo
  useEffect(() => {
    if (connectionStatus === 'disconnected' && lastConnection) {
      toast.error("WhatsApp desconectado!", {
        description: "Reconecte para continuar enviando mensagens",
        duration: 10000,
      });
    }
  }, [connectionStatus]);

  const getStatusBadge = () => {
    switch (connectionStatus) {
      case 'connected':
        return <Badge className="bg-green-100 text-green-800 border-green-300"><Wifi className="w-3 h-3 mr-1" />Conectado</Badge>;
      case 'connecting':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300"><RefreshCw className="w-3 h-3 mr-1 animate-spin" />Conectando</Badge>;
      default:
        return <Badge variant="destructive"><WifiOff className="w-3 h-3 mr-1" />Desconectado</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="w-5 h-5" />
              Conexão WhatsApp
            </CardTitle>
            <CardDescription>
              Conecte sua conta do WhatsApp para enviar mensagens automatizadas
            </CardDescription>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {connectionStatus === 'disconnected' && (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>WhatsApp Desconectado</AlertTitle>
            <AlertDescription>
              Conecte seu WhatsApp para enviar mensagens de agendamento e lembretes automáticos.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Status e informações */}
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Status da Conexão</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  {getStatusBadge()}
                </div>
                {lastConnection && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Última conexão:</span>
                    <span>{lastConnection.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              {connectionStatus === 'disconnected' && (
                <Button 
                  onClick={generateQRCode} 
                  disabled={isGeneratingQR}
                  className="w-full"
                >
                  {isGeneratingQR ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Gerando QR Code...
                    </>
                  ) : (
                    <>
                      <QrCode className="w-4 h-4 mr-2" />
                      Conectar WhatsApp
                    </>
                  )}
                </Button>
              )}
              
              {connectionStatus === 'connected' && (
                <Button 
                  variant="destructive" 
                  onClick={disconnect}
                  className="w-full"
                >
                  <WifiOff className="w-4 h-4 mr-2" />
                  Desconectar
                </Button>
              )}
            </div>
          </div>

          {/* QR Code */}
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">QR Code</h4>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center min-h-[200px]">
                {qrCode ? (
                  <div className="text-center space-y-2">
                    <img 
                      src={qrCode} 
                      alt="QR Code WhatsApp" 
                      className="mx-auto border rounded"
                      width={160}
                      height={160}
                    />
                    <p className="text-sm text-muted-foreground">
                      Escaneie com seu WhatsApp
                    </p>
                  </div>
                ) : connectionStatus === 'connecting' ? (
                  <div className="text-center space-y-2">
                    <RefreshCw className="w-8 h-8 mx-auto animate-spin text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Gerando QR Code...
                    </p>
                  </div>
                ) : connectionStatus === 'connected' ? (
                  <div className="text-center space-y-2">
                    <Wifi className="w-8 h-8 mx-auto text-green-600" />
                    <p className="text-sm text-muted-foreground">
                      WhatsApp Conectado
                    </p>
                  </div>
                ) : (
                  <div className="text-center space-y-2">
                    <QrCode className="w-8 h-8 mx-auto text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Clique em "Conectar" para gerar o QR Code
                    </p>
                  </div>
                )}
              </div>
            </div>

            {(connectionStatus === 'connecting' || qrCode) && (
              <div className="text-xs text-muted-foreground space-y-1">
                <p>• Abra o WhatsApp no seu celular</p>
                <p>• Vá em Configurações → Aparelhos conectados</p>
                <p>• Toque em "Conectar um aparelho"</p>
                <p>• Escaneie o QR Code acima</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WhatsAppPanel;
