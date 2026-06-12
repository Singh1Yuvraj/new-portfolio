"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SocialsSchema, SocialsValues } from "@/lib/validators";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Save, Github, Linkedin, Twitter, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SocialsFormProps {
  initialData?: SocialsValues;
  onSave: (data: any) => Promise<boolean>;
}

export default function SocialsForm({ initialData, onSave }: SocialsFormProps) {
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SocialsValues>({
    resolver: zodResolver(SocialsSchema),
    defaultValues: initialData || {
      github: "",
      linkedin: "",
      twitter: "",
      website: "",
    },
  });

  const onSubmit = async (values: SocialsValues) => {
    setSaving(true);
    const success = await onSave({ socials: values });
    setSaving(false);
    if (success) {
      toast({
        title: "Socials updated",
        description: "Your social media profile links have been saved.",
      });
    }
  };

  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader>
        <CardTitle className="text-white">Social Links</CardTitle>
        <CardDescription className="text-slate-400">
          Connect your online profile portfolios so companies and clients can find you elsewhere.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* GitHub */}
            <div className="space-y-2">
              <Label htmlFor="github" className="text-slate-300 flex items-center gap-2">
                <Github className="w-4 h-4 text-slate-400" />
                GitHub URL
              </Label>
              <Input
                id="github"
                {...register("github")}
                placeholder="https://github.com/johndoe"
                className="bg-slate-950 border-slate-800 text-white focus-visible:ring-violet-600"
              />
              {errors.github && (
                <p className="text-xs text-rose-400">{errors.github.message}</p>
              )}
            </div>

            {/* LinkedIn */}
            <div className="space-y-2">
              <Label htmlFor="linkedin" className="text-slate-300 flex items-center gap-2">
                <Linkedin className="w-4 h-4 text-slate-400" />
                LinkedIn URL
              </Label>
              <Input
                id="linkedin"
                {...register("linkedin")}
                placeholder="https://linkedin.com/in/johndoe"
                className="bg-slate-950 border-slate-800 text-white focus-visible:ring-violet-600"
              />
              {errors.linkedin && (
                <p className="text-xs text-rose-400">{errors.linkedin.message}</p>
              )}
            </div>

            {/* Twitter */}
            <div className="space-y-2">
              <Label htmlFor="twitter" className="text-slate-300 flex items-center gap-2">
                <Twitter className="w-4 h-4 text-slate-400" />
                Twitter / X URL
              </Label>
              <Input
                id="twitter"
                {...register("twitter")}
                placeholder="https://x.com/johndoe"
                className="bg-slate-950 border-slate-800 text-white focus-visible:ring-violet-600"
              />
              {errors.twitter && (
                <p className="text-xs text-rose-400">{errors.twitter.message}</p>
              )}
            </div>

            {/* Personal Website */}
            <div className="space-y-2">
              <Label htmlFor="website" className="text-slate-300 flex items-center gap-2">
                <Globe className="w-4 h-4 text-slate-400" />
                Personal Website
              </Label>
              <Input
                id="website"
                {...register("website")}
                placeholder="https://johndoe.com"
                className="bg-slate-950 border-slate-800 text-white focus-visible:ring-violet-600"
              />
              {errors.website && (
                <p className="text-xs text-rose-400">{errors.website.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={saving}
              className="bg-violet-600 hover:bg-violet-500 text-white flex items-center gap-2 px-6"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Save Socials
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
