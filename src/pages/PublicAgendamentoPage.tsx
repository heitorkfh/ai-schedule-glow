import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CalendarIcon, Clock, ArrowLeft, Check } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Form schema for validation
const agendamentoFormSchema = z.object({
  nome: z.string().min(3, {
    message: "Nome deve ter pelo menos 3 caracteres.",
  }),
  email: z.string().email({
    message: "Email inválido.",
  }),
  telefone: z.string().min(10, {
    message: "Telefone inválido.",
  }),
  data: z.date({
    required_error: "Por favor selecione uma data.",
  }),
  horario: z.string({
    required_error: "Por favor selecione um horário.",
  }),
  especialidade: z.string({
    required_error: "Por favor selecione uma especialidade.",
  }),
  profissional: z.string({
    required_error: "Por favor selecione um profissional.",
  }),
  modalidade: z.enum(["presencial", "online"], {
    required_error: "Por favor selecione uma modalidade.",
  }),
  convenio: z.string().optional(),
  observacoes: z.string().optional(),
});

type AgendamentoFormValues = z.infer<typeof agendamentoFormSchema>;

// Interface for professional data
interface Profissional {
  id: string;
  nome: string;
  especialidade: string;
  crm?: string;
  imagem?: string;
  biografia?: string;
}

// Interface for available time slots
interface HorarioDisponivel {
  hora: string;
  disponivel: boolean;
}

const PublicAgendamentoPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedProfissional, setSelectedProfissional] = useState<Profissional | null>(null);
  const [modalidade, setModalidade] = useState<"presencial" | "online" | null>(null);
  const [horariosDisponiveis, setHorariosDisponiveis] = useState<HorarioDisponivel[]>([]);
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [especialidades, setEspecialidades] = useState<string[]>([]);
  const [convenios, setConvenios] = useState<string[]>([]);
  
  // Especialidades médicas - eventually would come from API
  useEffect(() => {
    // Simulando chamada à API para buscar especialidades
    setEspecialidades([
      "Clínica Geral",
      "Cardiologia",
      "Dermatologia",
      "Ginecologia",
      "Neurologia",
      "Oftalmologia",
      "Ortopedia",
      "Pediatria",
      "Psiquiatria",
    ]);

    // Simulando chamada à API para buscar convênios
    setConvenios([
      "Unimed",
      "Bradesco Saúde",
      "SulAmérica",
      "Amil",
      "Particular"
    ]);

    // Simulando chamada à API para buscar profissionais
    setProfissionais([
      {
        id: "1",
        nome: "Dra. Rochelle Marquetto",
        especialidade: "Psiquiatria",
        crm: "CREMERS: 39448 | RQE 43138",
        imagem: "/lovable-uploads/c34a8ed3-b933-4a34-9758-66f764adb5ef.png",
        biografia: "CEO e Responsável técnica (medicina) da Pontual Psiquiatria. Especialização em Psiquiatria pela Pontifícia Universidade Católica do Rio Grande do Sul (PUC-RS). MBA em Gestão em Saúde pelo Instituto Singularidades. Realizou Psychiatry Observership Program at The University of Texas Health Science Center at Houston. Especialização em Psicoterapia de Orientação Analítica pelo Centro de Estudos Luiz Guedes da Universidade Federal do Rio Grande do Sul (UFRGS)."
      },
      {
        id: "2",
        nome: "Dr. Carlos Silva",
        especialidade: "Neurologia",
        crm: "CRM: 56789",
        biografia: "Especialista em neurologia com 15 anos de experiência."
      },
      {
        id: "3",
        nome: "Dra. Ana Santos",
        especialidade: "Cardiologia",
        crm: "CRM: 45678",
        biografia: "Cardiologista com experiência em procedimentos avançados."
      }
    ]);
  }, []);

  // Fetch available time slots when date, professional or modality changes
  useEffect(() => {
    if (selectedDate && selectedProfissional && modalidade) {
      fetchHorariosDisponiveis(selectedDate, selectedProfissional.id, modalidade);
    }
  }, [selectedDate, selectedProfissional, modalidade]);

  const fetchHorariosDisponiveis = async (data: Date, profissionalId: string, modalidade: string) => {
    // Simulando chamada à API para buscar horários disponíveis
    // Na implementação real, isso seria uma chamada ao backend
    try {
      // Simulating API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock data for available time slots
      const mockHorarios: HorarioDisponivel[] = [
        { hora: "08:00", disponivel: true },
        { hora: "09:00", disponivel: true },
        { hora: "10:00", disponivel: true },
        { hora: "11:00", disponivel: true },
        { hora: "12:00", disponivel: false },
        { hora: "13:00", disponivel: true },
        { hora: "14:00", disponivel: true },
        { hora: "15:00", disponivel: false },
        { hora: "16:00", disponivel: true },
        { hora: "17:00", disponivel: true },
      ];
      
      setHorariosDisponiveis(mockHorarios);
    } catch (error) {
      console.error("Erro ao buscar horários disponíveis:", error);
      toast({
        title: "Erro ao carregar horários",
        description: "Não foi possível carregar os horários disponíveis. Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  };

  const form = useForm<AgendamentoFormValues>({
    resolver: zodResolver(agendamentoFormSchema),
    defaultValues: {
      observacoes: "",
    },
  });

  const handleProfissionalSelect = (profissionalId: string) => {
    const profissional = profissionais.find(p => p.id === profissionalId);
    if (profissional) {
      setSelectedProfissional(profissional);
      form.setValue("profissional", profissional.id);
      form.setValue("especialidade", profissional.especialidade);
      setCurrentStep(2);
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      form.setValue("data", date);
    }
  };

  const handleModalidadeSelect = (value: "presencial" | "online") => {
    setModalidade(value);
    form.setValue("modalidade", value);
  };

  const handleHorarioSelect = (horario: string) => {
    form.setValue("horario", horario);
    setCurrentStep(3);
  };

  async function onSubmit(data: AgendamentoFormValues) {
    try {
      setIsSubmitting(true);
      
      // Aqui seria feita a chamada para um endpoint seguro do backend
      // Exemplo: await fetch("/api/agendamentos/public", { method: "POST", body: JSON.stringify(data) });
      
      // Simulando uma chamada de API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Agendamento solicitado com sucesso!",
        description: "Você receberá uma confirmação por email em breve.",
      });
      
      form.reset();
      setIsSuccess(true);
    } catch (error) {
      toast({
        title: "Erro ao agendar consulta",
        description: "Ocorreu um erro ao processar sua solicitação. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container py-4 px-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">LuminaCare</h1>
          <a 
            href="/" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Área Restrita
          </a>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button variant="ghost" className="pl-0" onClick={() => window.history.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
        </div>

        <div className="medical-card max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-2">Agende sua Consulta</h1>
          <p className="text-center text-muted-foreground mb-8">
            Selecione um profissional, data e horário para agendar sua consulta
          </p>

          {isSuccess ? (
            <Alert className="mb-8 bg-green-50 border-green-200">
              <AlertTitle className="text-green-600">Agendamento solicitado com sucesso!</AlertTitle>
              <AlertDescription>
                Sua solicitação foi recebida. Entraremos em contato por email para confirmar seu agendamento.
                <div className="mt-4">
                  <Button onClick={() => {
                    setIsSuccess(false);
                    setCurrentStep(1);
                    setSelectedProfissional(null);
                    setSelectedDate(null);
                    setModalidade(null);
                  }}>Fazer novo agendamento</Button>
                </div>
              </AlertDescription>
            </Alert>
          ) : (
            <div>
              {/* Stepper */}
              <div className="mb-8">
                <div className="flex justify-between">
                  <div className="text-center flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep === 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                      1
                    </div>
                    <span className="text-sm mt-1">Profissional</span>
                  </div>
                  <div className="text-center flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep === 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                      2
                    </div>
                    <span className="text-sm mt-1">Data e Hora</span>
                  </div>
                  <div className="text-center flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep === 3 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                      3
                    </div>
                    <span className="text-sm mt-1">Dados</span>
                  </div>
                </div>
              </div>

              {/* Profissionais selection step */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-xl font-medium mb-4">Selecione um profissional</h2>
                  
                  {/* Filter by specialty */}
                  <div className="mb-6">
                    <FormLabel>Filtrar por especialidade</FormLabel>
                    <Select onValueChange={(value) => {
                      // Filter professionals by specialty
                    }}>
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
                    {profissionais.map((profissional) => (
                      <Card 
                        key={profissional.id} 
                        className={`cursor-pointer transition-all hover:border-primary ${selectedProfissional?.id === profissional.id ? 'border-primary ring-1 ring-primary' : ''}`}
                        onClick={() => handleProfissionalSelect(profissional.id)}
                      >
                        <CardHeader className="flex flex-row items-center gap-4 pb-2">
                          <Avatar className="h-16 w-16">
                            {profissional.imagem ? (
                              <AvatarImage src={profissional.imagem} alt={profissional.nome} />
                            ) : (
                              <AvatarFallback>{profissional.nome.substring(0, 2).toUpperCase()}</AvatarFallback>
                            )}
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">{profissional.nome}</CardTitle>
                            <CardDescription className="text-sm">
                              {profissional.especialidade}<br/>
                              {profissional.crm}
                            </CardDescription>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-4 text-sm text-muted-foreground">
                          <p className="line-clamp-3">{profissional.biografia}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Date and time selection step */}
              {currentStep === 2 && selectedProfissional && (
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
                        onSelect={handleDateSelect}
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
                          onClick={() => handleModalidadeSelect("presencial")}
                        >
                          Presencial
                        </Button>
                        <Button
                          type="button"
                          variant={modalidade === "online" ? "default" : "outline"}
                          className="flex-1"
                          onClick={() => handleModalidadeSelect("online")}
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
                                    form.getValues("horario") === slot.hora && "border-primary ring-1 ring-primary",
                                    !slot.disponivel && "line-through bg-muted/50"
                                  )}
                                  onClick={() => slot.disponivel && handleHorarioSelect(slot.hora)}
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
                      onClick={() => {
                        setCurrentStep(1);
                        setSelectedDate(null);
                        setModalidade(null);
                      }}
                    >
                      Voltar
                    </Button>
                    <Button 
                      type="button" 
                      onClick={() => setCurrentStep(3)}
                      disabled={!selectedDate || !modalidade || !form.getValues("horario")}
                    >
                      Continuar
                    </Button>
                  </div>
                </div>
              )}

              {/* Dados pessoais step */}
              {currentStep === 3 && (
                <div>
                  <div className="bg-muted/30 rounded-lg p-4 mb-6">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div className="flex items-center gap-4 mb-4 md:mb-0">
                        <Avatar className="h-12 w-12">
                          {selectedProfissional?.imagem ? (
                            <AvatarImage src={selectedProfissional.imagem} alt={selectedProfissional.nome} />
                          ) : (
                            <AvatarFallback>{selectedProfissional?.nome.substring(0, 2).toUpperCase()}</AvatarFallback>
                          )}
                        </Avatar>
                        <div>
                          <p className="font-medium">{selectedProfissional?.nome}</p>
                          <p className="text-sm text-muted-foreground">{selectedProfissional?.especialidade}</p>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                          <p>{selectedDate ? format(selectedDate, "'Dia' dd 'de' MMMM", { locale: ptBR }) : ''}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <p>{form.getValues("horario")} - {modalidade === "presencial" ? "Presencial" : "Online"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Important change: Properly wrapping form fields in Form component */}
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="nome"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nome completo</FormLabel>
                              <FormControl>
                                <Input placeholder="Digite seu nome completo" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="seu@email.com" type="email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="telefone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Telefone</FormLabel>
                              <FormControl>
                                <Input placeholder="(11) 98765-4321" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="convenio"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Convênio</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecione seu convênio" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {convenios.map((convenio) => (
                                    <SelectItem key={convenio} value={convenio}>
                                      {convenio}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="observacoes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Motivo da consulta ou observações</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Descreva brevemente o motivo da consulta ou qualquer observação importante"
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="mt-6 flex justify-between">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setCurrentStep(2)}
                        >
                          Voltar
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                          {isSubmitting ? "Enviando..." : "Confirmar Agendamento"}
                        </Button>
                      </div>

                      <p className="text-xs text-center text-muted-foreground mt-4">
                        Ao solicitar um agendamento, você concorda com nossa 
                        política de privacidade e termos de uso.
                      </p>
                    </form>
                  </Form>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <footer className="mt-8 border-t bg-muted/40">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} LuminaCare - Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default PublicAgendamentoPage;
