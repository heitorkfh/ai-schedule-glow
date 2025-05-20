
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/layout/Dashboard";
import DashboardPage from "./pages/DashboardPage";
import AgendamentosPage from "./pages/AgendamentosPage";
import PacientesPage from "./pages/PacientesPage";
import ProntuariosPage from "./pages/ProntuariosPage";
import AssistenteIAPage from "./pages/AssistenteIAPage";
import AnalisesPage from "./pages/AnalisesPage";
import ConfiguracoesPage from "./pages/ConfiguracoesPage";
import PublicAgendamentoPage from "./pages/PublicAgendamentoPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Rota pública para agendamento */}
          <Route path="/agendar" element={<PublicAgendamentoPage />} />
          
          {/* Rotas protegidas do dashboard */}
          <Route path="/" element={<Dashboard><DashboardPage /></Dashboard>} />
          <Route path="/agendamentos" element={<Dashboard><AgendamentosPage /></Dashboard>} />
          <Route path="/pacientes" element={<Dashboard><PacientesPage /></Dashboard>} />
          <Route path="/prontuarios" element={<Dashboard><ProntuariosPage /></Dashboard>} />
          <Route path="/assistente-ia" element={<Dashboard><AssistenteIAPage /></Dashboard>} />
          <Route path="/analises" element={<Dashboard><AnalisesPage /></Dashboard>} />
          <Route path="/configuracoes" element={<Dashboard><ConfiguracoesPage /></Dashboard>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
