"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Eye, Layout, Monitor, Loader2 } from "lucide-react";

interface TemplateCardProps {
  template: {
    id: string;
    name: string;
    description: string;
    tags: string[];
    thumbnail: string;
  };
  isActive?: boolean;
  onApply?: () => void;
  onPreview?: () => void;
  isApplying?: boolean;
  isPublicView?: boolean;
}

export default function TemplateCard({
  template,
  isActive = false,
  onApply,
  onPreview,
  isApplying = false,
  isPublicView = false,
}: TemplateCardProps) {
  
  // Custom CSS/SVG mock representation to show layout pattern when thumbnails aren't ready
  const renderMockThumbnail = () => {
    switch (template.id) {
      case "minimal":
        return (
          <div className="w-full h-full bg-white flex flex-col justify-between p-3 border-b border-slate-800/20 text-stone-900 select-none">
            <div className="space-y-1">
              <div className="w-6 h-6 rounded-full bg-stone-200" />
              <div className="w-24 h-3.5 bg-stone-900 rounded" />
              <div className="w-32 h-2.5 bg-stone-400 rounded" />
              <div className="w-40 h-2 bg-stone-200 rounded pt-0.5" />
            </div>
            <div className="space-y-1">
              <div className="w-full h-8 bg-stone-50 border border-stone-150 rounded" />
              <div className="w-16 h-2 bg-stone-300 rounded" />
            </div>
          </div>
        );
      case "modern":
        return (
          <div className="w-full h-full bg-slate-950 flex flex-col justify-between p-3 border-b border-slate-800/20 text-slate-100 select-none relative overflow-hidden">
            <div className="absolute top-[-20%] left-[-10%] w-24 h-24 rounded-full bg-violet-600/20 blur-xl" />
            <div className="flex gap-2 items-center relative z-10">
              <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-850" />
              <div className="space-y-1">
                <div className="w-16 h-2 bg-white rounded" />
                <div className="w-10 h-1.5 bg-violet-400 rounded" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 relative z-10">
              <div className="h-10 bg-slate-900/60 border border-slate-800 rounded-lg" />
              <div className="h-10 bg-slate-900/60 border border-slate-800 rounded-lg" />
            </div>
          </div>
        );
      case "developer":
        return (
          <div className="w-full h-full bg-black flex flex-col p-3 border-b border-slate-800/20 text-green-400 font-mono text-[9px] select-none">
            <div className="flex gap-1 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </div>
            <div className="space-y-1.5 pt-1">
              <p className="text-zinc-500">$ whoami</p>
              <div className="flex gap-2">
                <div className="w-5 h-5 bg-zinc-900 border border-green-500/20" />
                <div className="w-20 h-2 bg-white rounded" />
              </div>
              <p className="text-zinc-500">$ ls skills/</p>
              <div className="flex gap-1.5">
                <span className="bg-green-950/40 border border-green-900 px-1">node*</span>
                <span className="bg-green-950/40 border border-green-900 px-1">react*</span>
              </div>
            </div>
          </div>
        );
      case "creative":
        return (
          <div className="w-full h-full bg-yellow-50 flex flex-col justify-between p-3 border-b border-slate-800/20 text-slate-900 select-none">
            <div className="p-2 bg-violet-200 border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)] space-y-1">
              <div className="w-5 h-5 rounded-full bg-white border border-black" />
              <div className="w-16 h-2 bg-black rounded" />
            </div>
            <div className="flex justify-between gap-2">
              <div className="flex-1 h-8 bg-emerald-250 border-2 border-black rounded shadow-[1px_1px_0px_rgba(0,0,0,1)]" />
              <div className="flex-1 h-8 bg-rose-250 border-2 border-black rounded shadow-[1px_1px_0px_rgba(0,0,0,1)]" />
            </div>
          </div>
        );
      case "professional":
        return (
          <div className="w-full h-full bg-slate-100 flex flex-col p-3 border-b border-slate-800/20 text-slate-850 select-none">
            <div className="pb-2 border-b border-slate-200 flex justify-between items-center">
              <div className="w-12 h-2 bg-slate-900 rounded" />
              <div className="w-8 h-1.5 bg-slate-400 rounded" />
            </div>
            <div className="grid grid-cols-3 gap-2 pt-2 flex-1">
              <div className="col-span-1 border-r border-slate-200 space-y-1 pr-1">
                <div className="w-full h-1 bg-slate-300 rounded" />
                <div className="w-6 h-1 bg-slate-400 rounded" />
              </div>
              <div className="col-span-2 space-y-2">
                <div className="space-y-1">
                  <div className="w-full h-1.5 bg-slate-800 rounded" />
                  <div className="w-12 h-1 bg-slate-400 rounded" />
                </div>
                <div className="space-y-1">
                  <div className="w-full h-1.5 bg-slate-800 rounded" />
                  <div className="w-12 h-1 bg-slate-400 rounded" />
                </div>
              </div>
            </div>
          </div>
        );
      case "dark":
        return (
          <div className="w-full h-full bg-black flex flex-col justify-between p-3 border-b border-slate-800/20 text-zinc-350 select-none relative overflow-hidden">
            <div className="absolute bottom-[-10%] right-[-10%] w-24 h-24 rounded-full bg-cyan-500/5 blur-xl" />
            <div className="p-2 bg-zinc-950 border border-zinc-900 rounded-lg">
              <div className="w-12 h-2.5 bg-white rounded" />
              <div className="w-16 h-1.5 bg-cyan-400 rounded mt-1" />
            </div>
            <div className="h-8 bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 flex justify-between items-center">
              <div className="w-16 h-1 bg-zinc-700 rounded" />
              <div className="w-6 h-1 bg-emerald-400 rounded" />
            </div>
          </div>
        );
      default:
        return <div className="w-full h-full bg-slate-900" />;
    }
  };

  return (
    <Card
      className={`bg-slate-900 border-slate-800 hover:border-slate-700 overflow-hidden flex flex-col transition-all duration-300 shadow-lg ${
        isActive ? "ring-2 ring-violet-500 border-transparent shadow-violet-950/20" : ""
      }`}
    >
      {/* Mock Thumbnail Frame */}
      <div className="h-44 relative bg-slate-950 flex items-center justify-center overflow-hidden">
        {renderMockThumbnail()}
        {isActive && (
          <div className="absolute top-3 right-3 bg-violet-600 text-white rounded-full p-1.5 shadow-md shadow-violet-950/50">
            <Check className="w-4 h-4" />
          </div>
        )}
      </div>

      <CardHeader className="p-4 space-y-1">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-bold text-white">{template.name}</CardTitle>
          <div className="flex gap-1.5">
            {template.tags.slice(0, 2).map((t, idx) => (
              <span key={idx} className="text-[10px] font-semibold text-slate-500 tracking-wide bg-slate-950 px-2 py-0.5 rounded border border-slate-850">
                {t}
              </span>
            ))}
          </div>
        </div>
        <CardDescription className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
          {template.description}
        </CardDescription>
      </CardHeader>
      
      <CardFooter className="p-4 pt-0 mt-auto flex gap-2 border-t border-slate-850/40">
        {isPublicView ? (
          <>
            <Button
              onClick={onPreview}
              variant="outline"
              className="flex-1 text-xs bg-slate-950 border-slate-850 text-slate-300 hover:text-white h-9"
            >
              <Eye className="w-3.5 h-3.5 mr-1.5" />
              Live Demo
            </Button>
            <Button
              onClick={onApply}
              className="flex-1 text-xs bg-violet-600 hover:bg-violet-500 text-white h-9"
            >
              Use Theme
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={onPreview}
              variant="outline"
              className="flex-1 text-xs bg-slate-950 border-slate-850 text-slate-300 hover:text-white h-9"
            >
              <Monitor className="w-3.5 h-3.5 mr-1.5" />
              Preview Data
            </Button>
            {!isActive && (
              <Button
                onClick={onApply}
                disabled={isApplying}
                className="flex-1 text-xs bg-violet-600 hover:bg-violet-500 text-white h-9"
              >
                {isApplying ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  "Apply Theme"
                )}
              </Button>
            )}
          </>
        )}
      </CardFooter>
    </Card>
  );
}
