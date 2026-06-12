"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, X, AlertCircle, Sparkles, Loader2, ArrowRight } from "lucide-react";

export default function OnboardingPage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  
  const [username, setUsername] = useState("");
  const [checking, setChecking] = useState(false);
  const [available, setAvailable] = useState<boolean | null>(null);
  const [feedback, setFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Redirect if unauthorized or if username is already set
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated" && (session?.user as any)?.username) {
      router.push("/dashboard");
    }
  }, [status, session, router]);

  // Debounced username checking
  useEffect(() => {
    if (!username) {
      setAvailable(null);
      setFeedback("");
      return;
    }

    const reg = /^[a-zA-Z0-9-_]+$/;
    if (!reg.test(username)) {
      setAvailable(false);
      setFeedback("Alphanumeric, hyphens, and underscores only.");
      return;
    }

    if (username.length < 3) {
      setAvailable(false);
      setFeedback("Min 3 characters required.");
      return;
    }

    if (username.length > 20) {
      setAvailable(false);
      setFeedback("Max 20 characters allowed.");
      return;
    }

    setChecking(true);
    setAvailable(null);
    setFeedback("");

    const delayDebounce = setTimeout(async () => {
      try {
        const res = await fetch("/api/username/check", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username }),
        });
        const data = await res.json();
        if (data.available) {
          setAvailable(true);
          setFeedback("Username is available!");
        } else {
          setAvailable(false);
          setFeedback(data.error || "Username is already taken.");
        }
      } catch (err) {
        setAvailable(false);
        setFeedback("Failed to check username.");
      } finally {
        setChecking(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [username]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!available || submitting) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/profile/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      if (res.ok) {
        // Force session update so the local session reflects the new username
        await update();
        router.push("/dashboard");
      } else {
        const data = await res.json();
        setAvailable(false);
        setFeedback(data.error || "Failed to set username.");
      }
    } catch (err) {
      setFeedback("A connection error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <Loader2 className="w-8 h-8 animate-spin text-violet-500" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-slate-950 overflow-hidden font-sans">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-600/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md p-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-emerald-400 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Step 1: Choose your URL</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Claim Your Identity
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            This is how people will find your portfolio website.
          </p>
        </div>

        <Card className="bg-slate-900/60 border-slate-800 backdrop-blur-xl shadow-2xl">
          <CardHeader>
            <CardTitle className="text-xl text-white">Choose your username</CardTitle>
            <CardDescription className="text-slate-400">
              Your public link will be: portfolioforge.com/u/your-username
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  URL Username
                </Label>
                <div className="relative">
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s/g, ""))}
                    placeholder="john-doe"
                    className="bg-slate-950 border-slate-800 text-white pr-10 focus-visible:ring-violet-600 focus-visible:ring-offset-slate-900"
                    maxLength={20}
                    required
                    disabled={submitting}
                  />
                  <div className="absolute right-3 top-3">
                    {checking && <Loader2 className="w-5 h-5 animate-spin text-slate-500" />}
                    {!checking && available === true && <Check className="w-5 h-5 text-emerald-500" />}
                    {!checking && available === false && <X className="w-5 h-5 text-rose-500" />}
                  </div>
                </div>

                {feedback && (
                  <div className={`flex items-center gap-1.5 text-xs font-medium ${available ? "text-emerald-400" : "text-rose-400"}`}>
                    {!available && <AlertCircle className="w-3.5 h-3.5" />}
                    <span>{feedback}</span>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <Button
                type="submit"
                disabled={!available || submitting || checking}
                className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-medium flex items-center justify-center gap-2 h-11 transition-all disabled:opacity-50 disabled:pointer-events-none"
              >
                {submitting ? "Saving..." : "Configure Portfolio Dashboard"}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
