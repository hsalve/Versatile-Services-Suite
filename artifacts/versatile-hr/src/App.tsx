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

function ProtectedRoute({ path, component: Component, role }: { path: string; component: any; role?: "admin" | "employee" }) {
  return (
    <Route path={path}>
      {(params) => {
        const { user } = useAuth();
        if (!user) {
          return <Redirect to="/login" />;
        }
        if (role && user.role !== role) {
          return <Redirect to="/login" />;
        }
        return <Component params={params} />;
      }}
    </Route>
  );
}

function AdminRoutes() {
  return (
    <AdminLayout>
      <Switch>
        <ProtectedRoute path="/admin" component={AdminDashboard} role="admin" />
        <ProtectedRoute path="/admin/employees" component={AdminEmployees} role="admin" />
        <ProtectedRoute path="/admin/employees/:id" component={AdminEmployeeDetail} role="admin" />
        <ProtectedRoute path="/admin/salary-structures" component={AdminSalaryStructures} role="admin" />
        <ProtectedRoute path="/admin/payroll" component={AdminPayroll} role="admin" />
        <ProtectedRoute path="/admin/payroll/:id" component={AdminPayrollDetail} role="admin" />
        <ProtectedRoute path="/admin/payslips" component={AdminPayslips} role="admin" />
        <ProtectedRoute path="/admin/inquiries" component={AdminInquiries} role="admin" />
        <ProtectedRoute path="/admin/quotes" component={AdminQuotes} role="admin" />
        <ProtectedRoute path="/admin/applications" component={AdminApplications} role="admin" />
        <Route component={NotFound} />
      </Switch>
    </AdminLayout>
  );
}

function EmployeeRoutes() {
  return (
    <EmployeeLayout>
      <Switch>
        <ProtectedRoute path="/employee" component={EmployeeProfile} role="employee" />
        <ProtectedRoute path="/employee/payslips" component={EmployeePayslips} role="employee" />
        <Route component={NotFound} />
      </Switch>
    </EmployeeLayout>
  );
}

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

function Router() {
  return (
    <Switch>
      <Route path="/admin/*" component={AdminRoutes} />
      <Route path="/employee/payslips/:id/print" component={EmployeePayslipPrint} />
      <Route path="/employee/*" component={EmployeeRoutes} />
      <Route path="/*" component={PublicRoutes} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
