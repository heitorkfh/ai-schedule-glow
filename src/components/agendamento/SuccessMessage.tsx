
import React from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface SuccessMessageProps {
  onReset: () => void;
}

const SuccessMessage = ({ onReset }: SuccessMessageProps) => {
  return (
    <Alert className="mb-8 bg-green-50 border-green-200">
      <AlertTitle className="text-green-600">Agendamento solicitado com sucesso!</AlertTitle>
      <AlertDescription>
        Sua solicitação foi recebida. Entraremos em contato por email para confirmar seu agendamento.
        <div className="mt-4">
          <Button onClick={onReset}>Fazer novo agendamento</Button>
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default SuccessMessage;
