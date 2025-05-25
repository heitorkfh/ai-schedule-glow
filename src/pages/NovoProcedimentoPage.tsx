
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Upload, X, Camera } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface FotoAnexada {
  id: string;
  file: File;
  preview: string;
  tipo: 'antes' | 'depois';
}

const NovoProcedimentoPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    paciente: "",
    procedimento: "",
    data: "",
    horario: "",
    medico: "",
    anestesia: "",
    duracao: "",
    observacoes: "",
    cuidadosPrevios: "",
    cuidadosPosteriores: "",
    proximaConsulta: "",
    status: "Agendado"
  });

  const [fotosAntes, setFotosAntes] = useState<FotoAnexada[]>([]);
  const [fotosDepois, setFotosDepois] = useState<FotoAnexada[]>([]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (files: FileList | null, tipo: 'antes' | 'depois') => {
    if (!files) return;

    const newFotos: FotoAnexada[] = [];
    
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const id = Math.random().toString(36).substr(2, 9);
        const preview = URL.createObjectURL(file);
        
        newFotos.push({
          id,
          file,
          preview,
          tipo
        });
      }
    });

    if (tipo === 'antes') {
      setFotosAntes(prev => [...prev, ...newFotos]);
    } else {
      setFotosDepois(prev => [...prev, ...newFotos]);
    }
  };

  const removerFoto = (id: string, tipo: 'antes' | 'depois') => {
    if (tipo === 'antes') {
      setFotosAntes(prev => {
        const foto = prev.find(f => f.id === id);
        if (foto) URL.revokeObjectURL(foto.preview);
        return prev.filter(f => f.id !== id);
      });
    } else {
      setFotosDepois(prev => {
        const foto = prev.find(f => f.id === id);
        if (foto) URL.revokeObjectURL(foto.preview);
        return prev.filter(f => f.id !== id);
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.paciente || !formData.procedimento || !formData.data) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    console.log("Dados do procedimento:", formData);
    console.log("Fotos antes:", fotosAntes);
    console.log("Fotos depois:", fotosDepois);

    toast({
      title: "Sucesso",
      description: "Procedimento cadastrado com sucesso!",
    });
  };

  const FotoGallery = ({ fotos, tipo }: { fotos: FotoAnexada[], tipo: 'antes' | 'depois' }) => (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {fotos.map((foto) => (
        <div key={foto.id} className="relative group">
          <img
            src={foto.preview}
            alt={`Foto ${tipo}`}
            className="w-full h-32 object-cover rounded-lg border"
          />
          <button
            type="button"
            onClick={() => removerFoto(foto.id, tipo)}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/procedimentos">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Novo Procedimento</h1>
          <p className="text-gray-600 mt-2">
            Cadastre um novo procedimento realizado
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informações Básicas */}
        <Card>
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="paciente">Paciente *</Label>
                <Input
                  id="paciente"
                  value={formData.paciente}
                  onChange={(e) => handleInputChange('paciente', e.target.value)}
                  placeholder="Nome do paciente"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="procedimento">Procedimento *</Label>
                <Input
                  id="procedimento"
                  value={formData.procedimento}
                  onChange={(e) => handleInputChange('procedimento', e.target.value)}
                  placeholder="Nome do procedimento"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="data">Data *</Label>
                <Input
                  id="data"
                  type="date"
                  value={formData.data}
                  onChange={(e) => handleInputChange('data', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="horario">Horário</Label>
                <Input
                  id="horario"
                  type="time"
                  value={formData.horario}
                  onChange={(e) => handleInputChange('horario', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="medico">Médico Responsável</Label>
                <Input
                  id="medico"
                  value={formData.medico}
                  onChange={(e) => handleInputChange('medico', e.target.value)}
                  placeholder="Nome do médico"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="duracao">Duração (minutos)</Label>
                <Input
                  id="duracao"
                  type="number"
                  value={formData.duracao}
                  onChange={(e) => handleInputChange('duracao', e.target.value)}
                  placeholder="Ex: 60"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="anestesia">Tipo de Anestesia</Label>
                <Select onValueChange={(value) => handleInputChange('anestesia', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="local">Anestesia Local</SelectItem>
                    <SelectItem value="topica">Anestesia Tópica</SelectItem>
                    <SelectItem value="geral">Anestesia Geral</SelectItem>
                    <SelectItem value="sem-anestesia">Sem Anestesia</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={formData.status}
                  onValueChange={(value) => handleInputChange('status', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Agendado">Agendado</SelectItem>
                    <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                    <SelectItem value="Concluído">Concluído</SelectItem>
                    <SelectItem value="Em Recuperação">Em Recuperação</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="observacoes">Observações do Procedimento</Label>
              <Textarea
                id="observacoes"
                value={formData.observacoes}
                onChange={(e) => handleInputChange('observacoes', e.target.value)}
                placeholder="Descreva detalhes importantes sobre o procedimento..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Fotos Antes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Fotos Antes do Procedimento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Label htmlFor="fotos-antes" className="cursor-pointer">
                <div className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-lg border border-blue-200 transition-colors">
                  <Upload className="h-4 w-4" />
                  Adicionar Fotos
                </div>
                <Input
                  id="fotos-antes"
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e.target.files, 'antes')}
                />
              </Label>
              <span className="text-sm text-gray-500">
                {fotosAntes.length} foto(s) adicionada(s)
              </span>
            </div>

            {fotosAntes.length > 0 && (
              <FotoGallery fotos={fotosAntes} tipo="antes" />
            )}
          </CardContent>
        </Card>

        {/* Fotos Depois */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Fotos Depois do Procedimento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Label htmlFor="fotos-depois" className="cursor-pointer">
                <div className="flex items-center gap-2 bg-green-50 hover:bg-green-100 text-green-600 px-4 py-2 rounded-lg border border-green-200 transition-colors">
                  <Upload className="h-4 w-4" />
                  Adicionar Fotos
                </div>
                <Input
                  id="fotos-depois"
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e.target.files, 'depois')}
                />
              </Label>
              <span className="text-sm text-gray-500">
                {fotosDepois.length} foto(s) adicionada(s)
              </span>
            </div>

            {fotosDepois.length > 0 && (
              <FotoGallery fotos={fotosDepois} tipo="depois" />
            )}
          </CardContent>
        </Card>

        {/* Cuidados e Acompanhamento */}
        <Card>
          <CardHeader>
            <CardTitle>Cuidados e Acompanhamento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cuidadosPrevios">Cuidados Pré-Procedimento</Label>
              <Textarea
                id="cuidadosPrevios"
                value={formData.cuidadosPrevios}
                onChange={(e) => handleInputChange('cuidadosPrevios', e.target.value)}
                placeholder="Instruções seguidas antes do procedimento..."
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cuidadosPosteriores">Cuidados Pós-Procedimento</Label>
              <Textarea
                id="cuidadosPosteriores"
                value={formData.cuidadosPosteriores}
                onChange={(e) => handleInputChange('cuidadosPosteriores', e.target.value)}
                placeholder="Instruções para recuperação e cuidados posteriores..."
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="proximaConsulta">Próxima Consulta</Label>
              <Input
                id="proximaConsulta"
                type="date"
                value={formData.proximaConsulta}
                onChange={(e) => handleInputChange('proximaConsulta', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Botões de Ação */}
        <div className="flex justify-end gap-4">
          <Link to="/procedimentos">
            <Button variant="outline">Cancelar</Button>
          </Link>
          <Button type="submit">
            Salvar Procedimento
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NovoProcedimentoPage;
