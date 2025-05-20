
import React from "react";
import { Profissional } from "@/types/agendamento";
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfissionalCardProps {
  profissional: Profissional;
  selected: boolean;
  onSelect: (id: string) => void;
}

const ProfissionalCard = ({ profissional, selected, onSelect }: ProfissionalCardProps) => {
  return (
    <Card 
      className={`cursor-pointer transition-all hover:border-primary ${selected ? 'border-primary ring-1 ring-primary' : ''}`}
      onClick={() => onSelect(profissional.id)}
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
  );
};

export default ProfissionalCard;
