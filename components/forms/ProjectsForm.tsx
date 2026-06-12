"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectSchema, ProjectValues } from "@/lib/validators";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Loader2, Save, Plus, Edit, Trash, ExternalLink, Github, Code } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProjectsFormProps {
  initialData?: ProjectValues[];
  onSave: (data: any) => Promise<boolean>;
}

export default function ProjectsForm({ initialData = [], onSave }: ProjectsFormProps) {
  const [projects, setProjects] = useState<ProjectValues[]>(initialData);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ProjectValues>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      title: "",
      description: "",
      techStack: [],
      liveUrl: "",
      githubUrl: "",
      imageUrl: "",
    },
  });

  // Handle open dialog for adding
  const handleAddOpen = () => {
    setEditingIndex(null);
    reset({
      title: "",
      description: "",
      techStack: [],
      liveUrl: "",
      githubUrl: "",
      imageUrl: "",
    });
    setIsOpen(true);
  };

  // Handle open dialog for editing
  const handleEditOpen = (index: number) => {
    setEditingIndex(index);
    const proj = projects[index];
    reset({
      title: proj.title,
      description: proj.description,
      techStack: proj.techStack,
      liveUrl: proj.liveUrl || "",
      githubUrl: proj.githubUrl || "",
      imageUrl: proj.imageUrl || "",
    });
    setIsOpen(true);
  };

  // Delete project
  const handleDelete = (index: number) => {
    const updated = projects.filter((_, i) => i !== index);
    setProjects(updated);
    toast({
      title: "Project removed",
      description: "Project has been removed. Remember to save changes.",
    });
  };

  // Form submission (Add or Edit)
  const onFormSubmit = (values: ProjectValues) => {
    if (editingIndex !== null) {
      // Edit mode
      const updated = [...projects];
      updated[editingIndex] = values;
      setProjects(updated);
      toast({
        title: "Project updated",
        description: "Click Save Changes to persist data.",
      });
    } else {
      // Add mode
      setProjects([...projects, values]);
      toast({
        title: "Project added",
        description: "Click Save Changes to persist data.",
      });
    }
    setIsOpen(false);
  };

  // Save changes to DB
  const handleSaveAll = async () => {
    setSaving(true);
    const success = await onSave({ projects });
    setSaving(false);
    if (success) {
      toast({
        title: "Projects saved",
        description: "All projects have been successfully saved to your portfolio.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="text-white">Projects</CardTitle>
            <CardDescription className="text-slate-400">
              Showcase your best engineering work, designs, or side projects.
            </CardDescription>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={handleAddOpen}
                className="bg-violet-600 hover:bg-violet-500 text-white flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Project
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-lg">
              <form onSubmit={handleSubmit(onFormSubmit)}>
                <DialogHeader>
                  <DialogTitle>
                    {editingIndex !== null ? "Edit Project" : "Add Project"}
                  </DialogTitle>
                  <DialogDescription className="text-slate-400">
                    Input project details to display on your portfolio.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  {/* Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-slate-300">Project Title</Label>
                    <Input
                      id="title"
                      {...register("title")}
                      placeholder="PortfolioForge"
                      className="bg-slate-950 border-slate-800 text-white focus-visible:ring-violet-600 focus-visible:ring-offset-slate-900"
                    />
                    {errors.title && (
                      <p className="text-xs text-rose-400">{errors.title.message}</p>
                    )}
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-slate-300">Description</Label>
                    <Textarea
                      id="description"
                      {...register("description")}
                      rows={3}
                      placeholder="Brief summary of what this project does, user experience, and key accomplishments."
                      className="bg-slate-950 border-slate-800 text-white focus-visible:ring-violet-600 focus-visible:ring-offset-slate-900"
                    />
                    {errors.description && (
                      <p className="text-xs text-rose-400">{errors.description.message}</p>
                    )}
                  </div>

                  {/* Tech Stack */}
                  <div className="space-y-2">
                    <Label htmlFor="techStack" className="text-slate-300">
                      Technologies used (comma separated)
                    </Label>
                    <Input
                      id="techStack"
                      placeholder="Next.js, TypeScript, Tailwind"
                      className="bg-slate-950 border-slate-800 text-white focus-visible:ring-violet-600"
                      onChange={(e) => {
                        const tags = e.target.value
                          .split(",")
                          .map((t) => t.trim())
                          .filter((t) => t.length > 0);
                        setValue("techStack", tags);
                      }}
                      defaultValue={
                        editingIndex !== null ? projects[editingIndex].techStack.join(", ") : ""
                      }
                    />
                    {errors.techStack && (
                      <p className="text-xs text-rose-400">{errors.techStack.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Live URL */}
                    <div className="space-y-2">
                      <Label htmlFor="liveUrl" className="text-slate-300">Live Demo URL</Label>
                      <Input
                        id="liveUrl"
                        {...register("liveUrl")}
                        placeholder="https://..."
                        className="bg-slate-950 border-slate-800 text-white focus-visible:ring-violet-600"
                      />
                      {errors.liveUrl && (
                        <p className="text-xs text-rose-400">{errors.liveUrl.message}</p>
                      )}
                    </div>

                    {/* GitHub URL */}
                    <div className="space-y-2">
                      <Label htmlFor="githubUrl" className="text-slate-300">GitHub Repository</Label>
                      <Input
                        id="githubUrl"
                        {...register("githubUrl")}
                        placeholder="https://github.com/..."
                        className="bg-slate-950 border-slate-800 text-white focus-visible:ring-violet-600"
                      />
                      {errors.githubUrl && (
                        <p className="text-xs text-rose-400">{errors.githubUrl.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Image URL */}
                  <div className="space-y-2">
                    <Label htmlFor="imageUrl" className="text-slate-300">Cover Image URL</Label>
                    <Input
                      id="imageUrl"
                      {...register("imageUrl")}
                      placeholder="https://images.unsplash.com/..."
                      className="bg-slate-950 border-slate-800 text-white focus-visible:ring-violet-600"
                    />
                    {errors.imageUrl && (
                      <p className="text-xs text-rose-400">{errors.imageUrl.message}</p>
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
                    {editingIndex !== null ? "Update Project" : "Add to List"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {/* Projects List */}
          <div className="space-y-4">
            {projects.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-slate-800 rounded-lg bg-slate-950/20">
                <Code className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <p className="text-sm text-slate-500 italic">No projects listed yet. Click "Add Project" above.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((project, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg bg-slate-950 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors"
                  >
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <h4 className="font-semibold text-white truncate">{project.title}</h4>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <button
                            onClick={() => handleEditOpen(idx)}
                            className="p-1 rounded text-slate-400 hover:text-violet-400 hover:bg-slate-900 transition-all"
                            title="Edit project"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(idx)}
                            className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-slate-900 transition-all"
                            title="Delete project"
                          >
                            <Trash className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-3 mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.techStack.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-900 text-slate-300 border border-slate-850"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 pt-2 border-t border-slate-900 text-xs font-medium text-slate-400">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 hover:text-violet-400 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Live Demo
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 hover:text-violet-400 transition-colors"
                        >
                          <Github className="w-3.5 h-3.5" />
                          GitHub
                        </a>
                      )}
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
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
