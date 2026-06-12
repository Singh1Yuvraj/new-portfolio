"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { TEMPLATES } from "@/lib/templates";
import TemplateCard from "@/components/gallery/TemplateCard";
import Navbar from "@/components/shared/Navbar";
import { Sparkles, Layout } from "lucide-react";

export default function PublicTemplatesPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-16 space-y-12">
        {/* Intro */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-indigo-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Discover templates built for impact</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Choose Your Blueprint
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Browse our curated gallery of beautiful, responsive templates. Try any template with sample data or sign up to deploy yours instantly.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
          {TEMPLATES.map((tpl) => (
            <TemplateCard
              key={tpl.id}
              template={tpl}
              isPublicView={true}
              onApply={() => router.push(`/login?callbackUrl=/dashboard/preview?template=${tpl.id}`)}
              onPreview={() => router.push(`/templates/${tpl.id}`)}
            />
          ))}
        </div>
      </main>

      <footer className="border-t border-slate-900 py-8 text-center text-xs text-slate-500">
        &copy; {new Date().getFullYear()} PortfolioForge. Fast, beautiful hosted portfolios.
      </footer>
    </div>
  );
}
