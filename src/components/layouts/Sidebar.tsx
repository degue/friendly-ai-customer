
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MessageSquare, BarChart3, Settings, Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Sidebar = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(!isMobile);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const navigationItems = [
    {
      name: "Conversas",
      path: "/dashboard",
      icon: <MessageSquare size={20} />,
    },
    {
      name: "Estatísticas",
      path: "/stats",
      icon: <BarChart3 size={20} />,
    },
    {
      name: "Configurações",
      path: "/settings",
      icon: <Settings size={20} />,
    },
  ];

  return (
    <>
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50"
          onClick={toggleSidebar}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      )}

      <aside
        className={cn(
          "bg-sidebar flex flex-col border-r transition-all duration-300",
          isOpen
            ? isMobile
              ? "fixed inset-y-0 left-0 z-40 w-64"
              : "w-64"
            : isMobile
            ? "fixed inset-y-0 -left-64"
            : "w-16"
        )}
      >
        <div className="flex h-14 items-center justify-center border-b p-4">
          {isOpen ? (
            <h1 className="text-lg font-bold text-primary">Atendimento IA</h1>
          ) : !isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              <Menu size={20} />
            </Button>
          )}
        </div>

        <nav className="flex-1 space-y-1 p-2">
          {navigationItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent hover:text-accent-foreground",
                  !isOpen && !isMobile && "justify-center px-0"
                )
              }
              onClick={() => isMobile && setIsOpen(false)}
            >
              {item.icon}
              {(isOpen || isMobile) && <span className="ml-3">{item.name}</span>}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
