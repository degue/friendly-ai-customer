
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, BarChart3, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-accent to-background p-4">
      <div className="container max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            Atendimento ao Cliente com IA
          </h1>
          <p className="text-xl text-muted-foreground">
            Interface para gerenciar conversas de atendimento via WhatsApp com assistência de IA
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="group hover:shadow-md transition-all">
            <CardHeader className="gap-2">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                <MessageSquare size={20} className="text-primary" />
              </div>
              <CardTitle>Dashboard</CardTitle>
              <CardDescription>
                Gerencie conversas ativas com clientes em tempo real
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate('/dashboard')} className="w-full">
                Acessar
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-md transition-all">
            <CardHeader className="gap-2">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                <BarChart3 size={20} className="text-primary" />
              </div>
              <CardTitle>Estatísticas</CardTitle>
              <CardDescription>
                Visualize métricas de desempenho e análises das conversas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate('/stats')} className="w-full">
                Acessar
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-md transition-all">
            <CardHeader className="gap-2">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                <Settings size={20} className="text-primary" />
              </div>
              <CardTitle>Configurações</CardTitle>
              <CardDescription>
                Personalize respostas da IA e defina preferências do sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate('/settings')} className="w-full">
                Acessar
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
