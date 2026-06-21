import { Link, useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { useLogout } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

export function AdminLayout({ children }: { children: ReactNode }) {
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
    <div className="min-h-screen flex flex-col md:flex-row bg-muted/40">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-sidebar text-sidebar-foreground flex flex-col">
        <div className="p-4 border-b border-sidebar-border">
          <h2 className="font-bold text-lg">Versatile HR</h2>
          <p className="text-xs text-sidebar-foreground/70">Admin Portal</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link href="/admin" className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">Dashboard</Link>
          <Link href="/admin/employees" className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">Employees</Link>
          <Link href="/admin/salary-structures" className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">Salary Structures</Link>
          <Link href="/admin/payroll" className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">Payroll Runs</Link>
          <Link href="/admin/payslips" className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">All Payslips</Link>
          <div className="pt-4 pb-2">
            <p className="px-3 text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider">Requests</p>
          </div>
          <Link href="/admin/inquiries" className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">Inquiries</Link>
          <Link href="/admin/quotes" className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">Quotes</Link>
          <Link href="/admin/applications" className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">Applications</Link>
        </nav>
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-sidebar-primary flex items-center justify-center text-sidebar-primary-foreground font-bold">
              {user?.name?.charAt(0) || "A"}
            </div>
            <div className="flex-1 truncate">
              <p className="text-sm font-medium truncate">{user?.name}</p>
              <p className="text-xs text-sidebar-foreground/70 truncate">{user?.email}</p>
            </div>
          </div>
          <Button variant="outline" className="w-full justify-center bg-transparent border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" onClick={handleLogout} disabled={logoutMutation.isPending}>
            {logoutMutation.isPending ? "Logging out..." : "Logout"}
          </Button>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-14 bg-background border-b flex items-center px-6 lg:hidden">
          <h1 className="font-semibold">Versatile HR Admin</h1>
        </header>
        <div className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
