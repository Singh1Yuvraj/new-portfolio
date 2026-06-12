"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EducationSchema, EducationValues } from "@/lib/validators";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Loader2, Save, Plus, Edit, Trash, GraduationCap, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EducationFormProps {
  initialData?: EducationValues[];
  onSave: (data: any) => Promise<boolean>;
}

export default function EducationForm({ initialData = [], onSave }: EducationFormProps) {
  const [education, setEducation] = useState<EducationValues[]>(initialData);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EducationValues>({
    resolver: zodResolver(EducationSchema),
    defaultValues: {
      school: "",
      degree: "",
      from: "",
      to: "",
    },
  });

  const handleAddOpen = () => {
    setEditingIndex(null);
    reset({
      school: "",
      degree: "",
      from: "",
      to: "",
    });
    setIsOpen(true);
  };

  const handleEditOpen = (index: number) => {
    setEditingIndex(index);
    const edu = education[index];
    reset({
      school: edu.school,
      degree: edu.degree,
      from: edu.from,
      to: edu.to,
    });
    setIsOpen(true);
  };

  const handleDelete = (index: number) => {
    const updated = education.filter((_, i) => i !== index);
    setEducation(updated);
    toast({
      title: "Education removed",
      description: "Education item removed. Click Save to persist changes.",
    });
  };

  const onFormSubmit = (values: EducationValues) => {
    if (editingIndex !== null) {
      const updated = [...education];
      updated[editingIndex] = values;
      setEducation(updated);
    } else {
      setEducation([...education, values]);
    }
    setIsOpen(false);
  };

  const handleSaveAll = async () => {
    setSaving(true);
    const success = await onSave({ education });
    setSaving(false);
    if (success) {
      toast({
        title: "Education saved",
        description: "Your educational history has been updated.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="text-white">Education</CardTitle>
            <CardDescription className="text-slate-400">
              Add details of your degrees, schools, colleges, or online bootcamps.
            </CardDescription>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={handleAddOpen}
                className="bg-violet-600 hover:bg-violet-500 text-white flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Education
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-lg">
              <form onSubmit={handleSubmit(onFormSubmit)}>
                <DialogHeader>
                  <DialogTitle>
                    {editingIndex !== null ? "Edit Education" : "Add Education"}
                  </DialogTitle>
                  <DialogDescription className="text-slate-400">
                    Input details of your academic degree or program.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  {/* School */}
                  <div className="space-y-2">
                    <Label htmlFor="school" className="text-slate-300">School / Institution</Label>
                    <Input
                      id="school"
                      {...register("school")}
                      placeholder="University of California, Berkeley"
                      className="bg-slate-950 border-slate-800 text-white focus-visible:ring-violet-600"
                    />
                    {errors.school && (
                      <p className="text-xs text-rose-400">{errors.school.message}</p>
                    )}
                  </div>

                  {/* Degree */}
                  <div className="space-y-2">
                    <Label htmlFor="degree" className="text-slate-300">Degree / Bootcamp Program</Label>
                    <Input
                      id="degree"
                      {...register("degree")}
                      placeholder="Bachelor of Science in Computer Science"
                      className="bg-slate-950 border-slate-800 text-white focus-visible:ring-violet-600"
                    />
                    {errors.degree && (
                      <p className="text-xs text-rose-400">{errors.degree.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* From */}
                    <div className="space-y-2">
                      <Label htmlFor="school-from" className="text-slate-300">Start Date</Label>
                      <Input
                        id="school-from"
                        {...register("from")}
                        placeholder="Sept 2018"
                        className="bg-slate-950 border-slate-800 text-white focus-visible:ring-violet-600"
                      />
                      {errors.from && (
                        <p className="text-xs text-rose-400">{errors.from.message}</p>
                      )}
                    </div>

                    {/* To */}
                    <div className="space-y-2">
                      <Label htmlFor="school-to" className="text-slate-300">End Date</Label>
                      <Input
                        id="school-to"
                        {...register("to")}
                        placeholder="May 2022 / Present"
                        className="bg-slate-950 border-slate-800 text-white focus-visible:ring-violet-600"
                      />
                      {errors.to && (
                        <p className="text-xs text-rose-400">{errors.to.message}</p>
                      )}
                    </div>
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
                    {editingIndex !== null ? "Update" : "Add Education"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {/* Education List */}
          <div className="space-y-4">
            {education.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-slate-800 rounded-lg bg-slate-950/20">
                <GraduationCap className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <p className="text-sm text-slate-500 italic">No academic education items listed.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {education.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg bg-slate-950 border border-slate-800 flex justify-between items-start gap-4 hover:border-slate-700 transition-colors"
                  >
                    <div className="space-y-1">
                      <h4 className="font-semibold text-white text-sm sm:text-base">{item.degree}</h4>
                      <p className="text-xs text-slate-400">{item.school}</p>
                      <div className="flex items-center gap-1.5 text-xs text-violet-400 font-medium pt-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{item.from} — {item.to}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button
                        onClick={() => handleEditOpen(idx)}
                        className="p-1 rounded text-slate-400 hover:text-violet-400 hover:bg-slate-900 transition-all"
                        title="Edit education"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(idx)}
                        className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-slate-900 transition-all"
                        title="Delete education"
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
            Save Education
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
