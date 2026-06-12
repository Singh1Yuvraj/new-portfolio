"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Save, X, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SkillsFormProps {
  initialData?: string[];
  onSave: (data: any) => Promise<boolean>;
}

export default function SkillsForm({ initialData = [], onSave }: SkillsFormProps) {
  const [skills, setSkills] = useState<string[]>(initialData);
  const [newSkill, setNewSkill] = useState("");
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanSkill = newSkill.trim();
    if (cleanSkill && !skills.includes(cleanSkill)) {
      setSkills([...skills, cleanSkill]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const cleanSkill = newSkill.trim().replace(/,$/, "");
      if (cleanSkill && !skills.includes(cleanSkill)) {
        setSkills([...skills, cleanSkill]);
        setNewSkill("");
      }
    }
  };

  const handleSave = async () => {
    setSaving(true);
    const success = await onSave({ skills });
    setSaving(false);
    if (success) {
      toast({
        title: "Skills updated",
        description: "Your professional skills have been saved.",
      });
    }
  };

  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader>
        <CardTitle className="text-white">Skills</CardTitle>
        <CardDescription className="text-slate-400">
          Add tags for languages, libraries, tools, or frameworks you excel at.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add Skill Field */}
        <form onSubmit={handleAddSkill} className="flex gap-2">
          <div className="flex-1 space-y-1">
            <Label htmlFor="skillInput" className="sr-only">Add Skill</Label>
            <Input
              id="skillInput"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="React, Monorepos, Docker (press Enter or comma to add)"
              className="bg-slate-950 border-slate-800 text-white focus-visible:ring-violet-600 focus-visible:ring-offset-slate-900"
            />
          </div>
          <Button
            type="submit"
            size="icon"
            className="bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </form>

        {/* Skill Chips Area */}
        <div className="min-h-[100px] p-4 rounded-lg bg-slate-950/60 border border-slate-850 flex flex-wrap gap-2 items-start">
          {skills.length === 0 ? (
            <p className="text-sm text-slate-500 italic">No skills added yet.</p>
          ) : (
            skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-violet-950/30 border border-violet-850/40 text-violet-300 shadow-sm transition-all"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="hover:text-rose-400 focus:outline-none transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))
          )}
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="bg-violet-600 hover:bg-violet-500 text-white flex items-center gap-2 px-6"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Save Skills
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
