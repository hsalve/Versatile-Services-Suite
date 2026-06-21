import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLogin } from "@workspace/api-client-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { VSLogo } from "@/components/VSLogo";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export default function Login() {
  const [, setLocation] = useLocation();
  const { login } = useAuth();
  const { toast } = useToast();
  const loginMutation = useLogin();
  const [showPass, setShowPass] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    loginMutation.mutate({ data }, {
      onSuccess: (res) => {
        login(res.token, res.user);
        toast({ title: "Welcome back!", description: `Signed in as ${res.user.name}` });
        setLocation(res.user.role === "admin" ? "/admin" : "/employee");
      },
      onError: () => {
        toast({ title: "Sign in failed", description: "Invalid email or password.", variant: "destructive" });
      },
    });
  };

  return (
    <div
      className="min-h-[calc(100vh-68px)] flex items-center justify-center p-4"
      style={{ background: "#f0f4f9" }}
    >
      <div className="w-full max-w-[420px]">
        {/* Card */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ boxShadow: "0 8px 40px rgba(26,58,107,0.13)", background: "white" }}
        >
          {/* Header banner */}
          <div
            className="px-8 py-7 text-center"
            style={{ background: "linear-gradient(135deg, #1a3a6b 0%, #0f2347 100%)" }}
          >
            <div className="flex justify-center mb-4">
              <VSLogo light iconSize={40} />
            </div>
            <h1 className="text-xl font-bold text-white">Portal Login</h1>
            <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.60)" }}>
              Enter your credentials to access your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="px-8 py-7 space-y-5">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider" style={{ color: "#4b5679" }}>
                Email Address
              </label>
              <input
                type="email"
                placeholder="name@company.com"
                {...form.register("email")}
                className="w-full h-11 px-4 rounded-xl text-sm outline-none transition-all"
                style={{
                  border: form.formState.errors.email ? "1.5px solid #ef4444" : "1.5px solid #dde3ee",
                  background: "#f8fafc",
                  color: "#1a3a6b",
                }}
                onFocus={(e) => {
                  if (!form.formState.errors.email) {
                    e.currentTarget.style.border = "1.5px solid #1a3a6b";
                    e.currentTarget.style.background = "white";
                  }
                }}
                onBlur={(e) => {
                  if (!form.formState.errors.email) {
                    e.currentTarget.style.border = "1.5px solid #dde3ee";
                    e.currentTarget.style.background = "#f8fafc";
                  }
                }}
              />
              {form.formState.errors.email && (
                <p className="text-xs text-red-500">{form.formState.errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider" style={{ color: "#4b5679" }}>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  {...form.register("password")}
                  className="w-full h-11 px-4 pr-12 rounded-xl text-sm outline-none transition-all"
                  style={{
                    border: form.formState.errors.password ? "1.5px solid #ef4444" : "1.5px solid #dde3ee",
                    background: "#f8fafc",
                    color: "#1a3a6b",
                  }}
                  onFocus={(e) => {
                    if (!form.formState.errors.password) {
                      e.currentTarget.style.border = "1.5px solid #1a3a6b";
                      e.currentTarget.style.background = "white";
                    }
                  }}
                  onBlur={(e) => {
                    if (!form.formState.errors.password) {
                      e.currentTarget.style.border = "1.5px solid #dde3ee";
                      e.currentTarget.style.background = "#f8fafc";
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-70"
                  style={{ color: "#6b7a9c" }}
                  tabIndex={-1}
                >
                  {showPass ? (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19M1 1l22 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  ) : (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  )}
                </button>
              </div>
              {form.formState.errors.password && (
                <p className="text-xs text-red-500">{form.formState.errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full h-11 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-60 disabled:scale-100"
              style={{ background: "linear-gradient(135deg, #1a3a6b, #0f2347)", boxShadow: "0 4px 16px rgba(26,58,107,0.30)" }}
            >
              {loginMutation.isPending ? "Signing in…" : "Sign In"}
            </button>
          </form>

          {/* Footer hint */}
          <div
            className="px-8 py-4 text-center text-xs border-t"
            style={{ borderColor: "#f0f4f9", color: "#6b7a9c", background: "#fafbfd" }}
          >
            For access, contact your HR administrator
          </div>
        </div>

        {/* Credentials hint */}
        <p className="text-center mt-4 text-xs" style={{ color: "#9ba5c0" }}>
          Versatile Services · Secured Portal
        </p>
      </div>
    </div>
  );
}
