
import { useState } from "react";
import { Chat } from "@/pages/Dashboard";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ChatListProps {
  chats: Chat[];
  selectedChatId: string;
  onSelectChat: (chat: Chat) => void;
}

const ChatList = ({ chats, selectedChatId, onSelectChat }: ChatListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  const formatTime = (date: Date) => {
    const now = new Date();
    const isToday = date.getDate() === now.getDate() && 
                  date.getMonth() === now.getMonth() && 
                  date.getFullYear() === now.getFullYear();
    
    return isToday 
      ? format(date, "HH:mm")
      : format(date, "dd/MM", { locale: ptBR });
  };

  const filteredChats = chats
    .filter(chat => {
      if (activeTab === "active") return chat.status === "active";
      if (activeTab === "waiting") return chat.status === "waiting";
      if (activeTab === "resolved") return chat.status === "resolved";
      return true;
    })
    .filter(chat => 
      chat.contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b">
        <Input
          placeholder="Buscar conversas..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="grid grid-cols-4 mx-3 my-2">
          <TabsTrigger value="all" className="text-xs">Todos</TabsTrigger>
          <TabsTrigger value="active" className="text-xs">Ativos</TabsTrigger>
          <TabsTrigger value="waiting" className="text-xs">Aguardando</TabsTrigger>
          <TabsTrigger value="resolved" className="text-xs">Resolvidos</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="flex-1 overflow-y-auto p-0 m-0">
          {filteredChats.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Nenhuma conversa encontrada
            </div>
          ) : (
            <ul className="divide-y">
              {filteredChats.map(chat => (
                <li key={chat.id}>
                  <button
                    className={cn(
                      "w-full flex items-start p-3 hover:bg-accent transition-colors",
                      selectedChatId === chat.id && "bg-accent"
                    )}
                    onClick={() => onSelectChat(chat)}
                  >
                    <div className="relative flex-shrink-0">
                      <img 
                        src={chat.contact.avatar} 
                        alt={chat.contact.name}
                        className="h-12 w-12 rounded-full"
                      />
                      {chat.status === "active" && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
                      )}
                      {chat.status === "waiting" && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-amber-500 border-2 border-white" />
                      )}
                    </div>
                    <div className="ml-3 flex-1 overflow-hidden text-left">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{chat.contact.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatTime(chat.lastMessageTime)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {chat.lastMessage}
                      </p>
                    </div>
                    {chat.unreadCount > 0 && (
                      <Badge variant="secondary" className="ml-2 bg-primary text-primary-foreground">
                        {chat.unreadCount}
                      </Badge>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChatList;
