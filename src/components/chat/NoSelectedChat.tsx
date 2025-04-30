
import { MessageSquare } from "lucide-react";

const NoSelectedChat = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        <MessageSquare size={32} className="text-primary" />
      </div>
      <h3 className="text-xl font-medium mb-1">Nenhuma conversa selecionada</h3>
      <p className="text-sm text-muted-foreground text-center max-w-xs">
        Selecione uma conversa da lista para visualizar e responder às mensagens
      </p>
    </div>
  );
};

export default NoSelectedChat;
