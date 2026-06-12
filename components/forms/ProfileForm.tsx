"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileSchema, ProfileFormValues } from "@/lib/validators";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProfileFormProps {
  initialData?: ProfileFormValues;
  onSave: (data: any) => Promise<boolean>;
}

export default function ProfileForm({ initialData, onSave }: ProfileFormProps) {
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: initialData || {
      fullName: "",
      title: "",
      bio: "",
      avatarUrl: "",
      location: "",
      email: "",
      resumeUrl: "",
    },
  });

  const onSubmit = async (values: ProfileFormValues) => {
    setSaving(true);
    const success = await onSave({ profile: values });
    setSaving(false);
    if (success) {
      toast({
        title: "Profile updated",
        description: "Your basic profile information has been saved.",
      });
    }
  };

  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader>
        <CardTitle className="text-white">Profile Details</CardTitle>
        <CardDescription className="text-slate-400">
          This information will be displayed as the main header of your portfolio.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-slate-300">Full Name</Label>
              <Input
                id="fullName"
                {...register("fullName")}
                className="bg-slate-950 border-slate-800 text-white focus-visible:ring-violet-600 focus-visible:ring-offset-slate-900"
                placeholder="Jane Doe"
              />
              {errors.fullName && (
                <p className="text-xs text-rose-400">{errors.fullName.message}</p>
              )}
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-slate-300">Professional Title</Label>
              <Input
                id="title"
                {...register("title")}
                className="bg-slate-950 border-slate-800 text-white focus-visible:ring-violet-600 focus-visible:ring-offset-slate-900"
                placeholder="Creative Director / Full Stack Dev"
              />
              {errors.title && (
                <p className="text-xs text-rose-400">{errors.title.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">Public Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                className="bg-slate-950 border-slate-800 text-white focus-visible:ring-violet-600 focus-visible:ring-offset-slate-900"
                placeholder="jane@example.com"
              />
              {errors.email && (
                <p className="text-xs text-rose-400">{errors.email.message}</p>
              )}
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location" className="text-slate-300">Location</Label>
              <Input
                id="location"
                {...register("location")}
                className="bg-slate-950 border-slate-800 text-white focus-visible:ring-violet-600 focus-visible:ring-offset-slate-900"
                placeholder="New York, NY"
              />
              {errors.location && (
                <p className="text-xs text-rose-400">{errors.location.message}</p>
              )}
            </div>

            {/* Avatar URL */}
            <div className="space-y-2">
              <Label htmlFor="avatarUrl" className="text-slate-300">Avatar Image URL</Label>
              <Input
                id="avatarUrl"
                {...register("avatarUrl")}
                className="bg-slate-950 border-slate-800 text-white focus-visible:ring-violet-600 focus-visible:ring-offset-slate-900"
                placeholder="https://images.unsplash.com/photo-..."
              />
              {errors.avatarUrl && (
                <p className="text-xs text-rose-400">{errors.avatarUrl.message}</p>
              )}
            </div>

            {/* Resume URL */}
            <div className="space-y-2">
              <Label htmlFor="resumeUrl" className="text-slate-300">Resume Link (optional)</Label>
              <Input
                id="resumeUrl"
                {...register("resumeUrl")}
                className="bg-slate-950 border-slate-800 text-white focus-visible:ring-violet-600 focus-visible:ring-offset-slate-900"
                placeholder="https://drive.google.com/..."
              />
              {errors.resumeUrl && (
                <p className="text-xs text-rose-400">{errors.resumeUrl.message}</p>
              )}
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio" className="text-slate-300">Short Bio</Label>
            <Textarea
              id="bio"
              {...register("bio")}
              rows={4}
              className="bg-slate-950 border-slate-800 text-white focus-visible:ring-violet-600 focus-visible:ring-offset-slate-900 resize-none"
              placeholder="Tell your story. Keep it brief and punchy..."
            />
            {errors.bio && (
              <p className="text-xs text-rose-400">{errors.bio.message}</p>
            )}
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
              Save Profile
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
