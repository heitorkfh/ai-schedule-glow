
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, addWeeks, subWeeks, startOfWeek, addDays } from "date-fns";
import { ptBR } from "date-fns/locale";

// Mock data para agendamentos
const mockAgendamentos = [
  { id: 1, nome: "João Santos", hora: "08:00", duracao: 60, dia: 1, tipo: "Consulta", cor: "bg-blue-200" },
  { id: 2, nome: "Maria Silva", hora: "09:00", duracao: 30, dia: 1, tipo: "Retorno", cor: "bg-green-200" },
  { id: 3, nome: "Ana Pereira", hora: "10:00", duracao: 45, dia: 2, tipo: "Exame", cor: "bg-yellow-200" },
  { id: 4, nome: "Carlos Mendes", hora: "11:00", duracao: 30, dia: 2, tipo: "Consulta", cor: "bg-purple-200" },
  { id: 5, nome: "Fernanda Lima", hora: "14:00", duracao: 60, dia: 3, tipo: "Primeira vez", cor: "bg-pink-200" },
  { id: 6, nome: "Ricardo Oliveira", hora: "15:00", duracao: 45, dia: 4, tipo: "Retorno", cor: "bg-orange-200" },
  { id: 7, nome: "Luciana Santos", hora: "16:00", duracao: 30, dia: 4, tipo: "Consulta", cor: "bg-teal-200" },
  { id: 8, nome: "Paulo Ferreira", hora: "09:30", duracao: 60, dia: 5, tipo: "Exame", cor: "bg-indigo-200" },
];

const AgendaSemanal = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  
  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 0 });
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  
  const goToPreviousWeek = () => {
    setCurrentWeek(subWeeks(currentWeek, 1));
  };

  const goToNextWeek = () => {
    setCurrentWeek(addWeeks(currentWeek, 1));
  };

  const horarios = Array.from({ length: 11 }, (_, i) => {
    const hora = 8 + i;
    return `${hora.toString().padStart(2, '0')}:00`;
  });

  const getAgendamentosPorDiaEHora = (diaIndex: number, hora: string) => {
    return mockAgendamentos.filter(ag => ag.dia === diaIndex && ag.hora === hora);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Agenda Semanal</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={goToPreviousWeek}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="font-medium min-w-[200px] text-center">
              {format(weekStart, "d 'de' MMMM", { locale: ptBR })} - {format(addDays(weekStart, 6), "d 'de' MMMM 'de' yyyy", { locale: ptBR })}
            </span>
            <Button variant="outline" size="sm" onClick={goToNextWeek}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <div className="grid grid-cols-8 min-w-[800px]">
            {/* Header com dias da semana */}
            <div className="p-3 font-medium text-sm border-b border-r bg-muted/50">
              Horário
            </div>
            {days.map((day, index) => (
              <div key={index} className="p-3 text-center border-b border-r bg-muted/50">
                <div className="font-medium text-sm">
                  {format(day, "EEEE", { locale: ptBR })}
                </div>
                <div className="text-xs text-muted-foreground">
                  {format(day, "d/MM", { locale: ptBR })}
                </div>
              </div>
            ))}

            {/* Grid de horários */}
            {horarios.map((hora) => (
              <React.Fragment key={hora}>
                {/* Coluna de horário */}
                <div className="p-3 text-sm font-medium border-b border-r bg-muted/30 text-center">
                  {hora}
                </div>
                
                {/* Colunas dos dias */}
                {days.map((_, dayIndex) => {
                  const agendamentos = getAgendamentosPorDiaEHora(dayIndex, hora);
                  return (
                    <div key={dayIndex} className="p-1 border-b border-r min-h-[60px] relative">
                      {agendamentos.map((agendamento) => (
                        <div
                          key={agendamento.id}
                          className={`${agendamento.cor} rounded-md p-2 text-xs mb-1 cursor-pointer hover:opacity-80 transition-opacity`}
                        >
                          <div className="font-medium truncate">
                            {agendamento.nome}
                          </div>
                          <div className="text-xs opacity-75">
                            {agendamento.tipo}
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgendaSemanal;
