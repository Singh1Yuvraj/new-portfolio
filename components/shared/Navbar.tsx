"use client";

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Sparkles, LogOut, Layout, User } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-900 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-900/30 group-hover:scale-105 transition-transform">
            <Sparkles className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Portfolio<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">Forge</span>
          </span>
        </Link>

        {/* Action Items */}
        <div className="flex items-center gap-4">
          {session ? (
            <>
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white flex items-center gap-2 hover:bg-slate-900">
                  <Layout className="w-4 h-4" />
                  <span className="hidden sm:inline">Dashboard</span>
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                className="bg-slate-950 border-slate-800 text-slate-400 hover:text-rose-400 hover:bg-rose-950/20 hover:border-rose-900/50 flex items-center gap-2 transition-all"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            </>
          ) : (
            <Link href="/login">
              <Button size="sm" className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-md shadow-violet-950/40">
                Get Started
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
