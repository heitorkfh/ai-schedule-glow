
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Mail, Plus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DISPAROS_DATA = [
  { id: 1, titulo: 'Promoção Maio', destinatarios: 'Todos', data: '12/05/2025 14:30', status: 'Enviado', taxa_abertura: '65%', canal: 'WhatsApp Oficial' },
  { id: 2, titulo: 'Novos Serviços', destinatarios: 'Leads recentes', data: '25/05/2025 10:00', status: 'Agendado', taxa_abertura: '---', canal: 'WhatsApp Não-Oficial' },
  { id: 3, titulo: 'Lembrete de Consulta', destinatarios: 'Pacientes do mês', data: '08/05/2025 09:15', status: 'Enviado', taxa_abertura: '78%', canal: 'WhatsApp Oficial' },
  { id: 4, titulo: 'Dicas de Saúde', destinatarios: 'Todos', data: '30/05/2025 16:00', status: 'Agendado', taxa_abertura: '---', canal: 'WhatsApp Não-Oficial' }
];

const DisparosPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Disparos</h1>
          <p className="text-muted-foreground">
            Gerencie suas mensagens em massa para leads e clientes
          </p>
        </div>
        <Button onClick={() => navigate("/marketing/disparos/novo")}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Disparo
        </Button>
      </div>

      <Tabs defaultValue="todos" className="w-full">
        <TabsList>
          <TabsTrigger value="todos">Todos</TabsTrigger>
          <TabsTrigger value="enviados">Enviados</TabsTrigger>
          <TabsTrigger value="agendados">Agendados</TabsTrigger>
        </TabsList>
        
        <TabsContent value="todos" className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar disparos..."
                className="w-full pl-8"
              />
            </div>
            <Button variant="outline">Filtros</Button>
          </div>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium flex items-center">
                <Mail className="mr-2 h-5 w-5" /> 
                Disparos
              </CardTitle>
              <CardDescription>
                Você tem um total de {DISPAROS_DATA.length} disparos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Título</TableHead>
                    <TableHead>Destinatários</TableHead>
                    <TableHead>Data/Hora</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Taxa de Abertura</TableHead>
                    <TableHead>Canal</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {DISPAROS_DATA.map((disparo) => (
                    <TableRow key={disparo.id}>
                      <TableCell className="font-medium">{disparo.titulo}</TableCell>
                      <TableCell>{disparo.destinatarios}</TableCell>
                      <TableCell>{disparo.data}</TableCell>
                      <TableCell>
                        <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          disparo.status === 'Enviado' ? 'bg-green-100 text-green-800' : 
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {disparo.status}
                        </div>
                      </TableCell>
                      <TableCell>{disparo.taxa_abertura}</TableCell>
                      <TableCell>{disparo.canal}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Visualizar</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="enviados" className="space-y-4">
          {/* Similar content as "todos" but filtered for sent messages */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium">Disparos Enviados</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                {/* Similar table but filtered */}
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="agendados" className="space-y-4">
          {/* Similar content as "todos" but filtered for scheduled messages */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium">Disparos Agendados</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                {/* Similar table but filtered */}
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DisparosPage;
