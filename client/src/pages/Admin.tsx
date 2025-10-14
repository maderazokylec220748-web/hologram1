import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import graduationImage from "@assets/IMG_20220331_162741-scaled_1760412535985.jpg";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().default(false),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Admin() {
  const [showPassword, setShowPassword] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { login } = useAuth();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: { username: string; password: string }) => {
      return await apiRequest("POST", "/api/auth/login", data);
    },
    onSuccess: (data: any) => {
      console.log("Login response:", data);
      if (data && data.user && data.user.username) {
        login(data.user.username);
        toast({
          title: "Login Successful",
          description: "Welcome back!",
        });
        setTimeout(() => {
          setLocation("/form");
        }, 100);
      } else {
        toast({
          title: "Login Error",
          description: "Invalid response from server",
          variant: "destructive",
        });
      }
    },
    onError: (error: any) => {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: error.message || "Invalid credentials",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate({
      username: data.username,
      password: data.password,
    });
  };

  return (
    <div className="min-h-screen bg-[#E5C100] flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-[#D4C5A0] rounded-3xl shadow-2xl overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* Left side - Login Form */}
          <div className="p-12 flex flex-col justify-center">
            <h1 
              className="text-6xl font-bold mb-8 text-[#8B4513]"
              style={{ fontFamily: 'Georgia, serif' }}
              data-testid="text-hologram-title"
            >
              Hologram
            </h1>
            
            <h2 
              className="text-3xl font-semibold mb-8 text-[#8B4513]"
              data-testid="text-login-subtitle"
            >
              Log in
            </h2>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Username Field */}
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B4513]" />
                          <Input
                            {...field}
                            placeholder="Username"
                            className="pl-12 bg-[#E5C100] border-2 border-[#8B4513] rounded-full h-12 text-[#8B4513] placeholder:text-[#8B4513]/60"
                            data-testid="input-username"
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B4513]" />
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="pl-12 pr-12 bg-[#C19A6B] border-2 border-[#8B4513] rounded-full h-12 text-[#8B4513] placeholder:text-[#8B4513]/60"
                            data-testid="input-password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8B4513]"
                            data-testid="button-toggle-password"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <FormField
                    control={form.control}
                    name="rememberMe"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="border-[#8B4513] data-[state=checked]:bg-[#8B4513]"
                            data-testid="checkbox-remember-me"
                          />
                        </FormControl>
                        <label className="text-sm text-[#8B4513] cursor-pointer" onClick={() => field.onChange(!field.value)}>
                          Remember Me
                        </label>
                      </FormItem>
                    )}
                  />
                  <button
                    type="button"
                    className="text-sm text-[#8B4513] hover:underline"
                    data-testid="link-forgot-password"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Login Button */}
                <Button
                  type="submit"
                  className="w-full bg-[#A0715E] hover:bg-[#8B4513] text-white rounded-full h-12 text-lg font-semibold"
                  disabled={loginMutation.isPending}
                  data-testid="button-login"
                >
                  {loginMutation.isPending ? "Logging in..." : "Log in"}
                </Button>
              </form>
            </Form>
          </div>

          {/* Right side - Image */}
          <div className="hidden md:block relative">
            <img
              src={graduationImage}
              alt="Westmead International School Graduation"
              className="w-full h-full object-cover"
              data-testid="img-graduation"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
