
import { useState, useRef, useEffect } from "react";
import { Chat, Message } from "@/pages/Dashboard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Send, 
  ArrowLeft, 
  User,
  Phone,
  MoreVertical, 
  Bot
} from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface ChatWindowProps {
  chat: Chat;
  onSendMessage: (message: string) => void;
  onBack?: () => void;
  onTransferToAgent: () => void;
  onTransferToAI: () => void;
  currentTab: string;
}

const ChatWindow = ({ 
  chat, 
  onSendMessage, 
  onBack, 
  onTransferToAgent, 
  onTransferToAI,
  currentTab
}: ChatWindowProps) => {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [chat.messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return { label: "Ativo", color: "bg-gray-500" };
      case "waiting":
        return { label: "Aguardando", color: "bg-gray-400" };
      case "resolved":
        return { label: "Resolvido", color: "bg-gray-600" };
      default:
        return { label: status, color: "bg-gray-500" };
    }
  };

  const statusInfo = getStatusLabel(chat.status);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-3 border-b bg-secondary/30">
        <div className="flex items-center gap-3">
          {onBack && (
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft size={20} />
            </Button>
          )}
          <Avatar className="h-10 w-10">
            <AvatarImage src={chat.contact.avatar} alt={chat.contact.name} />
            <AvatarFallback>{chat.contact.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{chat.contact.name}</div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={`text-xs px-2 text-white ${statusInfo.color}`}>
                {statusInfo.label}
              </Badge>
              <span className="text-xs text-muted-foreground">{chat.contact.number}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Phone size={20} />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {currentTab === "ai" ? (
                <DropdownMenuItem onClick={onTransferToAgent}>
                  Transferir para atendente
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem onClick={onTransferToAI}>
                  Transferir para IA
                </DropdownMenuItem>
              )}
              <DropdownMenuItem>Marcar como resolvido</DropdownMenuItem>
              <DropdownMenuItem>Ver informações do cliente</DropdownMenuItem>
              <DropdownMenuItem>Exportar conversa</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {chat.messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <form onSubmit={handleSendMessage} className="p-3 border-t flex gap-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Digite uma mensagem..."
          className="flex-1"
        />
        <Button type="submit" disabled={message.trim() === ""} className="bg-gray-600 hover:bg-gray-700">
          <Send size={18} />
          <span className="ml-2">Enviar</span>
        </Button>
      </form>
    </div>
  );
};

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isUser = message.sender === "user";
  const isAI = message.sender === "ai";
  
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-lg px-4 py-2 ${
          isUser
            ? "bg-gray-600 text-white"
            : isAI
              ? "bg-gray-500 text-white"
              : "bg-gray-200 text-gray-800"
        }`}
      >
        {!isUser && (
          <div className="flex items-center gap-2 mb-1 text-xs font-medium">
            {isAI ? (
              <div className="flex items-center">
                <Bot size={12} />
                <span className="ml-1">IA</span>
              </div>
            ) : (
              <div className="flex items-center">
                <User size={12} />
                <span className="ml-1">Atendente</span>
              </div>
            )}
          </div>
        )}
        <p className="text-sm">{message.content}</p>
        <div
          className={`text-xs mt-1 ${
            isUser
              ? "text-gray-300"
              : isAI
                ? "text-gray-300"
                : "text-gray-500"
          }`}
        >
          {format(message.timestamp, "HH:mm")}
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
