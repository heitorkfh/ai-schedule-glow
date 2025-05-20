
import { z } from "zod";

// Form schema for validation
export const agendamentoFormSchema = z.object({
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

export type AgendamentoFormValues = z.infer<typeof agendamentoFormSchema>;

// Interface for professional data
export interface Profissional {
  id: string;
  nome: string;
  especialidade: string;
  crm?: string;
  imagem?: string;
  biografia?: string;
}

// Interface for available time slots
export interface HorarioDisponivel {
  hora: string;
  disponivel: boolean;
}
