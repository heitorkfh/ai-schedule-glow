
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Send, Users, Calendar, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const DISPAROS_DATA = [
  { id: 1, titulo: 'Campanha Maio', destinatarios: 45, enviados: 45, abertos: 32, cliques: 8, data: '15/05/2025', status: 'Enviado' },
  { id: 2, titulo: 'Lembrete Consultas', destinatarios: 12, enviados: 12, abertos: 10, cliques: 3, data: '10/05/2025', status: 'Enviado' },
  { id: 3, titulo: 'Promoção Procedimentos', destinatarios: 78, enviados: 0, abertos: 0, cliques: 0, data: '20/05/2025', status: 'Agendado' },
];

const DisparosPage = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Disparos de Marketing</h1>
          <p className="text-muted-foreground">
            Gerencie suas campanhas de WhatsApp e email marketing
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => navigate("/marketing/disparos/selecionar")}
          >
            <Users className="mr-2 h-4 w-4" />
            Selecionar Destinatários
          </Button>
          <Button onClick={() => navigate("/marketing/disparos/novo")}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Disparo
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar disparos..."
            className="w-full pl-8"
          />
        </div>
        <Button variant="outline">Filtros</Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total de Disparos</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{DISPAROS_DATA.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Mensagens Enviadas</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {DISPAROS_DATA.reduce((sum, disparo) => sum + disparo.enviados, 0)}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Taxa de Abertura</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">74%</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Taxa de Cliques</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">19%</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Histórico de Disparos</CardTitle>
          <CardDescription>
            Acompanhe o desempenho de suas campanhas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campanha</TableHead>
                <TableHead>Destinatários</TableHead>
                <TableHead>Enviados</TableHead>
                <TableHead>Abertos</TableHead>
                <TableHead>Cliques</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {DISPAROS_DATA.map((disparo) => (
                <TableRow key={disparo.id}>
                  <TableCell className="font-medium">{disparo.titulo}</TableCell>
                  <TableCell>{disparo.destinatarios}</TableCell>
                  <TableCell>{disparo.enviados}</TableCell>
                  <TableCell>{disparo.abertos}</TableCell>
                  <TableCell>{disparo.cliques}</TableCell>
                  <TableCell>{disparo.data}</TableCell>
                  <TableCell>
                    <Badge className={`${
                      disparo.status === 'Enviado' ? 'bg-green-100 text-green-800' : 
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {disparo.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">Ver detalhes</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DisparosPage;
