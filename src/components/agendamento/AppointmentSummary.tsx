
import React from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Profissional } from "@/types/agendamento";

interface AppointmentSummaryProps {
  selectedProfissional: Profissional | null;
  selectedDate: Date | null;
  selectedHorario: string;
  modalidade: "presencial" | "online" | null;
}

const AppointmentSummary = ({
  selectedProfissional,
  selectedDate,
  selectedHorario,
  modalidade
}: AppointmentSummaryProps) => {
  if (!selectedProfissional || !selectedDate || !selectedHorario || !modalidade) {
    return null;
  }
  
  return (
    <div className="bg-muted/30 rounded-lg p-4 mb-6">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <Avatar className="h-12 w-12">
            {selectedProfissional.imagem ? (
              <AvatarImage src={selectedProfissional.imagem} alt={selectedProfissional.nome} />
            ) : (
              <AvatarFallback>{selectedProfissional.nome.substring(0, 2).toUpperCase()}</AvatarFallback>
            )}
          </Avatar>
          <div>
            <p className="font-medium">{selectedProfissional.nome}</p>
            <p className="text-sm text-muted-foreground">{selectedProfissional.especialidade}</p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            <p>{format(selectedDate, "'Dia' dd 'de' MMMM", { locale: ptBR })}</p>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <p>{selectedHorario} - {modalidade === "presencial" ? "Presencial" : "Online"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentSummary;
