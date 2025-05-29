
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { MoreVertical, Check, X, Calendar as CalendarIcon, MessageSquare } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface AgendamentoDropdownProps {
  agendamentoId: number;
  agendamentoName: string;
  currentDate?: string;
  currentTime?: string;
}

const AgendamentoDropdown = ({ agendamentoId, agendamentoName, currentDate, currentTime }: AgendamentoDropdownProps) => {
  const [isRemarcarOpen, setIsRemarcarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState(currentTime || "09:00");

  const handleConfirmarPresenca = () => {
    toast({
      title: "Presença confirmada",
      description: `A presença de ${agendamentoName} foi confirmada com sucesso.`,
    });
  };

  const handleCancelar = () => {
    toast({
      title: "Cancelamento efetuado",
      description: `O agendamento de ${agendamentoName} foi cancelado.`,
      variant: "destructive",
    });
  };

  const handleEnviarLembrete = () => {
    toast({
      title: "Lembrete enviado",
      description: `Lembrete enviado para ${agendamentoName} com sucesso.`,
    });
  };

  const handleRemarcar = () => {
    if (selectedDate) {
      const newDate = format(selectedDate, "dd/MM/yyyy", { locale: ptBR });
      toast({
        title: "Agendamento remarcado",
        description: `Agendamento de ${agendamentoName} remarcado para ${newDate} às ${selectedTime}.`,
      });
      setIsRemarcarOpen(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={handleConfirmarPresenca} className="gap-2">
            <Check className="h-4 w-4" />
            Confirmar presença
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleCancelar} className="gap-2 text-destructive">
            <X className="h-4 w-4" />
            Cancelar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsRemarcarOpen(true)} className="gap-2">
            <CalendarIcon className="h-4 w-4" />
            Remarcar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleEnviarLembrete} className="gap-2">
            <MessageSquare className="h-4 w-4" />
            Enviar lembrete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isRemarcarOpen} onOpenChange={setIsRemarcarOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Remarcar Agendamento</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Paciente: {agendamentoName}</Label>
            </div>
            
            <div className="space-y-2">
              <Label>Nova Data</Label>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className={cn("rounded-md border pointer-events-auto")}
                locale={ptBR}
                disabled={(date) => date < new Date()}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Horário</Label>
              <Input
                id="time"
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={handleRemarcar} className="flex-1">
                Confirmar Remarcação
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setIsRemarcarOpen(false)}
                className="flex-1"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AgendamentoDropdown;
