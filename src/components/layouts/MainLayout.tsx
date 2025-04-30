
import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      <main className={`flex-1 overflow-auto p-4 ${isMobile ? 'p-2' : 'p-6'}`}>
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
