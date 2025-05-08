
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import ChatList from "@/components/chat/ChatList";
import ChatWindow from "@/components/chat/ChatWindow";
import { useIsMobile } from "@/hooks/use-mobile";
import NoSelectedChat from "@/components/chat/NoSelectedChat";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface Media {
  type: "image" | "audio" | "video";
  url: string;
  thumbnail?: string;
  duration?: number;
}

export interface Message {
  id: string;
  content: string;
  timestamp: Date;
  sender: "user" | "ai" | "agent";
  read: boolean;
  media?: Media;
}

export interface Chat {
  id: string;
  contact: {
    name: string;
    number: string;
    avatar: string;
  };
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  messages: Message[];
  status: "active" | "resolved" | "waiting";
  handledBy: "ai" | "agent";
}

const Dashboard = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "agent";
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [showChatList, setShowChatList] = useState(!isMobile);
  
  // Mock data for chats
  const [chats, setChats] = useState<Chat[]>([
    {
      id: "1",
      contact: {
        name: "Maria Silva",
        number: "+55 11 98765-4321",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Maria`
      },
      lastMessage: "Olá, gostaria de saber sobre o status do meu pedido #12345",
      lastMessageTime: new Date(Date.now() - 20 * 60000),
      unreadCount: 3,
      status: "active",
      handledBy: "agent",
      messages: [
        {
          id: "m1",
          content: "Olá! Gostaria de saber sobre o status do meu pedido #12345",
          timestamp: new Date(Date.now() - 25 * 60000),
          sender: "user",
          read: true
        },
        {
          id: "m2",
          content: "Olá Maria! Vou verificar o status do seu pedido agora mesmo.",
          timestamp: new Date(Date.now() - 24 * 60000),
          sender: "agent",
          read: true
        },
        {
          id: "m3",
          content: "Seu pedido #12345 está em processo de separação e será enviado hoje. Você receberá o código de rastreamento por e-mail em breve.",
          timestamp: new Date(Date.now() - 23 * 60000),
          sender: "agent",
          read: true
        },
        {
          id: "m4",
          content: "Obrigada pela informação! Mas não recebi nenhum e-mail de confirmação ainda. Pode verificar se o endereço de e-mail está correto?",
          timestamp: new Date(Date.now() - 21 * 60000),
          sender: "user",
          read: false
        },
        {
          id: "m5",
          content: "Aqui está a foto do comprovante de pagamento:",
          timestamp: new Date(Date.now() - 20 * 60000),
          sender: "user",
          read: false,
          media: {
            type: "image",
            url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=500"
          }
        }
      ]
    },
    {
      id: "2",
      contact: {
        name: "João Pereira",
        number: "+55 21 99876-5432",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=João`
      },
      lastMessage: "Preciso trocar um produto",
      lastMessageTime: new Date(Date.now() - 12 * 3600000),
      unreadCount: 0,
      status: "waiting",
      handledBy: "ai",
      messages: [
        {
          id: "m1",
          content: "Bom dia! Preciso trocar um produto que comprei na semana passada",
          timestamp: new Date(Date.now() - 13 * 3600000),
          sender: "user",
          read: true
        },
        {
          id: "m2",
          content: "Olá João! Claro, podemos te ajudar com a troca. Pode me informar o número do pedido e qual produto você deseja trocar?",
          timestamp: new Date(Date.now() - 12.8 * 3600000),
          sender: "ai",
          read: true
        },
        {
          id: "m3",
          content: "Pedido #54321, quero trocar a camisa tamanho M por uma tamanho G",
          timestamp: new Date(Date.now() - 12.5 * 3600000),
          sender: "user",
          read: true
        },
        {
          id: "m4",
          content: "Entendi. Vou verificar a disponibilidade do tamanho G para esse modelo de camisa. Um momento, por favor.",
          timestamp: new Date(Date.now() - 12.2 * 3600000),
          sender: "ai",
          read: true
        },
        {
          id: "m5",
          content: "Enviei um áudio explicando melhor o problema:",
          timestamp: new Date(Date.now() - 12 * 3600000),
          sender: "user",
          read: true,
          media: {
            type: "audio",
            url: "https://example.com/audio-sample.mp3",
            duration: 32
          }
        }
      ]
    },
    {
      id: "3",
      contact: {
        name: "Ana Oliveira",
        number: "+55 31 97654-3210",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Ana`
      },
      lastMessage: "Obrigada pela ajuda!",
      lastMessageTime: new Date(Date.now() - 2 * 86400000),
      unreadCount: 0,
      status: "resolved",
      handledBy: "agent",
      messages: [
        {
          id: "m1",
          content: "Estou com problemas para fazer login no site",
          timestamp: new Date(Date.now() - 2.2 * 86400000),
          sender: "user",
          read: true
        },
        {
          id: "m2",
          content: "Olá Ana! Sinto muito pelo inconveniente. Vamos resolver isso juntos. Você está tentando fazer login com qual e-mail?",
          timestamp: new Date(Date.now() - 2.15 * 86400000),
          sender: "agent",
          read: true
        },
        {
          id: "m3",
          content: "Gravei um vídeo mostrando o erro:",
          timestamp: new Date(Date.now() - 2.1 * 86400000),
          sender: "user",
          read: true,
          media: {
            type: "video",
            url: "https://example.com/video-sample.mp4",
            thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=500",
            duration: 45
          }
        },
        {
          id: "m4",
          content: "Obrigada pela ajuda!",
          timestamp: new Date(Date.now() - 2 * 86400000),
          sender: "user",
          read: true
        }
      ]
    },
    {
      id: "4",
      contact: {
        name: "Carlos Mendes",
        number: "+55 41 98765-1234",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos`
      },
      lastMessage: "Aqui está uma foto do produto com defeito",
      lastMessageTime: new Date(Date.now() - 1 * 86400000),
      unreadCount: 2,
      status: "active",
      handledBy: "ai",
      messages: [
        {
          id: "m1",
          content: "Olá, comprei um produto que veio com defeito",
          timestamp: new Date(Date.now() - 1.2 * 86400000),
          sender: "user",
          read: true
        },
        {
          id: "m2",
          content: "Olá Carlos! Lamento pelo inconveniente. Poderia me fornecer detalhes sobre o produto e o defeito encontrado?",
          timestamp: new Date(Date.now() - 1.18 * 86400000),
          sender: "ai",
          read: true
        },
        {
          id: "m3",
          content: "É uma cafeteira elétrica modelo X123, ela não está esquentando a água corretamente",
          timestamp: new Date(Date.now() - 1.15 * 86400000),
          sender: "user",
          read: true
        },
        {
          id: "m4",
          content: "Entendi. Para que possamos avaliar melhor a situação, seria possível enviar uma foto ou vídeo do problema?",
          timestamp: new Date(Date.now() - 1.1 * 86400000),
          sender: "ai",
          read: true
        },
        {
          id: "m5",
          content: "Aqui está uma foto do produto com defeito",
          timestamp: new Date(Date.now() - 1 * 86400000),
          sender: "user",
          read: false,
          media: {
            type: "image",
            url: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&q=80&w=500"
          }
        },
        {
          id: "m6",
          content: "E aqui está um vídeo mostrando o problema:",
          timestamp: new Date(Date.now() - 0.95 * 86400000),
          sender: "user",
          read: false,
          media: {
            type: "video",
            url: "https://example.com/video-sample2.mp4",
            thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=500",
            duration: 28
          }
        }
      ]
    }
  ]);

  // Filtrar chats com base na aba ativa
  const filteredChats = chats.filter(chat => chat.handledBy === activeTab);

  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value });
  };

  // Resetar o chat selecionado ao mudar de aba
  useEffect(() => {
    setSelectedChat(null);
    setShowChatList(!isMobile);
  }, [activeTab, isMobile]);

  const handleSelectChat = (chat: Chat) => {
    // Mark messages as read when opening chat
    const updatedChat = {
      ...chat,
      unreadCount: 0,
      messages: chat.messages.map(msg => ({ ...msg, read: true }))
    };
    
    setSelectedChat(updatedChat);
    setChats(chats.map(c => c.id === chat.id ? updatedChat : c));
    
    if (isMobile) {
      setShowChatList(false);
    }
  };

  const handleBackToList = () => {
    setShowChatList(true);
  };

  const handleSendMessage = (content: string) => {
    if (!selectedChat) return;
    
    const newUserMessage: Message = {
      id: `user-${Date.now()}`,
      content,
      timestamp: new Date(),
      sender: "user",
      read: true
    };
    
    // Add user message
    const updatedChat = {
      ...selectedChat,
      lastMessage: content,
      lastMessageTime: new Date(),
      messages: [...selectedChat.messages, newUserMessage]
    };
    
    setSelectedChat(updatedChat);
    setChats(chats.map(c => c.id === selectedChat.id ? updatedChat : c));
    
    // Simulate response after a delay
    setTimeout(() => {
      const responseMessage: Message = {
        id: `${activeTab}-${Date.now()}`,
        content: generateResponse(content, activeTab),
        timestamp: new Date(),
        sender: activeTab as "ai" | "agent",
        read: true
      };
      
      const finalChat = {
        ...updatedChat,
        lastMessage: responseMessage.content,
        lastMessageTime: new Date(),
        messages: [...updatedChat.messages, responseMessage]
      };
      
      setSelectedChat(finalChat);
      setChats(chats.map(c => c.id === selectedChat.id ? finalChat : c));
    }, 1500);
  };

  const handleTransferToAgent = () => {
    if (!selectedChat) return;
    if (selectedChat.handledBy === "agent") return;
    
    toast({
      title: "Atendimento transferido",
      description: "Um agente humano assumirá a conversa em breve.",
      duration: 3000,
    });
    
    // Add system message about transfer
    const transferMessage: Message = {
      id: `system-${Date.now()}`,
      content: "Transferindo para um atendente humano...",
      timestamp: new Date(),
      sender: "ai",
      read: true
    };
    
    const updatedChat = {
      ...selectedChat,
      status: "waiting" as const,
      handledBy: "agent" as const,
      lastMessage: transferMessage.content,
      lastMessageTime: new Date(),
      messages: [...selectedChat.messages, transferMessage]
    };
    
    setSelectedChat(updatedChat);
    setChats(chats.map(c => c.id === selectedChat.id ? updatedChat : c));
    // Mudar para a aba de atendente
    setSearchParams({ tab: "agent" });
  };

  const handleTransferToAI = () => {
    if (!selectedChat) return;
    if (selectedChat.handledBy === "ai") return;
    
    toast({
      title: "Atendimento transferido",
      description: "A IA assumirá a conversa agora.",
      duration: 3000,
    });
    
    // Add system message about transfer
    const transferMessage: Message = {
      id: `system-${Date.now()}`,
      content: "Transferindo para a IA...",
      timestamp: new Date(),
      sender: "agent",
      read: true
    };
    
    const updatedChat = {
      ...selectedChat,
      status: "active" as const,
      handledBy: "ai" as const,
      lastMessage: transferMessage.content,
      lastMessageTime: new Date(),
      messages: [...selectedChat.messages, transferMessage]
    };
    
    setSelectedChat(updatedChat);
    setChats(chats.map(c => c.id === selectedChat.id ? updatedChat : c));
    // Mudar para a aba de IA
    setSearchParams({ tab: "ai" });
  };

  const generateResponse = (userMessage: string, responder: string): string => {
    const aiResponses = [
      "Entendi sua solicitação. Vou verificar isso para você imediatamente.",
      "Obrigado por sua mensagem. Estamos processando seu pedido.",
      "Compreendo sua situação. Deixe-me ver como podemos resolver isso.",
      "Agradeço por entrar em contato. Vamos trabalhar juntos para solucionar seu problema.",
      "Recebi sua mensagem. Estou consultando as informações necessárias para te ajudar."
    ];
    
    const agentResponses = [
      "Estou verificando seu caso agora mesmo, por favor aguarde um momento.",
      "Vou consultar o sistema para te dar a melhor resposta possível.",
      "Entendi o seu problema, já estou trabalhando na solução.",
      "Obrigado pela paciência, estamos analisando o seu caso com atenção.",
      "Vou verificar essa informação com o departamento responsável e te retorno em seguida."
    ];
    
    if (userMessage.toLowerCase().includes("obrigad")) {
      return responder === "ai" 
        ? "Foi um prazer te ajudar! Se precisar de mais alguma coisa, é só me avisar."
        : "Disponha! Estamos sempre à disposição para ajudar. Precisa de mais alguma coisa?";
    }
    
    const responses = responder === "ai" ? aiResponses : agentResponses;
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <MainLayout>
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full h-full">
        <TabsList className="grid w-[400px] grid-cols-2 mx-auto mb-4">
          <TabsTrigger value="ai">IA</TabsTrigger>
          <TabsTrigger value="agent">Atendente</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="h-[calc(100%-60px)]">
          <div className="flex h-full gap-4">
            {(showChatList || !isMobile) && (
              <div className={`${isMobile ? "w-full" : "w-80"} h-full flex-shrink-0 border rounded-lg overflow-hidden bg-secondary/30`}>
                <ChatList 
                  chats={filteredChats} 
                  selectedChatId={selectedChat?.id || ""} 
                  onSelectChat={handleSelectChat} 
                />
              </div>
            )}
            
            {(!showChatList || !isMobile) && (
              <div className="flex-1 h-full border rounded-lg overflow-hidden bg-secondary/30">
                {selectedChat ? (
                  <ChatWindow 
                    chat={selectedChat} 
                    onSendMessage={handleSendMessage}
                    onBack={isMobile ? handleBackToList : undefined}
                    onTransferToAgent={handleTransferToAgent}
                    onTransferToAI={handleTransferToAI}
                    currentTab={activeTab}
                  />
                ) : (
                  <NoSelectedChat />
                )}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Dashboard;
