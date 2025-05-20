
import React, { useState } from "react";
import { Profissional } from "@/types/agendamento";
import { FormLabel } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProfissionalCard from "./ProfissionalCard";

interface ProfissionalSelectorProps {
  profissionais: Profissional[];
  especialidades: string[];
  selectedProfissional: Profissional | null;
  onProfissionalSelect: (profissionalId: string) => void;
}

const ProfissionalSelector = ({ 
  profissionais, 
  especialidades, 
  selectedProfissional, 
  onProfissionalSelect 
}: ProfissionalSelectorProps) => {
  const [filteredEspecialidade, setFilteredEspecialidade] = useState<string | null>(null);
  
  const filteredProfissionais = filteredEspecialidade 
    ? profissionais.filter(p => p.especialidade === filteredEspecialidade)
    : profissionais;
    
  return (
    <div>
      <h2 className="text-xl font-medium mb-4">Selecione um profissional</h2>
      
      {/* Filter by specialty */}
      <div className="mb-6">
        <FormLabel>Filtrar por especialidade</FormLabel>
        <Select 
          onValueChange={(value) => setFilteredEspecialidade(value === "todas" ? null : value)}
        >
          <SelectTrigger className="w-full md:w-72">
            <SelectValue placeholder="Todas as especialidades" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todas as especialidades</SelectItem>
            {especialidades.map((especialidade) => (
              <SelectItem key={especialidade} value={especialidade}>
                {especialidade}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Professionals list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredProfissionais.map((profissional) => (
          <ProfissionalCard
            key={profissional.id}
            profissional={profissional}
            selected={selectedProfissional?.id === profissional.id}
            onSelect={onProfissionalSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfissionalSelector;
