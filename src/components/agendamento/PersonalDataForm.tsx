
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage 
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { AgendamentoFormValues } from "@/types/agendamento";
import AppointmentSummary from "./AppointmentSummary";

interface PersonalDataFormProps {
  form: UseFormReturn<AgendamentoFormValues>;
  onSubmit: (data: AgendamentoFormValues) => Promise<void>;
  isSubmitting: boolean;
  convenios: string[];
  onBack: () => void;
  selectedProfissional: any;
  selectedDate: Date | null;
  modalidade: "presencial" | "online" | null;
}

const PersonalDataForm = ({
  form,
  onSubmit,
  isSubmitting,
  convenios,
  onBack,
  selectedProfissional,
  selectedDate,
  modalidade
}: PersonalDataFormProps) => {
  return (
    <div>
      <AppointmentSummary
        selectedProfissional={selectedProfissional}
        selectedDate={selectedDate}
        selectedHorario={form.getValues("horario")}
        modalidade={modalidade}
      />
      
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
              onClick={onBack}
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
  );
};

export default PersonalDataForm;
