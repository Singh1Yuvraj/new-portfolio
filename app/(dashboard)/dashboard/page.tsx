"use client";

import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileForm from "@/components/forms/ProfileForm";
import SkillsForm from "@/components/forms/SkillsForm";
import ProjectsForm from "@/components/forms/ProjectsForm";
import ExperienceForm from "@/components/forms/ExperienceForm";
import EducationForm from "@/components/forms/EducationForm";
import SocialsForm from "@/components/forms/SocialsForm";
import { Loader2, User, Code, Briefcase, GraduationCap, Share2, Sparkles } from "lucide-react";

export default function DashboardPage() {
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch current profile data
  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/profile/me");
      if (!res.ok) {
        throw new Error("Failed to fetch profile data.");
      }
      const data = await res.json();
      setProfileData(data);
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Update profile data in DB
  const handleSave = async (updatedFields: any) => {
    try {
      const res = await fetch("/api/profile/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to update profile.");
      }
      
      const updatedUser = await res.json();
      setProfileData(updatedUser);
      return true;
    } catch (err: any) {
      alert(err.message || "Error saving details.");
      return false;
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-slate-400">
        <Loader2 className="w-8 h-8 animate-spin text-violet-500 mb-2" />
        <span className="text-sm">Loading your profile data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-rose-400 bg-rose-950/20 border border-rose-900 rounded-xl">
        <p className="font-semibold">Failed to load dashboard</p>
        <p className="text-xs text-slate-500 mt-1">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Edit Portfolio</h1>
        <p className="text-slate-400 text-sm mt-1">
          Complete the sections below to build your public profile page.
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-slate-900 border border-slate-800 p-1 flex flex-wrap h-auto gap-1">
          <TabsTrigger
            value="profile"
            className="flex items-center gap-2 text-xs md:text-sm py-2 px-3 data-[state=active]:bg-violet-600 data-[state=active]:text-white text-slate-400"
          >
            <User className="w-4 h-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger
            value="skills"
            className="flex items-center gap-2 text-xs md:text-sm py-2 px-3 data-[state=active]:bg-violet-600 data-[state=active]:text-white text-slate-400"
          >
            <Sparkles className="w-4 h-4" />
            Skills
          </TabsTrigger>
          <TabsTrigger
            value="projects"
            className="flex items-center gap-2 text-xs md:text-sm py-2 px-3 data-[state=active]:bg-violet-600 data-[state=active]:text-white text-slate-400"
          >
            <Code className="w-4 h-4" />
            Projects
          </TabsTrigger>
          <TabsTrigger
            value="experience"
            className="flex items-center gap-2 text-xs md:text-sm py-2 px-3 data-[state=active]:bg-violet-600 data-[state=active]:text-white text-slate-400"
          >
            <Briefcase className="w-4 h-4" />
            Experience
          </TabsTrigger>
          <TabsTrigger
            value="education"
            className="flex items-center gap-2 text-xs md:text-sm py-2 px-3 data-[state=active]:bg-violet-600 data-[state=active]:text-white text-slate-400"
          >
            <GraduationCap className="w-4 h-4" />
            Education
          </TabsTrigger>
          <TabsTrigger
            value="socials"
            className="flex items-center gap-2 text-xs md:text-sm py-2 px-3 data-[state=active]:bg-violet-600 data-[state=active]:text-white text-slate-400"
          >
            <Share2 className="w-4 h-4" />
            Socials
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="outline-none focus:ring-0">
          <ProfileForm initialData={profileData?.profile} onSave={handleSave} />
        </TabsContent>

        <TabsContent value="skills" className="outline-none focus:ring-0">
          <SkillsForm initialData={profileData?.skills} onSave={handleSave} />
        </TabsContent>

        <TabsContent value="projects" className="outline-none focus:ring-0">
          <ProjectsForm initialData={profileData?.projects} onSave={handleSave} />
        </TabsContent>

        <TabsContent value="experience" className="outline-none focus:ring-0">
          <ExperienceForm initialData={profileData?.experience} onSave={handleSave} />
        </TabsContent>

        <TabsContent value="education" className="outline-none focus:ring-0">
          <EducationForm initialData={profileData?.education} onSave={handleSave} />
        </TabsContent>

        <TabsContent value="socials" className="outline-none focus:ring-0">
          <SocialsForm initialData={profileData?.socials} onSave={handleSave} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
