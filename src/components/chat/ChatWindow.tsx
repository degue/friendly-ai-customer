
import { useState, useRef, useEffect } from "react";
import { Chat, Message, Media } from "@/pages/Dashboard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Send, 
  ArrowLeft, 
  User,
  Phone,
  MoreVertical, 
  Bot,
  Image,
  Video,
  FileAudio,
  Play,
  Pause,
  Mic
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
  const [isRecording, setIsRecording] = useState(false);
  
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

  const handleSendImage = () => {
    // Simulate sending an image
    onSendMessage("Enviando uma imagem...");
    console.log("Image upload functionality would go here");
  };

  const handleSendVideo = () => {
    // Simulate sending a video
    onSendMessage("Enviando um vídeo...");
    console.log("Video upload functionality would go here");
  };

  const handleSendAudio = () => {
    // Simulate sending audio
    onSendMessage("Enviando um áudio...");
    console.log("Audio upload functionality would go here");
  };

  const handleRecordAudio = () => {
    // Toggle recording state
    setIsRecording(!isRecording);
    console.log(isRecording ? "Stopping recording" : "Starting recording");
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
      
      {currentTab === "ai" ? (
        <div className="p-3 border-t">
          <div className="flex justify-center">
            <Button 
              onClick={onTransferToAgent} 
              className="bg-gray-600 hover:bg-gray-700 w-full"
            >
              <User size={18} />
              <span className="ml-2">Transferir para atendente</span>
            </Button>
          </div>
        </div>
      ) : (
        <div className="p-3 border-t">
          <div className="flex gap-2 mb-3">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full" 
              onClick={handleSendImage}
            >
              <Image size={18} />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full" 
              onClick={handleSendVideo}
            >
              <Video size={18} />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full" 
              onClick={handleSendAudio}
            >
              <FileAudio size={18} />
            </Button>
            <Button 
              variant={isRecording ? "destructive" : "outline"}
              size="icon" 
              className="rounded-full" 
              onClick={handleRecordAudio}
            >
              <Mic size={18} />
            </Button>
          </div>
          <form onSubmit={handleSendMessage} className="flex gap-2">
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
      )}
    </div>
  );
};

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isUser = message.sender === "user";
  const isAI = message.sender === "ai";
  const [isPlaying, setIsPlaying] = useState(false);
  
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
        
        {message.media && (
          <div className="mt-2">
            {message.media.type === "image" && (
              <div className="relative rounded-md overflow-hidden">
                <img 
                  src={message.media.url} 
                  alt="Imagem enviada" 
                  className="w-full h-auto object-cover rounded-md"
                />
                <div className="absolute top-2 left-2 bg-black/60 rounded-full p-1">
                  <Image size={14} className="text-white" />
                </div>
              </div>
            )}
            
            {message.media.type === "video" && (
              <div className="relative rounded-md overflow-hidden">
                <img 
                  src={message.media.thumbnail} 
                  alt="Thumbnail do vídeo" 
                  className="w-full h-auto object-cover rounded-md"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-md">
                  <Video size={40} className="text-white" />
                </div>
                <div className="absolute bottom-2 right-2 bg-black/60 rounded-sm px-1 py-0.5 text-xs text-white">
                  {Math.floor(message.media.duration! / 60)}:{(message.media.duration! % 60).toString().padStart(2, '0')}
                </div>
              </div>
            )}
            
            {message.media.type === "audio" && (
              <div className="flex items-center gap-2 mt-1 p-2 bg-gray-700/30 rounded-md">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)} 
                  className="p-2 rounded-full bg-gray-800/50 text-white"
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                </button>
                <div className="flex-1">
                  <div className="h-1 w-full bg-gray-300/30 rounded-full">
                    <div className="h-1 w-1/3 bg-white/80 rounded-full"></div>
                  </div>
                </div>
                <div className="text-xs">
                  {Math.floor(message.media.duration! / 60)}:{(message.media.duration! % 60).toString().padStart(2, '0')}
                </div>
                <FileAudio size={16} className="text-gray-300" />
              </div>
            )}
          </div>
        )}
        
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
