
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PacientesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // SEO optimization
  useEffect(() => {
    document.title = "Pacientes | LuminaCare - Gestão de Pacientes com IA";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", 
        "Gerencie suas informações de pacientes e acompanhe históricos médicos com análise inteligente de IA");
    }
  }, []);

  const patients = [
    { id: 1, name: "Ana Silva", email: "ana.silva@email.com", phone: "(11) 98765-4321", lastAppointment: "15/05/2025", nextAppointment: "22/05/2025", status: "Regular" },
    { id: 2, name: "Carlos Oliveira", email: "carlos.oliveira@email.com", phone: "(11) 91234-5678", lastAppointment: "10/05/2025", nextAppointment: "24/05/2025", status: "Regular" },
    { id: 3, name: "Beatriz Santos", email: "beatriz.santos@email.com", phone: "(11) 99876-5432", lastAppointment: "05/05/2025", nextAppointment: "05/06/2025", status: "Regular" },
    { id: 4, name: "Daniel Pereira", email: "daniel.pereira@email.com", phone: "(11) 92345-6789", lastAppointment: "25/04/2025", nextAppointment: "25/05/2025", status: "Novo" },
    { id: 5, name: "Eduarda Lima", email: "eduarda.lima@email.com", phone: "(11) 93456-7890", lastAppointment: "20/04/2025", nextAppointment: "20/05/2025", status: "Regular" },
    { id: 6, name: "Fábio Costa", email: "fabio.costa@email.com", phone: "(11) 94567-8901", lastAppointment: "-", nextAppointment: "21/05/2025", status: "Novo" },
    { id: 7, name: "Gabriela Martins", email: "gabriela.martins@email.com", phone: "(11) 95678-9012", lastAppointment: "18/04/2025", nextAppointment: "-", status: "Inativo" },
  ];

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.phone.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pacientes</h1>
          <p className="text-muted-foreground mt-2">
            Gerencie seus pacientes e históricos médicos.
          </p>
        </div>
        
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Paciente
        </Button>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar pacientes..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  <span>Filtros</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Status do Paciente</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Todos</DropdownMenuItem>
                <DropdownMenuItem>Pacientes Regulares</DropdownMenuItem>
                <DropdownMenuItem>Pacientes Novos</DropdownMenuItem>
                <DropdownMenuItem>Pacientes Inativos</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button variant="ghost">
              Exportar
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4 w-full sm:w-fit">
            <TabsTrigger value="all" className="flex-1 sm:flex-none">Todos</TabsTrigger>
            <TabsTrigger value="regular" className="flex-1 sm:flex-none">Regulares</TabsTrigger>
            <TabsTrigger value="new" className="flex-1 sm:flex-none">Novos</TabsTrigger>
            <TabsTrigger value="inactive" className="flex-1 sm:flex-none">Inativos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>Todos os Pacientes</CardTitle>
                <CardDescription>
                  Listagem completa de pacientes cadastrados no sistema
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 bg-muted/50 py-3 px-4 hidden md:grid">
                    <div className="col-span-4 font-medium text-sm">Nome</div>
                    <div className="col-span-2 font-medium text-sm hidden lg:block">Telefone</div>
                    <div className="col-span-2 font-medium text-sm">Última Consulta</div>
                    <div className="col-span-2 font-medium text-sm">Próxima</div>
                    <div className="col-span-2 font-medium text-sm text-right">Ações</div>
                  </div>
                  
                  <div className="divide-y">
                    {filteredPatients.length > 0 ? (
                      filteredPatients.map((patient) => (
                        <div key={patient.id} className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-0 p-4 items-center hover:bg-muted/20">
                          <div className="col-span-4 flex items-center gap-3">
                            <Avatar className="h-10 w-10 hidden sm:flex">
                              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${patient.name}`} alt={patient.name} />
                              <AvatarFallback>{patient.name.split(' ').map(n => n[0]).join('').toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{patient.name}</div>
                              <div className="text-sm text-muted-foreground hidden sm:block">{patient.email}</div>
                            </div>
                          </div>
                          <div className="col-span-2 hidden lg:block text-sm">{patient.phone}</div>
                          <div className="col-span-2 text-sm"><span className="inline md:hidden font-medium mr-2">Última:</span>{patient.lastAppointment}</div>
                          <div className="col-span-2 text-sm"><span className="inline md:hidden font-medium mr-2">Próxima:</span>{patient.nextAppointment}</div>
                          <div className="col-span-2 flex items-center justify-between md:justify-end gap-2">
                            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                              patient.status === "Novo" 
                                ? "bg-medical-100 text-medical-800" 
                                : patient.status === "Regular"
                                  ? "bg-healing-100 text-healing-800"
                                  : "bg-muted text-muted-foreground"
                            }`}>
                              {patient.status}
                            </span>
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              Detalhes
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-8 text-center text-muted-foreground">
                        Nenhum paciente encontrado com o termo "{searchQuery}"
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="regular">
            <Card>
              <CardHeader>
                <CardTitle>Pacientes Regulares</CardTitle>
                <CardDescription>
                  Pacientes com consultas frequentes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Lista de pacientes com status "Regular"
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="new">
            <Card>
              <CardHeader>
                <CardTitle>Pacientes Novos</CardTitle>
                <CardDescription>
                  Pacientes recém-cadastrados no sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Lista de pacientes com status "Novo"
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="inactive">
            <Card>
              <CardHeader>
                <CardTitle>Pacientes Inativos</CardTitle>
                <CardDescription>
                  Pacientes sem consultas recentes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Lista de pacientes com status "Inativo"
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PacientesPage;
