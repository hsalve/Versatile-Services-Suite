import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { useLogout } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

export function EmployeeLayout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        logout();
        setLocation("/login");
      },
      onError: () => {
        toast({
          title: "Error logging out",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-primary text-primary-foreground shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/employee" className="flex items-center gap-2">
              <span className="font-bold text-xl tracking-tight text-white">VERSATILE HR</span>
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              <Link href="/employee" className="px-3 py-2 rounded-md text-sm font-medium text-primary-foreground/90 hover:bg-primary-foreground/10 hover:text-white transition-colors">Profile</Link>
              <Link href="/employee/payslips" className="px-3 py-2 rounded-md text-sm font-medium text-primary-foreground/90 hover:bg-primary-foreground/10 hover:text-white transition-colors">Payslips</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-right hidden sm:block">
              <div className="font-medium text-white">{user?.name}</div>
              <div className="text-primary-foreground/80 text-xs">Employee</div>
            </div>
            <Button variant="secondary" size="sm" onClick={handleLogout} disabled={logoutMutation.isPending} className="bg-white text-primary hover:bg-white/90">
              Logout
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 bg-muted/30">
        <div className="container mx-auto p-4 md:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
