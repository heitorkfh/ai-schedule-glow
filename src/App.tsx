
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/layout/Dashboard";
import DashboardPage from "./pages/DashboardPage";
import AgendamentosPage from "./pages/AgendamentosPage";
import NovoAgendamentoPage from "./pages/NovoAgendamentoPage";
import PacientesPage from "./pages/PacientesPage";
import NovoPacientePage from "./pages/NovoPacientePage";
import ProntuariosPage from "./pages/ProntuariosPage";
import AssistenteIAPage from "./pages/AssistenteIAPage";
import AnalisesPage from "./pages/AnalisesPage";
import ConfiguracoesPage from "./pages/ConfiguracoesPage";
import PublicAgendamentoPage from "./pages/PublicAgendamentoPage";
import NotFound from "./pages/NotFound";

// Marketing pages
import LeadsPage from "./pages/marketing/LeadsPage";
import DisparosPage from "./pages/marketing/DisparosPage";
import NovoDisparoPage from "./pages/marketing/NovoDisparoPage";
import FerramentasPage from "./pages/marketing/FerramentasPage";
import ConfiguracoesMarketingPage from "./pages/marketing/ConfiguracoesMarketingPage";

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
          <Route path="/agendamentos/novo" element={<Dashboard><NovoAgendamentoPage /></Dashboard>} />
          <Route path="/pacientes" element={<Dashboard><PacientesPage /></Dashboard>} />
          <Route path="/pacientes/novo" element={<Dashboard><NovoPacientePage /></Dashboard>} />
          <Route path="/prontuarios" element={<Dashboard><ProntuariosPage /></Dashboard>} />
          <Route path="/assistente-ia" element={<Dashboard><AssistenteIAPage /></Dashboard>} />
          <Route path="/analises" element={<Dashboard><AnalisesPage /></Dashboard>} />
          <Route path="/configuracoes" element={<Dashboard><ConfiguracoesPage /></Dashboard>} />
          
          {/* Rotas de marketing */}
          <Route path="/marketing/leads" element={<Dashboard><LeadsPage /></Dashboard>} />
          <Route path="/marketing/disparos" element={<Dashboard><DisparosPage /></Dashboard>} />
          <Route path="/marketing/disparos/novo" element={<Dashboard><NovoDisparoPage /></Dashboard>} />
          <Route path="/marketing/ferramentas" element={<Dashboard><FerramentasPage /></Dashboard>} />
          <Route path="/marketing/configuracoes" element={<Dashboard><ConfiguracoesMarketingPage /></Dashboard>} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
