"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExperienceSchema, ExperienceValues } from "@/lib/validators";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Loader2, Save, Plus, Edit, Trash, Briefcase, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ExperienceFormProps {
  initialData?: ExperienceValues[];
  onSave: (data: any) => Promise<boolean>;
}

export default function ExperienceForm({ initialData = [], onSave }: ExperienceFormProps) {
  const [experience, setExperience] = useState<ExperienceValues[]>(initialData);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExperienceValues>({
    resolver: zodResolver(ExperienceSchema),
    defaultValues: {
      role: "",
      company: "",
      from: "",
      to: "",
      description: "",
    },
  });

  const handleAddOpen = () => {
    setEditingIndex(null);
    reset({
      role: "",
      company: "",
      from: "",
      to: "",
      description: "",
    });
    setIsOpen(true);
  };

  const handleEditOpen = (index: number) => {
    setEditingIndex(index);
    const exp = experience[index];
    reset({
      role: exp.role,
      company: exp.company,
      from: exp.from,
      to: exp.to,
      description: exp.description,
    });
    setIsOpen(true);
  };

  const handleDelete = (index: number) => {
    const updated = experience.filter((_, i) => i !== index);
    setExperience(updated);
    toast({
      title: "Experience removed",
      description: "Experience item removed. Click Save to persist.",
    });
  };

  const onFormSubmit = (values: ExperienceValues) => {
    if (editingIndex !== null) {
      const updated = [...experience];
      updated[editingIndex] = values;
      setExperience(updated);
    } else {
      setExperience([...experience, values]);
    }
    setIsOpen(false);
  };

  const handleSaveAll = async () => {
    setSaving(true);
    const success = await onSave({ experience });
    setSaving(false);
    if (success) {
      toast({
        title: "Experience saved",
        description: "Your work history has been updated.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="text-white">Work Experience</CardTitle>
            <CardDescription className="text-slate-400">
              List your past roles, internships, or freelancing contract positions.
            </CardDescription>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={handleAddOpen}
                className="bg-violet-600 hover:bg-violet-500 text-white flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Position
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-lg">
              <form onSubmit={handleSubmit(onFormSubmit)}>
                <DialogHeader>
                  <DialogTitle>
                    {editingIndex !== null ? "Edit Position" : "Add Position"}
                  </DialogTitle>
                  <DialogDescription className="text-slate-400">
                    Input details of your professional role.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  {/* Role */}
                  <div className="space-y-2">
                    <Label htmlFor="role" className="text-slate-300">Job Role / Title</Label>
                    <Input
                      id="role"
                      {...register("role")}
                      placeholder="Senior React Engineer"
                      className="bg-slate-950 border-slate-800 text-white focus-visible:ring-violet-600"
                    />
                    {errors.role && (
                      <p className="text-xs text-rose-400">{errors.role.message}</p>
                    )}
                  </div>

                  {/* Company */}
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-slate-300">Company Name</Label>
                    <Input
                      id="company"
                      {...register("company")}
                      placeholder="Google / Acme Corp"
                      className="bg-slate-950 border-slate-800 text-white focus-visible:ring-violet-600"
                    />
                    {errors.company && (
                      <p className="text-xs text-rose-400">{errors.company.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* From */}
                    <div className="space-y-2">
                      <Label htmlFor="from" className="text-slate-300">Start Date</Label>
                      <Input
                        id="from"
                        {...register("from")}
                        placeholder="June 2022"
                        className="bg-slate-950 border-slate-800 text-white focus-visible:ring-violet-600"
                      />
                      {errors.from && (
                        <p className="text-xs text-rose-400">{errors.from.message}</p>
                      )}
                    </div>

                    {/* To */}
                    <div className="space-y-2">
                      <Label htmlFor="to" className="text-slate-300">End Date</Label>
                      <Input
                        id="to"
                        {...register("to")}
                        placeholder="Present / Jan 2024"
                        className="bg-slate-950 border-slate-800 text-white focus-visible:ring-violet-600"
                      />
                      {errors.to && (
                        <p className="text-xs text-rose-400">{errors.to.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="exp-description" className="text-slate-300">Description</Label>
                    <Textarea
                      id="exp-description"
                      {...register("description")}
                      rows={3}
                      placeholder="Detail your responsibilities, team impact, and key technical implementations."
                      className="bg-slate-950 border-slate-800 text-white focus-visible:ring-violet-600 resize-none"
                    />
                    {errors.description && (
                      <p className="text-xs text-rose-400">{errors.description.message}</p>
                    )}
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setIsOpen(false)}
                    className="text-slate-400 hover:text-white"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-violet-600 hover:bg-violet-500 text-white"
                  >
                    {editingIndex !== null ? "Update Position" : "Add Position"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {/* Experience List */}
          <div className="space-y-4">
            {experience.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-slate-800 rounded-lg bg-slate-950/20">
                <Briefcase className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <p className="text-sm text-slate-500 italic">No job experiences listed. Click "Add Position".</p>
              </div>
            ) : (
              <div className="space-y-3">
                {experience.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg bg-slate-950 border border-slate-800 flex justify-between items-start gap-4 hover:border-slate-700 transition-colors"
                  >
                    <div className="space-y-1">
                      <h4 className="font-semibold text-white text-sm sm:text-base">
                        {item.role} <span className="text-slate-500">at</span> {item.company}
                      </h4>
                      <div className="flex items-center gap-1.5 text-xs text-violet-400 font-medium">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{item.from} — {item.to}</span>
                      </div>
                      <p className="text-xs text-slate-400 pt-1 leading-relaxed">{item.description}</p>
                    </div>
                    
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button
                        onClick={() => handleEditOpen(idx)}
                        className="p-1 rounded text-slate-400 hover:text-violet-400 hover:bg-slate-900 transition-all"
                        title="Edit position"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(idx)}
                        className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-slate-900 transition-all"
                        title="Delete position"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="justify-end border-t border-slate-850/50 pt-4">
          <Button
            type="button"
            onClick={handleSaveAll}
            disabled={saving}
            className="bg-violet-600 hover:bg-violet-500 text-white flex items-center gap-2 px-6"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Save Experience
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
