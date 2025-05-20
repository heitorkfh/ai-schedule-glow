
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CalendarIcon, Clock } from "lucide-react";
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
  observacoes: z.string().optional(),
});

type AgendamentoFormValues = z.infer<typeof agendamentoFormSchema>;

const PublicAgendamentoPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Horários disponíveis
  const horarios = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
    "11:00", "11:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30"
  ];

  // Especialidades médicas
  const especialidades = [
    "Clínica Geral",
    "Cardiologia",
    "Dermatologia",
    "Ginecologia",
    "Neurologia",
    "Oftalmologia",
    "Ortopedia",
    "Pediatria",
    "Psiquiatria",
  ];

  const form = useForm<AgendamentoFormValues>({
    resolver: zodResolver(agendamentoFormSchema),
    defaultValues: {
      observacoes: "",
    },
  });

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

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="medical-card">
          <h1 className="text-3xl font-bold text-center mb-2">Agende sua Consulta</h1>
          <p className="text-center text-muted-foreground mb-8">
            Preencha o formulário abaixo para solicitar um horário com nossos especialistas.
          </p>

          {isSuccess ? (
            <Alert className="mb-8 bg-green-50 border-green-200">
              <AlertTitle className="text-green-600">Agendamento solicitado com sucesso!</AlertTitle>
              <AlertDescription>
                Sua solicitação foi recebida. Entraremos em contato por email para confirmar seu agendamento.
                <div className="mt-4">
                  <Button onClick={() => setIsSuccess(false)}>Fazer novo agendamento</Button>
                </div>
              </AlertDescription>
            </Alert>
          ) : (
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
                    name="especialidade"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Especialidade</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione uma especialidade" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {especialidades.map((especialidade) => (
                              <SelectItem key={especialidade} value={especialidade}>
                                {especialidade}
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
                    name="data"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Data da consulta</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP", { locale: ptBR })
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
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date() || // Datas passadas
                                date > new Date(new Date().setMonth(new Date().getMonth() + 3)) || // Máximo 3 meses à frente
                                date.getDay() === 0 || // Domingo
                                date.getDay() === 6 // Sábado
                              }
                              initialFocus
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
                              <SelectValue placeholder="Selecione um horário">
                                <div className="flex items-center gap-2">
                                  {field.value && (
                                    <>
                                      <Clock className="h-4 w-4" />
                                      <span>{field.value}</span>
                                    </>
                                  )}
                                </div>
                              </SelectValue>
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {horarios.map((horario) => (
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

                <div className="mt-6">
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Enviando..." : "Solicitar Agendamento"}
                  </Button>
                </div>

                <p className="text-xs text-center text-muted-foreground mt-4">
                  Ao solicitar um agendamento, você concorda com nossa 
                  política de privacidade e termos de uso.
                </p>
              </form>
            </Form>
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
