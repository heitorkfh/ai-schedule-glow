
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, Mail, Check } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const NovoDisparoPage = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(undefined);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Disparo agendado com sucesso!");
    navigate("/marketing/disparos");
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Novo Disparo</h1>
        <p className="text-muted-foreground">
          Crie e agende uma nova mensagem para envio em massa
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="mr-2 h-5 w-5" />
                Informações da Mensagem
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="titulo">Título da Campanha</Label>
                <Input id="titulo" placeholder="Ex: Promoção Especial Maio" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="mensagem">Mensagem</Label>
                <Textarea 
                  id="mensagem" 
                  placeholder="Digite sua mensagem aqui..." 
                  className="min-h-[150px]" 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label>Canal de Envio</Label>
                <RadioGroup defaultValue="oficial">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="oficial" id="oficial" />
                    <Label htmlFor="oficial">API Oficial WhatsApp</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="nao-oficial" id="nao-oficial" />
                    <Label htmlFor="nao-oficial">API Não Oficial WhatsApp</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="instagram" id="instagram" />
                    <Label htmlFor="instagram">Instagram Direct</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Destinatários e Agendamento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="destinatarios">Destinatários</Label>
                <Select defaultValue="todos">
                  <SelectTrigger id="destinatarios">
                    <SelectValue placeholder="Selecione os destinatários" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os Leads</SelectItem>
                    <SelectItem value="recentes">Leads Recentes</SelectItem>
                    <SelectItem value="convertidos">Leads Convertidos</SelectItem>
                    <SelectItem value="em-contato">Leads Em Contato</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Data de Envio</Label>
                <div className="grid gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Selecione uma data</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="hora">Horário</Label>
                <Input id="hora" type="time" required />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => navigate("/marketing/disparos")}>
                Cancelar
              </Button>
              <Button type="submit">
                <Check className="mr-2 h-4 w-4" /> Agendar Envio
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  );
};

export default NovoDisparoPage;
