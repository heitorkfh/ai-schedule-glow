
import React from "react";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAgendamento } from "@/hooks/useAgendamento";
import StepIndicator from "@/components/agendamento/StepIndicator";
import ProfissionalSelector from "@/components/agendamento/ProfissionalSelector";
import DateTimeSelector from "@/components/agendamento/DateTimeSelector";
import PersonalDataForm from "@/components/agendamento/PersonalDataForm";
import SuccessMessage from "@/components/agendamento/SuccessMessage";

const PublicAgendamentoPage = () => {
  const {
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
  } = useAgendamento();

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

        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-2">Agende sua Consulta</h1>
          <p className="text-center text-muted-foreground mb-8">
            Selecione um profissional, data e horário para agendar sua consulta
          </p>

          {isSuccess ? (
            <SuccessMessage onReset={resetForm} />
          ) : (
            <div>
              {/* Stepper */}
              <StepIndicator 
                currentStep={currentStep}
                totalSteps={3}
                stepLabels={["Profissional", "Data e Hora", "Dados"]}
              />

              {/* Step 1: Profissionais selection */}
              {currentStep === 1 && (
                <ProfissionalSelector
                  profissionais={profissionais}
                  especialidades={especialidades}
                  selectedProfissional={selectedProfissional}
                  onProfissionalSelect={handleProfissionalSelect}
                />
              )}

              {/* Step 2: Date and time selection */}
              {currentStep === 2 && selectedProfissional && (
                <DateTimeSelector
                  selectedProfissional={selectedProfissional}
                  selectedDate={selectedDate}
                  onDateSelect={handleDateSelect}
                  modalidade={modalidade}
                  onModalidadeSelect={handleModalidadeSelect}
                  horariosDisponiveis={horariosDisponiveis}
                  selectedHorario={form.getValues("horario")}
                  onHorarioSelect={(horario) => {
                    handleHorarioSelect(horario);
                    goToNextStep();
                  }}
                  onBack={goToPrevStep}
                  onContinue={goToNextStep}
                />
              )}

              {/* Step 3: Dados pessoais */}
              {currentStep === 3 && (
                <PersonalDataForm
                  form={form}
                  onSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                  convenios={convenios}
                  onBack={goToPrevStep}
                  selectedProfissional={selectedProfissional}
                  selectedDate={selectedDate}
                  modalidade={modalidade}
                />
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
