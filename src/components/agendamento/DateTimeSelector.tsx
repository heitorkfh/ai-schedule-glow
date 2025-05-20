
import React from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Profissional, HorarioDisponivel } from "@/types/agendamento";

interface DateTimeSelectorProps {
  selectedProfissional: Profissional;
  selectedDate: Date | null;
  onDateSelect: (date: Date | undefined) => void;
  modalidade: "presencial" | "online" | null;
  onModalidadeSelect: (modalidade: "presencial" | "online") => void;
  horariosDisponiveis: HorarioDisponivel[];
  selectedHorario: string | null;
  onHorarioSelect: (horario: string) => void;
  onBack: () => void;
  onContinue: () => void;
}

const DateTimeSelector = ({
  selectedProfissional,
  selectedDate,
  onDateSelect,
  modalidade,
  onModalidadeSelect,
  horariosDisponiveis,
  selectedHorario,
  onHorarioSelect,
  onBack,
  onContinue
}: DateTimeSelectorProps) => {
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-start">
        <Avatar className="h-16 w-16">
          {selectedProfissional.imagem ? (
            <AvatarImage src={selectedProfissional.imagem} alt={selectedProfissional.nome} />
          ) : (
            <AvatarFallback>{selectedProfissional.nome.substring(0, 2).toUpperCase()}</AvatarFallback>
          )}
        </Avatar>
        <div>
          <h2 className="text-xl font-medium">{selectedProfissional.nome}</h2>
          <p className="text-muted-foreground">{selectedProfissional.especialidade}</p>
          <p className="text-sm text-muted-foreground">{selectedProfissional.crm}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Date selection */}
        <div>
          <h3 className="text-lg font-medium mb-4">Selecione uma data</h3>
          <Calendar
            mode="single"
            selected={selectedDate || undefined}
            onSelect={onDateSelect}
            disabled={(date) =>
              date < new Date() || // Datas passadas
              date > new Date(new Date().setMonth(new Date().getMonth() + 3)) || // Máximo 3 meses à frente
              date.getDay() === 0 // Domingo
            }
            className="rounded-md border"
          />
        </div>
        
        {/* Modality and time selection */}
        <div>
          <h3 className="text-lg font-medium mb-4">Selecione a modalidade</h3>
          <div className="flex gap-4 mb-6">
            <Button
              type="button"
              variant={modalidade === "presencial" ? "default" : "outline"}
              className="flex-1"
              onClick={() => onModalidadeSelect("presencial")}
            >
              Presencial
            </Button>
            <Button
              type="button"
              variant={modalidade === "online" ? "default" : "outline"}
              className="flex-1"
              onClick={() => onModalidadeSelect("online")}
            >
              Online
            </Button>
          </div>
          
          {selectedDate && modalidade && (
            <>
              <h3 className="text-lg font-medium mb-4">Horários disponíveis</h3>
              {horariosDisponiveis.length > 0 ? (
                <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                  {horariosDisponiveis.map((slot) => (
                    <Button
                      key={slot.hora}
                      type="button"
                      variant="outline"
                      disabled={!slot.disponivel}
                      className={cn(
                        selectedHorario === slot.hora && "border-primary ring-1 ring-primary",
                        !slot.disponivel && "line-through bg-muted/50"
                      )}
                      onClick={() => slot.disponivel && onHorarioSelect(slot.hora)}
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      {slot.hora}
                    </Button>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-40">
                  <p>Carregando horários disponíveis...</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      
      <div className="mt-6 flex justify-between">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onBack}
        >
          Voltar
        </Button>
        <Button 
          type="button" 
          onClick={onContinue}
          disabled={!selectedDate || !modalidade || !selectedHorario}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
};

export default DateTimeSelector;
