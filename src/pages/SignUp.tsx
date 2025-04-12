import React, { useState } from "react";

import { ArrowLeft, CheckCircle, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Navbar from "@/components/layout/Navbar";
import PageTransition from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApiMutation } from "@/hooks/useMutuation";
import useUserStore from "@/store/authStore";
import withAuth from "@/lib/withAuth";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { setToken, setUser } = useUserStore();
  const createAccountMutation = useApiMutation({
    getUrl: () => "/auth/register",
    method: "POST",
    invalidateQueries: ["SignUp"],
    onSuccess: (data: { token: string; user: any }) => {
      console.log("🚀 ~ SignUp ~ data:", data);
      setToken(data.token);
      setUser(data.user);
      toast.success("Account created successfully!");
      navigate("/dashboard");
    },
    onError: (error) => {
      // toast.error(error.message);
    },
  });
  const { mutate, isPending: isLoading } = createAccountMutation;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutate({
      name,
      email,
      password,
    });
  };

  const getPasswordStrength = (password: string) => {
    if (!password) return { score: 0, text: "" };

    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    const texts = ["", "Weak", "Fair", "Good", "Strong"];
    return { score, text: texts[score] };
  };

  const strength = getPasswordStrength(password);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 px-4 sm:px-6 flex items-center justify-center relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 -right-40 w-96 h-96 bg-blue-200/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 -left-40 w-96 h-96 bg-indigo-300/20 rounded-full filter blur-3xl"></div>
      </div>

      <div className="w-full max-w-md">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-slate-600 dark:text-slate-400 mb-8 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to home
        </Link>

        <Card className="backdrop-blur-sm bg-white/90 dark:bg-slate-900/90 shadow-glossy border border-slate-200/50 dark:border-slate-700/50">
          <CardHeader className="text-center">
            <div className="mx-auto h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-2">
              <div className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 relative flex items-center justify-center">
                <div className="h-2 w-2 bg-white rounded-full"></div>
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">
              Create your account
            </CardTitle>
            <CardDescription>
              Sign up to access courses and start your learning journey
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white dark:bg-slate-900"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white dark:bg-slate-900"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10 bg-white dark:bg-slate-900"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>

                {password && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-slate-600 dark:text-slate-400 flex items-center">
                        Strength:{" "}
                        <span
                          className={`ml-1 font-medium ${
                            strength.score < 2
                              ? "text-red-500"
                              : strength.score < 3
                              ? "text-amber-500"
                              : "text-green-500"
                          }`}
                        >
                          {strength.text}
                        </span>
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          strength.score < 2
                            ? "bg-red-500"
                            : strength.score < 3
                            ? "bg-amber-500"
                            : "bg-green-500"
                        }`}
                        style={{ width: `${strength.score * 25}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <div className="space-y-2 mt-2">
                  <div
                    className={`flex items-center text-xs ${
                      password.length >= 8 ? "text-green-500" : "text-slate-500"
                    }`}
                  >
                    {password.length >= 8 ? (
                      <CheckCircle className="h-3 w-3 mr-1.5" />
                    ) : (
                      <div className="h-3 w-3 rounded-full border border-current mr-1.5"></div>
                    )}
                    At least 8 characters
                  </div>
                  <div
                    className={`flex items-center text-xs ${
                      /[A-Z]/.test(password)
                        ? "text-green-500"
                        : "text-slate-500"
                    }`}
                  >
                    {/[A-Z]/.test(password) ? (
                      <CheckCircle className="h-3 w-3 mr-1.5" />
                    ) : (
                      <div className="h-3 w-3 rounded-full border border-current mr-1.5"></div>
                    )}
                    At least one uppercase letter
                  </div>
                  <div
                    className={`flex items-center text-xs ${
                      /[0-9]/.test(password)
                        ? "text-green-500"
                        : "text-slate-500"
                    }`}
                  >
                    {/[0-9]/.test(password) ? (
                      <CheckCircle className="h-3 w-3 mr-1.5" />
                    ) : (
                      <div className="h-3 w-3 rounded-full border border-current mr-1.5"></div>
                    )}
                    At least one number
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col">
              <Button
                type="submit"
                className="w-full shadow-sm"
                disabled={isLoading || strength.text !== "Good"}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating account...
                  </div>
                ) : (
                  "Create Account"
                )}
              </Button>

              <div className="mt-4 text-xs text-slate-500 dark:text-slate-400 text-center">
                By creating an account, you agree to our
                <Link
                  to="/terms"
                  className="text-blue-600 dark:text-blue-400 hover:underline mx-1"
                >
                  Terms of Service
                </Link>
                and
                <Link
                  to="/privacy"
                  className="text-blue-600 dark:text-blue-400 hover:underline ml-1"
                >
                  Privacy Policy
                </Link>
                .
              </div>

              <div className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default withAuth(SignUp);
