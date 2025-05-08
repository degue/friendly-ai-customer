
import { MessageSquare, Image, FileAudio, Video } from "lucide-react";

const NoSelectedChat = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center mb-4">
        <MessageSquare size={32} className="text-gray-500" />
      </div>
      <h3 className="text-xl font-medium mb-1">Nenhuma conversa selecionada</h3>
      <p className="text-sm text-muted-foreground text-center max-w-xs mb-4">
        Selecione uma conversa da lista para visualizar mensagens de texto, áudio, imagens e vídeos
      </p>
      <div className="flex gap-3 text-gray-500">
        <Image size={20} />
        <FileAudio size={20} />
        <Video size={20} />
      </div>
    </div>
  );
};

export default NoSelectedChat;
