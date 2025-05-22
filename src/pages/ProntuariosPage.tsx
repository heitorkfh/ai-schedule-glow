
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Search, Calendar, Filter } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

// Tipo para os prontuários
interface Prontuario {
  id: string;
  paciente: string;
  data: Date;
  diagnostico: string;
  condicao: string;
  profissional: string;
}

const ProntuariosPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [prontuarios, setProntuarios] = useState<Prontuario[]>([]);
  const [filteredProntuarios, setFilteredProntuarios] = useState<Prontuario[]>([]);
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);
  const [condicaoFilter, setCondicaoFilter] = useState("");
  const [diagnosticoFilter, setDiagnosticoFilter] = useState("");
  
  // SEO optimization
  useEffect(() => {
    document.title = "Prontuários | LuminaCare - Sistema de Prontuário Eletrônico";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", 
        "Sistema eletrônico de prontuários médicos com processamento de IA para identificação de padrões e histórico completo");
    }

    // Carregar dados de exemplo
    const dadosExemplo: Prontuario[] = [
      {
        id: "1",
        paciente: "João Silva",
        data: new Date(2025, 4, 15),
        diagnostico: "Hipertensão",
        condicao: "Estável",
        profissional: "Dra. Ana Santos"
      },
      {
        id: "2",
        paciente: "Maria Oliveira",
        data: new Date(2025, 4, 16),
        diagnostico: "Diabetes Tipo 2",
        condicao: "Em tratamento",
        profissional: "Dr. Carlos Silva"
      },
      {
        id: "3",
        paciente: "Pedro Souza",
        data: new Date(2025, 4, 17),
        diagnostico: "Ansiedade",
        condicao: "Em acompanhamento",
        profissional: "Dra. Rochelle Marquetto"
      },
      {
        id: "4",
        paciente: "Ana Costa",
        data: new Date(2025, 4, 18),
        diagnostico: "Enxaqueca",
        condicao: "Recorrente",
        profissional: "Dr. Carlos Silva"
      },
      {
        id: "5",
        paciente: "Lucas Pereira",
        data: new Date(2025, 4, 19),
        diagnostico: "Depressão",
        condicao: "Em tratamento",
        profissional: "Dra. Rochelle Marquetto"
      },
      {
        id: "6",
        paciente: "Juliana Martins",
        data: new Date(2025, 4, 20),
        diagnostico: "Artrite",
        condicao: "Crônica",
        profissional: "Dra. Ana Santos"
      }
    ];

    setProntuarios(dadosExemplo);
    setFilteredProntuarios(dadosExemplo);
  }, []);

  // Função para filtrar prontuários
  const filtrarProntuarios = () => {
    let filtrados = [...prontuarios];
    
    // Filtrar por termo de pesquisa
    if (searchTerm) {
      filtrados = filtrados.filter(prontuario => 
        prontuario.paciente.toLowerCase().includes(searchTerm.toLowerCase()) || 
        prontuario.diagnostico.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prontuario.profissional.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filtrar por data
    if (dateFilter) {
      filtrados = filtrados.filter(prontuario => 
        prontuario.data.getDate() === dateFilter.getDate() &&
        prontuario.data.getMonth() === dateFilter.getMonth() &&
        prontuario.data.getFullYear() === dateFilter.getFullYear()
      );
    }
    
    // Filtrar por condição
    if (condicaoFilter) {
      filtrados = filtrados.filter(prontuario => 
        prontuario.condicao === condicaoFilter
      );
    }
    
    // Filtrar por diagnóstico
    if (diagnosticoFilter) {
      filtrados = filtrados.filter(prontuario => 
        prontuario.diagnostico === diagnosticoFilter
      );
    }
    
    setFilteredProntuarios(filtrados);
  };

  // Atualizar filtros quando os valores mudarem
  useEffect(() => {
    filtrarProntuarios();
  }, [searchTerm, dateFilter, condicaoFilter, diagnosticoFilter]);

  // Obter lista única de condições e diagnósticos para os filtros
  const condicoes = [...new Set(prontuarios.map(p => p.condicao))];
  const diagnosticos = [...new Set(prontuarios.map(p => p.diagnostico))];
  
  // Função para limpar filtros
  const limparFiltros = () => {
    setSearchTerm("");
    setDateFilter(undefined);
    setCondicaoFilter("");
    setDiagnosticoFilter("");
  };

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
          {/* Filtros e pesquisa */}
          <div className="mb-6 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por paciente, diagnóstico ou profissional..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <Calendar className="h-4 w-4" />
                      {dateFilter ? format(dateFilter, "dd/MM/yyyy") : "Data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <CalendarComponent
                      mode="single"
                      selected={dateFilter}
                      onSelect={setDateFilter}
                      initialFocus
                      locale={ptBR}
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>

                <Select value={condicaoFilter} onValueChange={setCondicaoFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Condição" />
                  </SelectTrigger>
                  <SelectContent>
                    {condicoes.map(condicao => (
                      <SelectItem key={condicao} value={condicao}>
                        {condicao}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={diagnosticoFilter} onValueChange={setDiagnosticoFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Diagnóstico" />
                  </SelectTrigger>
                  <SelectContent>
                    {diagnosticos.map(diagnostico => (
                      <SelectItem key={diagnostico} value={diagnostico}>
                        {diagnostico}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button 
                  variant="ghost" 
                  onClick={limparFiltros} 
                  disabled={!searchTerm && !dateFilter && !condicaoFilter && !diagnosticoFilter}
                >
                  Limpar
                </Button>
              </div>
            </div>
          </div>

          {/* Tabela de prontuários */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Paciente</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Diagnóstico</TableHead>
                  <TableHead>Condição</TableHead>
                  <TableHead>Profissional</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProntuarios.length > 0 ? (
                  filteredProntuarios.map((prontuario) => (
                    <TableRow key={prontuario.id}>
                      <TableCell className="font-medium">{prontuario.paciente}</TableCell>
                      <TableCell>{format(prontuario.data, "dd/MM/yyyy")}</TableCell>
                      <TableCell>{prontuario.diagnostico}</TableCell>
                      <TableCell>{prontuario.condicao}</TableCell>
                      <TableCell>{prontuario.profissional}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Visualizar</Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      Nenhum prontuário encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProntuariosPage;
