
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Users, List, LayoutGrid } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { LeadsKanban } from "@/components/marketing/LeadsKanban";

const LEADS_DATA = [
  { id: 1, nome: 'Maria Silva', telefone: '(11) 99999-1111', email: 'maria@exemplo.com', origem: 'Site', status: 'Novo', ultima_interacao: '10/05/2025' },
  { id: 2, nome: 'João Santos', telefone: '(11) 99999-2222', email: 'joao@exemplo.com', origem: 'Instagram', status: 'Em contato', ultima_interacao: '05/05/2025' },
  { id: 3, nome: 'Ana Pereira', telefone: '(11) 99999-3333', email: 'ana@exemplo.com', origem: 'Facebook', status: 'Convertido', ultima_interacao: '01/05/2025' },
  { id: 4, nome: 'Carlos Oliveira', telefone: '(11) 99999-4444', email: 'carlos@exemplo.com', origem: 'Indicação', status: 'Novo', ultima_interacao: '08/05/2025' },
  { id: 5, nome: 'Patricia Costa', telefone: '(11) 99999-5555', email: 'patricia@exemplo.com', origem: 'Site', status: 'Em contato', ultima_interacao: '03/05/2025' }
];

const LeadsPage = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'table' | 'kanban'>('table');
  const [leadsData, setLeadsData] = useState(LEADS_DATA);
  
  const handleStatusChange = (leadId: number, newStatus: string) => {
    setLeadsData(
      leadsData.map((lead) => 
        lead.id === leadId ? { ...lead, status: newStatus } : lead
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leads</h1>
          <p className="text-muted-foreground">
            Gerencie seus leads e potenciais clientes
          </p>
        </div>
        <Button onClick={() => navigate("/marketing/leads/novo")}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Lead
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar leads..."
            className="w-full pl-8"
          />
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 bg-muted rounded-md p-1">
            <Button 
              variant={viewMode === 'table' ? 'default' : 'ghost'} 
              size="sm" 
              onClick={() => setViewMode('table')}
              className="rounded-sm"
            >
              <List className="h-4 w-4" />
              <span className="ml-1 hidden sm:inline">Lista</span>
            </Button>
            <Button 
              variant={viewMode === 'kanban' ? 'default' : 'ghost'} 
              size="sm" 
              onClick={() => setViewMode('kanban')}
              className="rounded-sm"
            >
              <LayoutGrid className="h-4 w-4" />
              <span className="ml-1 hidden sm:inline">Kanban</span>
            </Button>
          </div>
          <Button variant="outline">Filtros</Button>
        </div>
      </div>

      {viewMode === 'table' ? (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium flex items-center">
              <Users className="mr-2 h-5 w-5" /> 
              Todos os Leads
            </CardTitle>
            <CardDescription>
              Você tem um total de {leadsData.length} leads cadastrados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Origem</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Última Interação</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leadsData.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell className="font-medium">{lead.nome}</TableCell>
                    <TableCell>{lead.telefone}</TableCell>
                    <TableCell>{lead.email}</TableCell>
                    <TableCell>{lead.origem}</TableCell>
                    <TableCell>
                      <Badge className={`${
                        lead.status === 'Novo' ? 'bg-blue-100 text-blue-800' : 
                        lead.status === 'Em contato' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-green-100 text-green-800'
                      }`}>
                        {lead.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{lead.ultima_interacao}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Editar</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <LeadsKanban leads={leadsData} onStatusChange={handleStatusChange} />
      )}
    </div>
  );
};

export default LeadsPage;
