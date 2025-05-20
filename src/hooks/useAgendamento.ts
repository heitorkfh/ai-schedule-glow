
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { agendamentoFormSchema, AgendamentoFormValues, Profissional, HorarioDisponivel } from "@/types/agendamento";

export const useAgendamento = () => {
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

  const form = useForm<AgendamentoFormValues>({
    resolver: zodResolver(agendamentoFormSchema),
    defaultValues: {
      observacoes: "",
    },
  });

  // Load initial data
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
  };
  
  const goToNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const goToPrevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (data: AgendamentoFormValues) => {
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
  };

  const resetForm = () => {
    setIsSuccess(false);
    setCurrentStep(1);
    setSelectedProfissional(null);
    setSelectedDate(null);
    setModalidade(null);
    form.reset();
  };

  return {
    currentStep,
    form,
    isSubmitting,
    isSuccess,
    selectedProfissional,
    selectedDate,
    modalidade,
    horariosDisponiveis,
    profissionais,
    especialidades,
    convenios,
    handleProfissionalSelect,
    handleDateSelect,
    handleModalidadeSelect,
    handleHorarioSelect,
    handleSubmit,
    goToNextStep,
    goToPrevStep,
    resetForm
  };
};
