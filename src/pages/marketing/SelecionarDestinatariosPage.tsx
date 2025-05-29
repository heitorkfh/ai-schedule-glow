
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Users, ArrowLeft, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Contact {
  id: number;
  nome: string;
  telefone: string;
  email: string;
  tipo: 'paciente' | 'lead';
  status?: string;
  ultimaConsulta?: string;
  origem?: string;
}

const PACIENTES_DATA: Contact[] = [
  { id: 1, nome: 'Maria Silva', telefone: '(11) 99999-1111', email: 'maria@exemplo.com', tipo: 'paciente', ultimaConsulta: '10/05/2025' },
  { id: 2, nome: 'João Santos', telefone: '(11) 99999-2222', email: 'joao@exemplo.com', tipo: 'paciente', ultimaConsulta: '05/05/2025' },
  { id: 3, nome: 'Ana Pereira', telefone: '(11) 99999-3333', email: 'ana@exemplo.com', tipo: 'paciente', ultimaConsulta: '01/05/2025' },
  { id: 4, nome: 'Carlos Oliveira', telefone: '(11) 99999-4444', email: 'carlos@exemplo.com', tipo: 'paciente', ultimaConsulta: '08/05/2025' },
  { id: 5, nome: 'Patricia Costa', telefone: '(11) 99999-5555', email: 'patricia@exemplo.com', tipo: 'paciente', ultimaConsulta: '03/05/2025' }
];

const LEADS_DATA: Contact[] = [
  { id: 6, nome: 'Roberto Lima', telefone: '(11) 99999-6666', email: 'roberto@exemplo.com', tipo: 'lead', status: 'Novo', origem: 'Site' },
  { id: 7, nome: 'Fernanda Costa', telefone: '(11) 99999-7777', email: 'fernanda@exemplo.com', tipo: 'lead', status: 'Em contato', origem: 'Instagram' },
  { id: 8, nome: 'Lucas Martins', telefone: '(11) 99999-8888', email: 'lucas@exemplo.com', tipo: 'lead', status: 'Novo', origem: 'Facebook' },
  { id: 9, nome: 'Carla Rodrigues', telefone: '(11) 99999-9999', email: 'carla@exemplo.com', tipo: 'lead', status: 'Em contato', origem: 'Indicação' }
];

const SelecionarDestinatariosPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState("todos");

  const allContacts = [...PACIENTES_DATA, ...LEADS_DATA];

  const getFilteredContacts = () => {
    let contacts = allContacts;
    
    if (activeTab === "pacientes") {
      contacts = PACIENTES_DATA;
    } else if (activeTab === "leads") {
      contacts = LEADS_DATA;
    }

    if (searchTerm) {
      contacts = contacts.filter(contact => 
        contact.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.telefone.includes(searchTerm) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return contacts;
  };

  const filteredContacts = getFilteredContacts();

  const handleSelectContact = (contactId: number) => {
    setSelectedContacts(prev => 
      prev.includes(contactId) 
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  const handleSelectAll = () => {
    const allContactIds = filteredContacts.map(contact => contact.id);
    const allSelected = allContactIds.every(id => selectedContacts.includes(id));
    
    if (allSelected) {
      setSelectedContacts(prev => prev.filter(id => !allContactIds.includes(id)));
    } else {
      setSelectedContacts(prev => [...new Set([...prev, ...allContactIds])]);
    }
  };

  const handleContinue = () => {
    if (selectedContacts.length === 0) {
      toast({
        title: "Nenhum destinatário selecionado",
        description: "Selecione pelo menos um destinatário para continuar.",
        variant: "destructive",
      });
      return;
    }

    const selectedContactsData = allContacts.filter(contact => 
      selectedContacts.includes(contact.id)
    );

    // Aqui você passaria os dados selecionados para a próxima etapa
    console.log("Destinatários selecionados:", selectedContactsData);
    
    toast({
      title: "Destinatários selecionados",
      description: `${selectedContacts.length} destinatário(s) selecionado(s) para o disparo.`,
    });

    // Redirecionar para a página de criação do disparo com os destinatários
    navigate("/marketing/disparos/novo", { 
      state: { selectedContacts: selectedContactsData } 
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate("/marketing/disparos")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Selecionar Destinatários</h1>
          <p className="text-muted-foreground">
            Escolha os pacientes e leads para seu disparo de marketing
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar contatos..."
            className="w-full pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground">
            {selectedContacts.length} selecionado(s)
          </div>
          <Button onClick={handleContinue} disabled={selectedContacts.length === 0}>
            <Send className="mr-2 h-4 w-4" />
            Continuar ({selectedContacts.length})
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="todos">Todos ({allContacts.length})</TabsTrigger>
          <TabsTrigger value="pacientes">Pacientes ({PACIENTES_DATA.length})</TabsTrigger>
          <TabsTrigger value="leads">Leads ({LEADS_DATA.length})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-medium flex items-center">
                    <Users className="mr-2 h-5 w-5" />
                    Contatos Disponíveis
                  </CardTitle>
                  <CardDescription>
                    {filteredContacts.length} contato(s) encontrado(s)
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={handleSelectAll}>
                  {filteredContacts.every(contact => selectedContacts.includes(contact.id)) 
                    ? "Desmarcar todos" 
                    : "Selecionar todos"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className={`flex items-center space-x-4 p-4 border rounded-lg transition-colors ${
                      selectedContacts.includes(contact.id) 
                        ? "bg-muted border-primary" 
                        : "hover:bg-muted/50"
                    }`}
                  >
                    <Checkbox
                      checked={selectedContacts.includes(contact.id)}
                      onCheckedChange={() => handleSelectContact(contact.id)}
                    />
                    
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{contact.nome}</p>
                        <Badge variant={contact.tipo === 'paciente' ? 'default' : 'secondary'}>
                          {contact.tipo === 'paciente' ? 'Paciente' : 'Lead'}
                        </Badge>
                        {contact.status && (
                          <Badge variant="outline" className="text-xs">
                            {contact.status}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{contact.telefone}</span>
                        <span>{contact.email}</span>
                        {contact.ultimaConsulta && (
                          <span>Última consulta: {contact.ultimaConsulta}</span>
                        )}
                        {contact.origem && (
                          <span>Origem: {contact.origem}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {filteredContacts.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    Nenhum contato encontrado com os filtros atuais.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SelecionarDestinatariosPage;
