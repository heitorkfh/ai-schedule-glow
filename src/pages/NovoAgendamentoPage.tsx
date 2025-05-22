
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, ArrowLeft, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

// Form schema para validação
const formSchema = z.object({
  paciente: z.string().min(1, { message: "Selecione um paciente" }),
  profissional: z.string().min(1, { message: "Selecione um profissional" }),
  data: z.date({
    required_error: "Selecione uma data para o agendamento",
  }),
  horario: z.string().min(1, { message: "Selecione um horário" }),
  tipo: z.string().min(1, { message: "Selecione o tipo de consulta" }),
  modalidade: z.string().min(1, { message: "Selecione uma modalidade" }),
  convenio: z.string().optional(),
  observacoes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const NovoAgendamentoPage = () => {
  const navigate = useNavigate();
  const [pacientes, setPacientes] = useState([
    { id: "1", nome: "João Silva" },
    { id: "2", nome: "Maria Santos" },
    { id: "3", nome: "Carlos Oliveira" },
    { id: "4", nome: "Ana Souza" },
    { id: "5", nome: "Lucas Pereira" },
  ]);
  
  const [profissionais, setProfissionais] = useState([
    { id: "1", nome: "Dra. Rochelle Marquetto", especialidade: "Psiquiatria" },
    { id: "2", nome: "Dr. Carlos Silva", especialidade: "Neurologia" },
    { id: "3", nome: "Dra. Ana Santos", especialidade: "Cardiologia" },
  ]);
  
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([
    "08:00", "09:00", "10:00", "11:00", 
    "14:00", "15:00", "16:00", "17:00"
  ]);

  useEffect(() => {
    document.title = "Novo Agendamento | LuminaCare";
  }, []);

  // Inicializar formulário
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tipo: "",
      modalidade: "",
      observacoes: "",
    },
  });

  // Função para simular busca de horários disponíveis quando a data é selecionada
  const handleDateChange = (date: Date | undefined) => {
    if (!date) return;
    
    // Simulando uma chamada à API para buscar horários disponíveis para a data selecionada
    // Em uma implementação real, isso seria uma chamada à API
    setTimeout(() => {
      setHorariosDisponiveis([
        "08:00", "09:00", "10:30", "11:30", 
        "14:00", "15:30", "16:00", "17:30"
      ]);
    }, 500);
  };

  const onSubmit = async (data: FormValues) => {
    try {
      // Simulando o envio dos dados para a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Agendamento criado com sucesso",
        description: `Consulta agendada para ${format(data.data, "dd/MM/yyyy")} às ${data.horario}`,
      });
      
      // Redirecionar para a lista de agendamentos
      navigate("/agendamentos");
    } catch (error) {
      toast({
        title: "Erro ao criar agendamento",
        description: "Ocorreu um erro ao processar sua solicitação. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate("/agendamentos")}
          className="h-8 w-8"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Novo Agendamento</h1>
          <p className="text-muted-foreground mt-2">
            Crie um novo agendamento para consulta ou atendimento
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações do Agendamento</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="paciente"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Paciente</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um paciente" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {pacientes.map(paciente => (
                            <SelectItem key={paciente.id} value={paciente.id}>
                              {paciente.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="profissional"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profissional</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um profissional" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {profissionais.map(profissional => (
                            <SelectItem key={profissional.id} value={profissional.id}>
                              {profissional.nome} - {profissional.especialidade}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="data"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Data</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "dd/MM/yyyy", { locale: ptBR })
                              ) : (
                                <span>Selecione uma data</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => {
                              field.onChange(date);
                              handleDateChange(date);
                            }}
                            disabled={(date) => date < new Date()}
                            initialFocus
                            locale={ptBR}
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="horario"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Horário</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um horário" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {horariosDisponiveis.map(horario => (
                            <SelectItem key={horario} value={horario}>
                              {horario}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="tipo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Consulta</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="primeira_consulta">Primeira Consulta</SelectItem>
                          <SelectItem value="retorno">Retorno</SelectItem>
                          <SelectItem value="exame">Exame</SelectItem>
                          <SelectItem value="procedimento">Procedimento</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="modalidade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Modalidade</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a modalidade" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="presencial">Presencial</SelectItem>
                          <SelectItem value="online">Online</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="convenio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Convênio (opcional)</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o convênio" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="particular">Particular</SelectItem>
                        <SelectItem value="unimed">Unimed</SelectItem>
                        <SelectItem value="bradesco">Bradesco Saúde</SelectItem>
                        <SelectItem value="amil">Amil</SelectItem>
                        <SelectItem value="sulamerica">SulAmérica</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="observacoes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observações (opcional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Adicione informações relevantes sobre o agendamento"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate("/agendamentos")}
                >
                  Cancelar
                </Button>
                <Button type="submit">Criar Agendamento</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NovoAgendamentoPage;
