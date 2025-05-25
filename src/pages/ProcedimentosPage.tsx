
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Calendar, User, FileText } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

// Mock data para procedimentos
const mockProcedimentos = [
  {
    id: 1,
    paciente: "João Silva",
    procedimento: "Limpeza Facial Profunda",
    data: "2024-01-15",
    status: "Concluído",
    observacoes: "Procedimento realizado com sucesso",
    fotosAntes: 2,
    fotosDepois: 2
  },
  {
    id: 2,
    paciente: "Maria Santos",
    procedimento: "Peeling Químico",
    data: "2024-01-14",
    status: "Em Recuperação",
    observacoes: "Paciente respondendo bem ao tratamento",
    fotosAntes: 3,
    fotosDepois: 1
  },
  {
    id: 3,
    paciente: "Carlos Mendes",
    procedimento: "Laser CO2 Fracionado",
    data: "2024-01-13",
    status: "Agendado",
    observacoes: "Primeira sessão agendada",
    fotosAntes: 0,
    fotosDepois: 0
  }
];

const ProcedimentosPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredProcedimentos = mockProcedimentos.filter(
    procedimento =>
      procedimento.paciente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      procedimento.procedimento.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Concluído":
        return "bg-green-100 text-green-800";
      case "Em Recuperação":
        return "bg-yellow-100 text-yellow-800";
      case "Agendado":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Procedimentos</h1>
          <p className="text-gray-600 mt-2">
            Gerencie os procedimentos realizados pelos pacientes
          </p>
        </div>
        <Link to="/procedimentos/novo">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Novo Procedimento
          </Button>
        </Link>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockProcedimentos.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Concluídos</p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockProcedimentos.filter(p => p.status === "Concluído").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <User className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Em Recuperação</p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockProcedimentos.filter(p => p.status === "Em Recuperação").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Agendados</p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockProcedimentos.filter(p => p.status === "Agendado").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e Busca */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Procedimentos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar por paciente ou procedimento..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Tabela de Procedimentos */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Paciente</TableHead>
                  <TableHead>Procedimento</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Fotos</TableHead>
                  <TableHead>Observações</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProcedimentos.map((procedimento) => (
                  <TableRow key={procedimento.id}>
                    <TableCell className="font-medium">
                      {procedimento.paciente}
                    </TableCell>
                    <TableCell>{procedimento.procedimento}</TableCell>
                    <TableCell>
                      {new Date(procedimento.data).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(procedimento.status)}>
                        {procedimento.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>Antes: {procedimento.fotosAntes}</div>
                        <div>Depois: {procedimento.fotosDepois}</div>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {procedimento.observacoes}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        Ver Detalhes
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProcedimentosPage;
