
import { useState, useCallback, useEffect } from "react";
import { Chat } from "@/pages/Dashboard";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface ChatListProps {
  chats: Chat[];
  selectedChatId: string;
  onSelectChat: (chat: Chat) => void;
}

const ChatList = ({ chats, selectedChatId, onSelectChat }: ChatListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [displayedChats, setDisplayedChats] = useState<Chat[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const chatsPerPage = 10;
  
  // Filter chats based on search term
  const filteredChats = chats.filter(chat => 
    chat.contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Initialize with first page of chats
  useEffect(() => {
    const initialChats = filteredChats.slice(0, chatsPerPage);
    setDisplayedChats(initialChats);
    setPage(1);
  }, [filteredChats]);
  
  // Load more chats when scrolling
  const loadMoreChats = useCallback(() => {
    if (isLoading || displayedChats.length >= filteredChats.length) return;
    
    setIsLoading(true);
    const nextPage = page + 1;
    const startIndex = (page) * chatsPerPage;
    const endIndex = startIndex + chatsPerPage;
    const nextChats = filteredChats.slice(startIndex, endIndex);
    
    setTimeout(() => {
      setDisplayedChats(prev => [...prev, ...nextChats]);
      setPage(nextPage);
      setIsLoading(false);
    }, 300); // Small timeout to simulate loading
  }, [filteredChats, page, isLoading, displayedChats.length, chatsPerPage]);
  
  const handleScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    
    // When scrolled to near bottom, load more chats
    if (scrollHeight - scrollTop - clientHeight < 100 && !isLoading && displayedChats.length < filteredChats.length) {
      loadMoreChats();
    }
  }, [loadMoreChats, isLoading, displayedChats.length, filteredChats.length]);
  
  const formatTime = (date: Date) => {
    const now = new Date();
    const isToday = date.getDate() === now.getDate() && 
                  date.getMonth() === now.getMonth() && 
                  date.getFullYear() === now.getFullYear();
    
    return isToday 
      ? format(date, "HH:mm")
      : format(date, "dd/MM", { locale: ptBR });
  };

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
      
      <ScrollArea className="flex-1" onScroll={handleScroll}>
        <div className="flex-1">
          {displayedChats.length === 0 ? (
            <div className="flex items-center justify-center h-40 text-muted-foreground">
              Nenhuma conversa encontrada
            </div>
          ) : (
            <ul className="divide-y">
              {displayedChats.map(chat => (
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
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-gray-500 border-2 border-white" />
                      )}
                      {chat.status === "waiting" && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-gray-400 border-2 border-white" />
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
                      <Badge variant="secondary" className="ml-2 bg-gray-500 text-white">
                        {chat.unreadCount}
                      </Badge>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
          
          {isLoading && (
            <div className="py-2 text-center text-sm text-muted-foreground">
              Carregando mais conversas...
            </div>
          )}
          
          {!isLoading && displayedChats.length < filteredChats.length && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={loadMoreChats}
              className="w-full py-2 text-sm"
            >
              Carregar mais conversas
            </Button>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChatList;
