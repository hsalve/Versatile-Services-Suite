import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import NotFound from "@/pages/not-found";

// Layouts
import { PublicLayout } from "@/components/layout/PublicLayout";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { EmployeeLayout } from "@/components/layout/EmployeeLayout";

// Public Pages
import Home from "@/pages/public/Home";
import About from "@/pages/public/About";
import Services from "@/pages/public/Services";
import Contact from "@/pages/public/Contact";
import RequestQuote from "@/pages/public/RequestQuote";
import Careers from "@/pages/public/Careers";
import Clients from "@/pages/public/Clients";

// Auth
import Login from "@/pages/auth/Login";

// Admin Pages
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminEmployees from "@/pages/admin/Employees";
import AdminEmployeeDetail from "@/pages/admin/EmployeeDetail";
import AdminSalaryStructures from "@/pages/admin/SalaryStructures";
import AdminPayroll from "@/pages/admin/Payroll";
import AdminPayrollDetail from "@/pages/admin/PayrollDetail";
import AdminPayslips from "@/pages/admin/Payslips";
import AdminInquiries from "@/pages/admin/Inquiries";
import AdminQuotes from "@/pages/admin/Quotes";
import AdminApplications from "@/pages/admin/Applications";

// Employee Pages
import EmployeeProfile from "@/pages/employee/Profile";
import EmployeePayslips from "@/pages/employee/Payslips";
import EmployeePayslipPrint from "@/pages/employee/PayslipPrint";

const queryClient = new QueryClient();

// ─── Auth guard ───────────────────────────────────────────────────────────────
function AuthGuard({
  role,
  children,
}: {
  role?: "admin" | "employee";
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  if (!user) return <Redirect to="/login" />;
  if (role && user.role !== role) return <Redirect to="/login" />;
  return <>{children}</>;
}

// ─── Admin routes (rendered inside AdminLayout) ───────────────────────────────
function AdminRoutes() {
  return (
    <AuthGuard role="admin">
      <AdminLayout>
        <Switch>
          <Route path="/admin" component={AdminDashboard} />
          <Route path="/admin/employees" component={AdminEmployees} />
          <Route path="/admin/employees/:id" component={AdminEmployeeDetail} />
          <Route path="/admin/salary-structures" component={AdminSalaryStructures} />
          <Route path="/admin/payroll" component={AdminPayroll} />
          <Route path="/admin/payroll/:id" component={AdminPayrollDetail} />
          <Route path="/admin/payslips" component={AdminPayslips} />
          <Route path="/admin/inquiries" component={AdminInquiries} />
          <Route path="/admin/quotes" component={AdminQuotes} />
          <Route path="/admin/applications" component={AdminApplications} />
          <Route component={NotFound} />
        </Switch>
      </AdminLayout>
    </AuthGuard>
  );
}

// ─── Employee routes (rendered inside EmployeeLayout) ─────────────────────────
function EmployeeRoutes() {
  return (
    <AuthGuard role="employee">
      <EmployeeLayout>
        <Switch>
          <Route path="/employee" component={EmployeeProfile} />
          <Route path="/employee/payslips" component={EmployeePayslips} />
          <Route component={NotFound} />
        </Switch>
      </EmployeeLayout>
    </AuthGuard>
  );
}

// ─── Public routes ────────────────────────────────────────────────────────────
function PublicRoutes() {
  return (
    <PublicLayout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/services" component={Services} />
        <Route path="/services/:id" component={Services} />
        <Route path="/clients" component={Clients} />
        <Route path="/contact" component={Contact} />
        <Route path="/request-quote" component={RequestQuote} />
        <Route path="/careers" component={Careers} />
        <Route path="/login" component={Login} />
        <Route component={NotFound} />
      </Switch>
    </PublicLayout>
  );
}

// ─── Root router ──────────────────────────────────────────────────────────────
// In Wouter v3, "/prefix/:rest*" won't match the bare "/prefix" (no trailing
// slash / no rest segment).  We register BOTH the bare path and a sub-path
// wildcard so the Switch always hits the right section.
function AppRouter() {
  return (
    <Switch>
      {/* Payslip print — auth-guarded, layout-free for clean printing */}
      <Route path="/employee/payslips/:id/print">
        {() => (
          <AuthGuard>
            <EmployeePayslipPrint />
          </AuthGuard>
        )}
      </Route>

      {/* Admin section: match /admin AND /admin/<anything> */}
      <Route path="/admin" component={AdminRoutes} />
      <Route path="/admin/:a" component={AdminRoutes} />
      <Route path="/admin/:a/:b" component={AdminRoutes} />

      {/* Employee section: match /employee AND /employee/<anything> */}
      <Route path="/employee" component={EmployeeRoutes} />
      <Route path="/employee/:a" component={EmployeeRoutes} />

      {/* Public section — catch-all */}
      <Route component={PublicRoutes} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <AppRouter />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
