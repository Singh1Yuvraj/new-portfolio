"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/shared/Navbar";
import { Sparkles, ArrowRight, CheckCircle2, LayoutTemplate, Zap, ShieldCheck, UserCheck } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-violet-600/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/10 blur-[130px] pointer-events-none" />

      <Navbar />

      {/* Hero Section */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 pt-20 pb-16 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-violet-400">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>Launch your portfolio today — 100% Free</span>
        </div>

        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl leading-tight max-w-4xl mx-auto">
          Deploy a Beautiful Portfolio in{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-400 to-emerald-400">
            5 Minutes
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-400 leading-relaxed">
          No coding, no server configurations, no design stress. Fill a simple form, choose one of our 6 premium templates, and share your unique public link.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4">
          <Link href="/login">
            <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-8 h-12 text-sm font-semibold shadow-lg shadow-violet-950/40 flex items-center gap-2">
              Get Started Now
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/templates">
            <Button variant="outline" className="bg-slate-950 border-slate-800 text-slate-300 hover:text-white px-8 h-12 text-sm font-semibold hover:bg-slate-900">
              Browse Templates
            </Button>
          </Link>
        </div>
      </section>

      {/* Template Demo Preview Area */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 py-8">
        <div className="p-2 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md shadow-2xl">
          <div className="bg-slate-950 rounded-xl overflow-hidden border border-slate-900 p-4 sm:p-6 space-y-6">
            {/* Mock Header */}
            <div className="flex justify-between items-center pb-4 border-b border-slate-900">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-mono">portfolioforge.com/u/alex-rivera</span>
              </div>
              <span className="text-[10px] uppercase font-bold text-violet-400 tracking-wider">
                Live Interactive Demo
              </span>
            </div>

            {/* Simulated portfolio content snippet */}
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-2xl font-bold text-white">Alex Rivera</h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                I build beautiful web apps and responsive design systems. Currently coding next-gen tools with React, TypeScript, and Tailwind.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {["Next.js", "React", "TypeScript", "Tailwind", "Framer Motion"].map((tech) => (
                  <span key={tech} className="text-[10px] font-semibold text-violet-300 bg-violet-950/20 border border-violet-900/40 px-2 py-0.5 rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card 1 */}
        <div className="p-6 rounded-xl bg-slate-900/30 border border-slate-800/80 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-violet-950/50 border border-violet-900/50 flex items-center justify-center">
            <Zap className="w-5 h-5 text-violet-400" />
          </div>
          <h3 className="font-bold text-white text-lg">Instant Preview</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Switch templates with one click and see your portfolio render instantly with your own data.
          </p>
        </div>

        {/* Card 2 */}
        <div className="p-6 rounded-xl bg-slate-900/30 border border-slate-800/80 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-950/50 border border-indigo-900/50 flex items-center justify-center">
            <LayoutTemplate className="w-5 h-5 text-indigo-400" />
          </div>
          <h3 className="font-bold text-white text-lg">6 Unique Themes</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            From minimal typography layouts to dark terminal console aesthetics. Find the theme that fits you.
          </p>
        </div>

        {/* Card 3 */}
        <div className="p-6 rounded-xl bg-slate-900/30 border border-slate-800/80 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-950/50 border border-emerald-900/50 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          </div>
          <h3 className="font-bold text-white text-lg">SEO & Mobile Ready</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Fully mobile responsive out of the box with automated meta tags generation for search engine optimization.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-900 py-8 text-center text-xs text-slate-500">
        &copy; {new Date().getFullYear()} PortfolioForge. Fast, beautiful hosted portfolios.
      </footer>
    </div>
  );
}
