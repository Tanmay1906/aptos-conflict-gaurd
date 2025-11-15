import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Building2, Wallet, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/contexts/AuthContext";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

// Demo credentials for testing
const DEMO_CREDENTIALS = {
  email: "demo@lexguard.com",
  password: "DemoPass123",
};

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setError("");
    console.log('Form submitted with data:', data);
    setIsSubmitting(true);
    try {
      if (!data.email || !data.password) {
        throw new Error('Email and password are required');
      }
      console.log('Calling login with:', { email: data.email, password: '[HIDDEN]' });
      await login(data.email, data.password);
      // Redirect to dashboard after successful login
      navigate("/dashboard");
    } catch (err: any) {
      setError(err?.message || "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fillDemoCredentials = () => {
    setValue("email", DEMO_CREDENTIALS.email);
    setValue("password", DEMO_CREDENTIALS.password);
    setError(""); // Clear any existing errors
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Building2 className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl text-center">Law Firm Login</CardTitle>
          <CardDescription className="text-center">
            Sign in to your conflict guard account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Firm Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="firm@lawfirm.com"
                {...register("email")}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register("password")}
                className={errors.password ? "border-destructive" : ""}
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign In
            </Button>
          </form>

          {/* Demo Credentials Section */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Demo</span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground text-center mb-2">
                For testing purposes only
              </p>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={fillDemoCredentials}
              >
                <User className="mr-2 h-4 w-4" />
                Use Demo Credentials
              </Button>
            </div>
          </div>

          <div className="mt-6 text-center space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or</span>
              </div>
            </div>

            <Button variant="outline" className="w-full" onClick={() => navigate("/register")}>
              <Wallet className="mr-2 h-4 w-4" />
              Register New Firm
            </Button>
          </div>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary hover:underline">
              Register here
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
