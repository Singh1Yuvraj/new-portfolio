"use client";

import React, { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, ArrowRight, Github, Chrome, Loader2 } from "lucide-react";

function LoginContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  
  const [email, setEmail] = useState("dev@example.com");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await signIn("google", { callbackUrl });
    } catch (err) {
      setError("Failed to initialize Google login. Try the Development Bypass.");
      setIsLoading(false);
    }
  };

  const handleBypassLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const res = await signIn("bypass", {
        email,
        callbackUrl,
        redirect: false,
      });

      if (res?.error) {
        setError(res.error);
      } else {
        router.push(callbackUrl);
      }
    } catch (err) {
      setError("An error occurred during local bypass login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-slate-950 overflow-hidden font-sans">
      {/* Dynamic background highlights */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-600/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md p-4">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-violet-400 mb-4">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>Forge your professional web presence</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Portfolio<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-500">Forge</span>
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Create a stunning portfolio website in under 5 minutes.
          </p>
        </div>

        <Card className="bg-slate-900/60 border-slate-800 backdrop-blur-xl shadow-2xl">
          <CardHeader>
            <CardTitle className="text-xl text-white">Welcome back</CardTitle>
            <CardDescription className="text-slate-400">
              Sign in to manage your portfolio or create a new one.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <div className="p-3 text-xs font-medium text-rose-400 bg-rose-950/30 border border-rose-800/40 rounded-lg">
                {error}
              </div>
            )}

            <Button
              variant="outline"
              className="w-full bg-slate-950 hover:bg-slate-900 border-slate-800 text-slate-200 hover:text-white flex items-center justify-center gap-3 h-11 transition-all"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <Chrome className="w-5 h-5 text-indigo-400" />
              Sign in with Google
            </Button>

            <div className="relative flex items-center justify-center py-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-800" />
              </div>
              <span className="relative px-3 bg-slate-900 text-slate-500 text-xs uppercase tracking-wider">
                Local Testing Bypass
              </span>
            </div>

            <form onSubmit={handleBypassLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Developer Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="dev@example.com"
                  className="bg-slate-950 border-slate-800 text-white focus-visible:ring-violet-600 focus-visible:ring-offset-slate-900"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-medium flex items-center justify-center gap-2 h-11 transition-all shadow-lg shadow-violet-900/30"
              >
                {isLoading ? "Connecting..." : "Bypass with Credentials"}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col text-center border-t border-slate-800/50 pt-4">
            <span className="text-xs text-slate-500">
              By signing in, you agree to our Terms of Service.
            </span>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <Loader2 className="w-8 h-8 animate-spin text-violet-500" />
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
