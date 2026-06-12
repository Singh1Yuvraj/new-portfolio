"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TEMPLATES } from "@/lib/templates";
import TemplateCard from "@/components/gallery/TemplateCard";
import { Loader2, LayoutTemplate } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function DashboardTemplatesPage() {
  const [currentTemplateId, setCurrentTemplateId] = useState<string>("minimal");
  const [loading, setLoading] = useState(true);
  const [applyingId, setApplyingId] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  const fetchCurrentSettings = async () => {
    try {
      const res = await fetch("/api/profile/me");
      if (res.ok) {
        const data = await res.json();
        if (data.settings?.template) {
          setCurrentTemplateId(data.settings.template);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentSettings();
  }, []);

  const handleApplyTemplate = async (templateId: string) => {
    setApplyingId(templateId);
    try {
      const res = await fetch("/api/profile/template", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateId }),
      });

      if (res.ok) {
        setCurrentTemplateId(templateId);
        toast({
          title: "Template applied!",
          description: `Your portfolio theme has been changed to ${templateId}.`,
        });
      } else {
        const data = await res.json();
        throw new Error(data.error || "Failed to update template.");
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to switch template.",
        variant: "destructive",
      });
    } finally {
      setApplyingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-slate-400">
        <Loader2 className="w-8 h-8 animate-spin text-violet-500 mb-2" />
        <span className="text-sm">Loading templates catalog...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
          <LayoutTemplate className="w-8 h-8 text-indigo-400" />
          Template Gallery
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Choose a theme to apply to your portfolio website. All themes work with your data.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {TEMPLATES.map((tpl) => (
          <TemplateCard
            key={tpl.id}
            template={tpl}
            isActive={currentTemplateId === tpl.id}
            isApplying={applyingId === tpl.id}
            onApply={() => handleApplyTemplate(tpl.id)}
            onPreview={() => router.push(`/dashboard/preview?template=${tpl.id}`)}
          />
        ))}
      </div>
    </div>
  );
}
