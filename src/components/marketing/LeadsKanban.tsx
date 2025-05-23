
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Define types
type Lead = {
  id: number;
  nome: string;
  telefone: string;
  email: string;
  origem: string;
  status: string;
  ultima_interacao: string;
};

type LeadsKanbanProps = {
  leads: Lead[];
  onStatusChange: (leadId: number, newStatus: string) => void;
};

// Define the status columns
const STATUS_COLUMNS = ["Novo", "Em contato", "Convertido"];

export const LeadsKanban = ({ leads, onStatusChange }: LeadsKanbanProps) => {
  const [draggedLead, setDraggedLead] = useState<Lead | null>(null);

  // Group leads by status
  const groupedLeads = leads.reduce((acc, lead) => {
    if (!acc[lead.status]) {
      acc[lead.status] = [];
    }
    acc[lead.status].push(lead);
    return acc;
  }, {} as Record<string, Lead[]>);

  // Handle drag start
  const handleDragStart = (lead: Lead) => {
    setDraggedLead(lead);
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Handle drop
  const handleDrop = (e: React.DragEvent, status: string) => {
    e.preventDefault();
    if (draggedLead && draggedLead.status !== status) {
      onStatusChange(draggedLead.id, status);
      setDraggedLead(null);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {STATUS_COLUMNS.map((status) => (
        <div
          key={status}
          className="h-full flex flex-col"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, status)}
        >
          <Card className="h-full flex flex-col">
            <CardHeader className="pb-2">
              <CardTitle className="text-md font-medium flex items-center justify-between">
                <div>{status}</div>
                <Badge className={`${
                  status === 'Novo' ? 'bg-blue-100 text-blue-800' : 
                  status === 'Em contato' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-green-100 text-green-800'
                }`}>
                  {(groupedLeads[status] || []).length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto">
              <div className="space-y-2">
                {(groupedLeads[status] || []).map((lead) => (
                  <div
                    key={lead.id}
                    draggable
                    onDragStart={() => handleDragStart(lead)}
                    className="bg-white border rounded-md p-3 shadow-sm cursor-grab hover:shadow-md transition-shadow"
                  >
                    <div className="font-medium">{lead.nome}</div>
                    <div className="text-sm text-muted-foreground">{lead.email}</div>
                    <div className="text-xs text-muted-foreground mt-1 flex justify-between items-center">
                      <span>{lead.origem}</span>
                      <span>última interação: {lead.ultima_interacao}</span>
                    </div>
                  </div>
                ))}
                {(groupedLeads[status] || []).length === 0 && (
                  <div className="text-center text-muted-foreground p-4 border border-dashed rounded-md">
                    <p className="text-sm">Arraste leads para esta coluna</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};
