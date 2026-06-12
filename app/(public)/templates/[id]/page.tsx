"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { SAMPLE_PROFILE_DATA } from "@/lib/sampleData";
import TemplateRenderer from "@/components/templates/TemplateRenderer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";

export default function TemplateDemoPage() {
  const params = useParams();
  const router = useRouter();
  const templateId = (params?.id as string) || "minimal";

  return (
    <div className="relative min-h-screen">
      {/* Floating Marketing Header Banner */}
      <div className="sticky top-0 z-50 w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-900 px-4 py-3 flex items-center justify-between gap-4 font-sans text-white">
        <div className="flex items-center gap-2">
          <Link href="/templates">
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white flex items-center gap-1.5 hover:bg-slate-900 px-2.5 h-8">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Gallery</span>
            </Button>
          </Link>
          <span className="hidden md:inline text-xs text-slate-500">|</span>
          <span className="hidden md:inline text-xs text-slate-400 font-medium">
            Demo Mode: Showing layout with sample data
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Button
            size="sm"
            onClick={() => router.push(`/login?callbackUrl=/dashboard/preview?template=${templateId}`)}
            className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold text-xs h-8 flex items-center gap-1.5 shadow-md shadow-violet-950/40"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Use This Template
          </Button>
        </div>
      </div>

      {/* Render the full-screen template */}
      <div className="min-h-[calc(100vh-53px)] bg-slate-950">
        <TemplateRenderer templateId={templateId} data={SAMPLE_PROFILE_DATA} />
      </div>
    </div>
  );
}
