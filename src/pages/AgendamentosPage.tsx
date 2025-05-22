
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Calendar as CalendarIcon, List, Clock } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useNavigate } from "react-router-dom";

const AgendamentosPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const navigate = useNavigate();
  
  // SEO optimization
  useEffect(() => {
    document.title = "Agendamentos | LuminaCare - Gestão de Consultas com IA";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", 
        "Gerencie seus agendamentos médicos com facilidade usando inteligência artificial para otimizar sua agenda");
    }
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Agendamentos</h1>
          <p className="text-muted-foreground mt-2">
            Gerencie e organize as consultas de forma inteligente.
          </p>
        </div>
        
        <Button className="gap-2" onClick={() => navigate("/agendamentos/novo")}>
          <Plus className="h-4 w-4" />
          Novo Agendamento
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 md:max-w-[300px] lg:max-w-[380px] h-fit">
          <Card>
            <CardHeader>
              <CardTitle>Calendário</CardTitle>
              <CardDescription>Selecione uma data para ver os agendamentos</CardDescription>
            </CardHeader>
            <CardContent className="pb-6">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border mx-auto pointer-events-auto"
                locale={ptBR}
              />
            </CardContent>
          </Card>
        </div>
        
        <div className="flex-1">
          <Tabs defaultValue="today" className="w-full">
            <div className="flex items-center justify-between mb-4">
              <TabsList className="grid grid-cols-3 w-fit">
                <TabsTrigger value="today" className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">Hoje</span>
                </TabsTrigger>
                <TabsTrigger value="upcoming" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span className="hidden sm:inline">Próximos</span>
                </TabsTrigger>
                <TabsTrigger value="all" className="flex items-center gap-2">
                  <List className="h-4 w-4" />
                  <span className="hidden sm:inline">Todos</span>
                </TabsTrigger>
              </TabsList>
              
              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      <span>{date ? format(date, "dd/MM/yyyy") : "Selecionar data"}</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <TabsContent value="today">
              <Card>
                <CardHeader>
                  <CardTitle>Agendamentos de Hoje</CardTitle>
                  <CardDescription>
                    {format(new Date(), "'Hoje é' EEEE, d 'de' MMMM", { locale: ptBR })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { id: 1, time: "09:00", name: "João Santos", type: "Consulta - Rotina", status: "Confirmado" },
                      { id: 2, time: "10:00", name: "Fernanda Lima", type: "Consulta - Primeira vez", status: "Confirmado" },
                      { id: 3, time: "11:30", name: "Ana Pereira", type: "Retorno", status: "Check-in" },
                      { id: 4, time: "14:30", name: "Maria Silva", type: "Consulta - Retorno", status: "Agendado" },
                      { id: 5, time: "16:00", name: "Carlos Mendes", type: "Exame", status: "Agendado" }
                    ].map((appointment) => (
                      <div 
                        key={appointment.id}
                        className="flex flex-wrap md:flex-nowrap items-center justify-between p-4 bg-background rounded-lg border hover:border-medical-300 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-4 w-full md:w-auto mb-2 md:mb-0">
                          <div className="bg-medical-100 text-medical-800 text-sm font-medium rounded-md px-3 py-2 min-w-[70px] text-center">
                            {appointment.time}
                          </div>
                          <div>
                            <div className="font-medium">{appointment.name}</div>
                            <div className="text-sm text-muted-foreground">{appointment.type}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                            appointment.status === "Check-in" 
                              ? "bg-healing-100 text-healing-800" 
                              : appointment.status === "Confirmado"
                                ? "bg-medical-100 text-medical-800"
                                : "bg-muted text-muted-foreground"
                          }`}>
                            {appointment.status}
                          </span>
                          <Button variant="ghost" size="sm">
                            Detalhes
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="upcoming">
              <Card>
                <CardHeader>
                  <CardTitle>Próximos Agendamentos</CardTitle>
                  <CardDescription>
                    Consultas para os próximos dias
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { id: 1, date: "Amanhã", time: "10:30", name: "Ricardo Oliveira", type: "Consulta - Rotina", status: "Agendado" },
                      { id: 2, date: "Amanhã", time: "15:00", name: "Luciana Santos", type: "Consulta - Primeira vez", status: "Confirmado" },
                      { id: 3, date: "22/05/2025", time: "09:15", name: "Paulo Ferreira", type: "Exame", status: "Agendado" },
                      { id: 4, date: "22/05/2025", time: "14:00", name: "Márcia Andrade", type: "Consulta - Retorno", status: "Confirmado" }
                    ].map((appointment) => (
                      <div 
                        key={appointment.id}
                        className="flex flex-wrap md:flex-nowrap items-center justify-between p-4 bg-background rounded-lg border hover:border-medical-300 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-4 w-full md:w-auto mb-2 md:mb-0">
                          <div className="flex flex-col bg-medical-100 text-medical-800 text-sm font-medium rounded-md px-3 py-2 min-w-[70px] text-center">
                            <span>{appointment.time}</span>
                            <span className="text-xs text-medical-600">{appointment.date}</span>
                          </div>
                          <div>
                            <div className="font-medium">{appointment.name}</div>
                            <div className="text-sm text-muted-foreground">{appointment.type}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                            appointment.status === "Confirmado" 
                              ? "bg-medical-100 text-medical-800"
                              : "bg-muted text-muted-foreground"
                          }`}>
                            {appointment.status}
                          </span>
                          <Button variant="ghost" size="sm">
                            Detalhes
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="all">
              <Card>
                <CardHeader>
                  <CardTitle>Todos os Agendamentos</CardTitle>
                  <CardDescription>
                    Histórico completo de agendamentos
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 bg-muted/50 py-3 px-4">
                      <div className="col-span-2 font-medium text-sm">Data/Hora</div>
                      <div className="col-span-3 font-medium text-sm">Paciente</div>
                      <div className="col-span-3 font-medium text-sm">Tipo</div>
                      <div className="col-span-2 font-medium text-sm">Status</div>
                      <div className="col-span-2 font-medium text-sm text-right">Ações</div>
                    </div>
                    
                    {[
                      { id: 1, date: "20/05/2025", time: "09:00", name: "João Santos", type: "Consulta - Rotina", status: "Concluído" },
                      { id: 2, date: "20/05/2025", time: "11:30", name: "Ana Pereira", type: "Retorno", status: "Concluído" },
                      { id: 3, date: "21/05/2025", time: "10:30", name: "Ricardo Oliveira", type: "Consulta - Rotina", status: "Agendado" },
                      { id: 4, date: "21/05/2025", time: "15:00", name: "Luciana Santos", type: "Primeira vez", status: "Confirmado" },
                      { id: 5, date: "22/05/2025", time: "09:15", name: "Paulo Ferreira", type: "Exame", status: "Agendado" },
                      { id: 6, date: "22/05/2025", time: "14:00", name: "Márcia Andrade", type: "Consulta - Retorno", status: "Confirmado" }
                    ].map((appointment, index) => (
                      <div 
                        key={appointment.id}
                        className={`grid grid-cols-12 px-4 py-3 items-center ${
                          index % 2 === 0 ? "bg-background" : "bg-background/50"
                        } hover:bg-muted/20`}
                      >
                        <div className="col-span-2 text-sm">
                          <div>{appointment.date}</div>
                          <div className="text-muted-foreground">{appointment.time}</div>
                        </div>
                        <div className="col-span-3 text-sm">{appointment.name}</div>
                        <div className="col-span-3 text-sm">{appointment.type}</div>
                        <div className="col-span-2">
                          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                            appointment.status === "Concluído" 
                              ? "bg-healing-100 text-healing-800" 
                              : appointment.status === "Confirmado"
                                ? "bg-medical-100 text-medical-800"
                                : "bg-muted text-muted-foreground"
                          }`}>
                            {appointment.status}
                          </span>
                        </div>
                        <div className="col-span-2 text-right">
                          <Button variant="ghost" size="sm" className="h-8 px-2">
                            Detalhes
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AgendamentosPage;
