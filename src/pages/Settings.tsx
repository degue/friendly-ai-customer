
import MainLayout from "@/components/layouts/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("Olá! Bem-vindo ao nosso atendimento. Como posso ajudar você hoje?");
  const [autoRespond, setAutoRespond] = useState(true);
  const [transferThreshold, setTransferThreshold] = useState("3");
  const [systemPrompt, setSystemPrompt] = useState(
    "Você é um assistente de atendimento ao cliente amigável e prestativo. Responda às dúvidas com cortesia e precisão. Se não souber a resposta, ou se for uma situação complexa, sugira transferir para um atendente humano."
  );

  const handleSaveWhatsappSettings = () => {
    toast({
      title: "Configurações do WhatsApp salvas",
      description: "As configurações de WhatsApp foram atualizadas com sucesso.",
    });
  };

  const handleSaveAISettings = () => {
    toast({
      title: "Configurações da IA salvas",
      description: "As configurações de IA foram atualizadas com sucesso.",
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Configurações</h1>
          <p className="text-muted-foreground">
            Gerencie as configurações do sistema de atendimento
          </p>
        </div>

        <Tabs defaultValue="whatsapp" className="space-y-4">
          <TabsList>
            <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
            <TabsTrigger value="ia">Inteligência Artificial</TabsTrigger>
            <TabsTrigger value="notifications">Notificações</TabsTrigger>
          </TabsList>
          
          <TabsContent value="whatsapp" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>API do WhatsApp</CardTitle>
                <CardDescription>
                  Configure a integração com a API do WhatsApp Business
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <Input
                    id="api-key"
                    type="password"
                    placeholder="Insira sua API key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsapp-number">Número do WhatsApp</Label>
                  <Input
                    id="whatsapp-number"
                    placeholder="Ex: +55 11 98765-4321"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                  />
                </div>
                <Button onClick={handleSaveWhatsappSettings}>Salvar configurações</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mensagens automáticas</CardTitle>
                <CardDescription>
                  Configure as mensagens automáticas que serão enviadas aos clientes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="welcome-message">Mensagem de boas-vindas</Label>
                  <Textarea
                    id="welcome-message"
                    placeholder="Digite a mensagem de boas-vindas"
                    value={welcomeMessage}
                    onChange={(e) => setWelcomeMessage(e.target.value)}
                  />
                </div>
                <Button onClick={handleSaveWhatsappSettings}>Salvar mensagens</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="ia" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Configurações gerais da IA</CardTitle>
                <CardDescription>
                  Configure o comportamento da Inteligência Artificial
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-respond">Respostas automáticas</Label>
                  <Switch
                    id="auto-respond"
                    checked={autoRespond}
                    onCheckedChange={setAutoRespond}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="transfer-threshold">
                    Limite de mensagens antes de transferir
                  </Label>
                  <Input
                    id="transfer-threshold"
                    type="number"
                    value={transferThreshold}
                    onChange={(e) => setTransferThreshold(e.target.value)}
                    min="1"
                    max="10"
                  />
                  <p className="text-xs text-muted-foreground">
                    Se a IA não conseguir resolver o problema após esse número de mensagens,
                    ela irá sugerir transferir para um atendente humano.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Personalização da IA</CardTitle>
                <CardDescription>
                  Configure o prompt do sistema para a IA de atendimento
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="system-prompt">Prompt do sistema</Label>
                  <Textarea
                    id="system-prompt"
                    placeholder="Digite o prompt do sistema"
                    className="min-h-32"
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Este prompt define o comportamento e conhecimento base da IA.
                  </p>
                </div>
                <Button onClick={handleSaveAISettings}>Salvar configurações da IA</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de notificações</CardTitle>
                <CardDescription>
                  Configure como deseja receber notificações
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-notifications">Notificações por e-mail</Label>
                  <Switch id="email-notifications" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="browser-notifications">Notificações do navegador</Label>
                  <Switch id="browser-notifications" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="sound-notifications">Sons de notificação</Label>
                  <Switch id="sound-notifications" />
                </div>
                <Button variant="outline">Testar notificações</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Settings;
