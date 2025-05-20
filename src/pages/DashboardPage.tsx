
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, Activity, Calendar as CalendarIcon } from "lucide-react";
import { useEffect } from "react";

const DashboardPage = () => {
  // SEO optimization
  useEffect(() => {
    document.title = "LuminaCare | Dashboard Médico com IA";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", 
        "LuminaCare - Sistema inteligente de gestão médica com IA para otimização de agendamentos e atendimentos");
    }
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Bem-vindo ao LuminaCare</h1>
        <p className="text-muted-foreground mt-2">
          Gerencie sua clínica com eficiência e inteligência artificial.
        </p>
      </div>

      {/* Stats overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Agendamentos</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">
              4 consultas hoje
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Pacientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">145</div>
            <p className="text-xs text-muted-foreground mt-1">
              +3 novos esta semana
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Taxa de Presença</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground mt-1">
              +2% comparado ao mês anterior
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Próxima Consulta</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14:30</div>
            <p className="text-xs text-muted-foreground mt-1">
              Maria Silva - Dermatologia
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Dashboard main content */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Consultas de Hoje</CardTitle>
            <CardDescription>
              Visualize e gerencie as consultas do dia
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Appointment items */}
            {[
              { time: "09:00", name: "João Santos", type: "Rotina", status: "Concluído" },
              { time: "11:30", name: "Ana Pereira", type: "Retorno", status: "Concluído" },
              { time: "14:30", name: "Maria Silva", type: "Primeira vez", status: "Agendado" },
              { time: "16:00", name: "Carlos Mendes", type: "Exame", status: "Agendado" }
            ].map((appointment, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-3 bg-background rounded-md border"
              >
                <div className="flex items-center gap-3">
                  <div className="font-medium">{appointment.time}</div>
                  <div>
                    <div className="font-medium">{appointment.name}</div>
                    <div className="text-sm text-muted-foreground">{appointment.type}</div>
                  </div>
                </div>
                <div>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    appointment.status === "Concluído" 
                      ? "bg-healing-100 text-healing-800" 
                      : "bg-medical-100 text-medical-800"
                  }`}>
                    {appointment.status}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2 lg:col-span-4">
          <CardHeader>
            <CardTitle>IA Analytics</CardTitle>
            <CardDescription>
              Insights inteligentes para otimizar sua prática
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-md bg-background/50">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-medical-500 rounded-full"></span>
                  Padrões de Agendamento
                </h4>
                <p className="text-sm text-muted-foreground">
                  A IA detectou que terças e quintas têm maior taxa de cancelamento. 
                  Considere enviar lembretes adicionais nesses dias.
                </p>
              </div>
              
              <div className="p-4 border rounded-md bg-background/50">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-healing-500 rounded-full"></span>
                  Otimização de Disponibilidade
                </h4>
                <p className="text-sm text-muted-foreground">
                  Abrir horários adicionais nas segundas à tarde pode aumentar 
                  sua disponibilidade para pacientes prioritários.
                </p>
              </div>
              
              <div className="p-4 border rounded-md bg-background/50">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-medical-500 rounded-full"></span>
                  Lembretes Inteligentes
                </h4>
                <p className="text-sm text-muted-foreground">
                  5 pacientes precisam reagendar consultas de acompanhamento. 
                  Envie lembretes automaticamente?
                </p>
                <div className="flex gap-2 mt-3">
                  <button className="text-xs bg-medical-500 text-white px-3 py-1 rounded-md">
                    Enviar agora
                  </button>
                  <button className="text-xs bg-muted px-3 py-1 rounded-md">
                    Lembrar depois
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
