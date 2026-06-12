import { z } from "zod";

export const ProfileSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters."),
  title: z.string().min(2, "Title must be at least 2 characters."),
  bio: z.string().max(500, "Bio must be 500 characters or less.").default(""),
  avatarUrl: z.string().url("Must be a valid URL").or(z.literal("")).optional(),
  location: z.string().min(2, "Location must be at least 2 characters."),
  email: z.string().email("Must be a valid email address."),
  resumeUrl: z.string().url("Must be a valid URL").or(z.literal("")).optional(),
});

export const ProjectSchema = z.object({
  title: z.string().min(1, "Project title is required."),
  description: z.string().min(5, "Description must be at least 5 characters."),
  techStack: z.array(z.string()).min(1, "At least one technology is required."),
  liveUrl: z.string().url("Must be a valid URL").or(z.literal("")).optional(),
  githubUrl: z.string().url("Must be a valid URL").or(z.literal("")).optional(),
  imageUrl: z.string().url("Must be a valid URL").or(z.literal("")).optional(),
});

export const ExperienceSchema = z.object({
  role: z.string().min(1, "Role/Title is required."),
  company: z.string().min(1, "Company name is required."),
  from: z.string().min(1, "Start date is required."),
  to: z.string().min(1, "End date or 'Present' is required."),
  description: z.string().min(1, "Job description is required."),
});

export const EducationSchema = z.object({
  school: z.string().min(1, "School name is required."),
  degree: z.string().min(1, "Degree/Certificate is required."),
  from: z.string().min(1, "Start date is required."),
  to: z.string().min(1, "End date or 'Present' is required."),
});

export const SocialsSchema = z.object({
  github: z.string().url("Must be a valid URL").or(z.literal("")).optional(),
  linkedin: z.string().url("Must be a valid URL").or(z.literal("")).optional(),
  twitter: z.string().url("Must be a valid URL").or(z.literal("")).optional(),
  website: z.string().url("Must be a valid URL").or(z.literal("")).optional(),
});

export const PortfolioFormSchema = z.object({
  username: z.string().min(3).max(20),
  profile: ProfileSchema,
  skills: z.array(z.string()),
  projects: z.array(ProjectSchema),
  experience: z.array(ExperienceSchema),
  education: z.array(EducationSchema),
  socials: SocialsSchema,
});

export type ProfileFormValues = z.infer<typeof ProfileSchema>;
export type ProjectValues = z.infer<typeof ProjectSchema>;
export type ExperienceValues = z.infer<typeof ExperienceSchema>;
export type EducationValues = z.infer<typeof EducationSchema>;
export type SocialsValues = z.infer<typeof SocialsSchema>;
export type PortfolioFormValues = z.infer<typeof PortfolioFormSchema>;
