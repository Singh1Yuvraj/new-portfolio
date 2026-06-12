"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { TEMPLATES } from "@/lib/templates";
import TemplateRenderer from "@/components/templates/TemplateRenderer";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Monitor, Smartphone, Save, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

export default function DashboardPreviewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  
  const initialTemplate = searchParams.get("template") || "minimal";
  
  const [templateId, setTemplateId] = useState(initialTemplate);
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/profile/me");
        if (res.ok) {
          const data = await res.json();
          setProfileData(data);
          // If no template param is in URL, default to their saved one
          if (!searchParams.get("template") && data.settings?.template) {
            setTemplateId(data.settings.template);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [searchParams]);

  const handleApplyTemplate = async () => {
    setApplying(true);
    try {
      const res = await fetch("/api/profile/template", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateId }),
      });

      if (res.ok) {
        toast({
          title: "Template applied!",
          description: "This layout is now set for your public portfolio.",
        });
        // Update user state if cached
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to apply template.",
        variant: "destructive",
      });
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-slate-400">
        <Loader2 className="w-8 h-8 animate-spin text-violet-500 mb-2" />
        <span className="text-sm">Loading portfolio preview...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 flex flex-col h-full">
      {/* Control bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/templates">
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-950">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-lg font-bold text-white leading-tight">Theme Preview</h1>
            <p className="text-[10px] text-slate-400">Testing templates with your saved profile data.</p>
          </div>
        </div>

        {/* Action Widgets */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Template Switcher */}
          <div className="w-44">
            <Select value={templateId} onValueChange={(val) => setTemplateId(val)}>
              <SelectTrigger className="bg-slate-950 border-slate-800 text-white text-xs h-9">
                <SelectValue placeholder="Select Template" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-slate-850 text-white">
                {TEMPLATES.map((t) => (
                  <SelectItem key={t.id} value={t.id} className="text-xs hover:bg-slate-950 cursor-pointer">
                    {t.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Viewport Toggles */}
          <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-0.5">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewMode("desktop")}
              className={`h-8 w-8 text-slate-400 rounded-md ${
                viewMode === "desktop" ? "bg-slate-900 text-white" : ""
              }`}
              title="Desktop view"
            >
              <Monitor className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewMode("mobile")}
              className={`h-8 w-8 text-slate-400 rounded-md ${
                viewMode === "mobile" ? "bg-slate-900 text-white" : ""
              }`}
              title="Mobile view"
            >
              <Smartphone className="w-4 h-4" />
            </Button>
          </div>

          {/* Apply Button */}
          <Button
            onClick={handleApplyTemplate}
            disabled={applying || profileData?.settings?.template === templateId}
            className="bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold px-4 h-9 flex items-center gap-1.5"
          >
            {applying ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            {profileData?.settings?.template === templateId ? "Active" : "Apply Theme"}
          </Button>
        </div>
      </div>

      {/* Viewport Frame Panel */}
      <div className="flex-1 bg-slate-950/40 border border-slate-900 rounded-xl p-4 flex items-center justify-center min-h-[500px]">
        <div
          className={`h-full w-full bg-slate-900 border border-slate-800 rounded-lg overflow-hidden shadow-2xl transition-all duration-300 ${
            viewMode === "mobile" ? "max-w-sm aspect-[9/16] ring-8 ring-slate-900 border-slate-850" : "max-w-full"
          }`}
        >
          {/* Scrollable container for previewed content */}
          <div className="h-full overflow-y-auto bg-slate-950">
            {profileData && (
              <TemplateRenderer templateId={templateId} data={profileData} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
