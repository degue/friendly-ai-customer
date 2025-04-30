
import { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import ChatList from "@/components/chat/ChatList";
import ChatWindow from "@/components/chat/ChatWindow";
import { useIsMobile } from "@/hooks/use-mobile";
import NoSelectedChat from "@/components/chat/NoSelectedChat";
import { useToast } from "@/components/ui/use-toast";

export interface Message {
  id: string;
  content: string;
  timestamp: Date;
  sender: "user" | "ai" | "agent";
  read: boolean;
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
}

const Dashboard = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
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
          sender: "ai",
          read: true
        },
        {
          id: "m3",
          content: "Seu pedido #12345 está em processo de separação e será enviado hoje. Você receberá o código de rastreamento por e-mail em breve.",
          timestamp: new Date(Date.now() - 23 * 60000),
          sender: "ai",
          read: true
        },
        {
          id: "m4",
          content: "Obrigada pela informação! Mas não recebi nenhum e-mail de confirmação ainda. Pode verificar se o endereço de e-mail está correto?",
          timestamp: new Date(Date.now() - 21 * 60000),
          sender: "user",
          read: false
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
          sender: "ai",
          read: true
        }
      ]
    }
  ]);

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
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: `ai-${Date.now()}`,
        content: generateAIResponse(content),
        timestamp: new Date(),
        sender: "ai",
        read: true
      };
      
      const finalChat = {
        ...updatedChat,
        lastMessage: aiResponse.content,
        lastMessageTime: new Date(),
        messages: [...updatedChat.messages, aiResponse]
      };
      
      setSelectedChat(finalChat);
      setChats(chats.map(c => c.id === selectedChat.id ? finalChat : c));
    }, 1500);
  };

  const handleTransferToAgent = () => {
    if (!selectedChat) return;
    
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
      lastMessage: transferMessage.content,
      lastMessageTime: new Date(),
      messages: [...selectedChat.messages, transferMessage]
    };
    
    setSelectedChat(updatedChat);
    setChats(chats.map(c => c.id === selectedChat.id ? updatedChat : c));
  };

  const generateAIResponse = (userMessage: string): string => {
    const responses = [
      "Entendi sua solicitação. Vou verificar isso para você imediatamente.",
      "Obrigado por sua mensagem. Estamos processando seu pedido.",
      "Compreendo sua situação. Deixe-me ver como podemos resolver isso.",
      "Agradeço por entrar em contato. Vamos trabalhar juntos para solucionar seu problema.",
      "Recebi sua mensagem. Estou consultando as informações necessárias para te ajudar."
    ];
    
    if (userMessage.toLowerCase().includes("obrigad")) {
      return "Foi um prazer te ajudar! Se precisar de mais alguma coisa, é só me avisar.";
    }
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <MainLayout>
      <div className="flex h-full gap-4">
        {(showChatList || !isMobile) && (
          <div className={`${isMobile ? "w-full" : "w-80"} h-full flex-shrink-0 border rounded-lg overflow-hidden`}>
            <ChatList 
              chats={chats} 
              selectedChatId={selectedChat?.id || ""} 
              onSelectChat={handleSelectChat} 
            />
          </div>
        )}
        
        {(!showChatList || !isMobile) && (
          <div className="flex-1 h-full border rounded-lg overflow-hidden">
            {selectedChat ? (
              <ChatWindow 
                chat={selectedChat} 
                onSendMessage={handleSendMessage}
                onBack={isMobile ? handleBackToList : undefined}
                onTransferToAgent={handleTransferToAgent}
              />
            ) : (
              <NoSelectedChat />
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Dashboard;
