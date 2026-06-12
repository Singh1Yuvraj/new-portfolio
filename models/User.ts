import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProject {
  title: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
}

export interface IExperience {
  role: string;
  company: string;
  from: string;
  to: string;
  description: string;
}

export interface IEducation {
  school: string;
  degree: string;
  from: string;
  to: string;
}

export interface IUser extends Document {
  email: string;
  username: string; // unique, URL slug
  createdAt: Date;
  updatedAt: Date;
  profile: {
    fullName: string;
    title: string;
    bio: string;
    avatarUrl: string;
    location: string;
    email: string;
    resumeUrl?: string;
  };
  skills: string[];
  projects: IProject[];
  experience: IExperience[];
  education: IEducation[];
  socials: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  settings: {
    template: "minimal" | "modern" | "developer" | "creative" | "professional" | "dark";
    isPublic: boolean;
    templateHistory: string[];
  };
}

const ProjectSchema = new Schema<IProject>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  techStack: [{ type: String }],
  liveUrl: { type: String, default: "" },
  githubUrl: { type: String, default: "" },
  imageUrl: { type: String, default: "" },
});

const ExperienceSchema = new Schema<IExperience>({
  role: { type: String, required: true },
  company: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  description: { type: String, required: true },
});

const EducationSchema = new Schema<IEducation>({
  school: { type: String, required: true },
  degree: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
});

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, unique: true, sparse: true }, // unique URL slug, sparse allows null for OAuth users before onboarding
    profile: {
      fullName: { type: String, default: "" },
      title: { type: String, default: "" },
      bio: { type: String, default: "" },
      avatarUrl: { type: String, default: "" },
      location: { type: String, default: "" },
      email: { type: String, default: "" },
      resumeUrl: { type: String, default: "" },
    },
    skills: [{ type: String }],
    projects: [ProjectSchema],
    experience: [ExperienceSchema],
    education: [EducationSchema],
    socials: {
      github: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      twitter: { type: String, default: "" },
      website: { type: String, default: "" },
    },
    settings: {
      template: {
        type: String,
        enum: ["minimal", "modern", "developer", "creative", "professional", "dark"],
        default: "minimal",
      },
      isPublic: { type: Boolean, default: true },
      templateHistory: [{ type: String }],
    },
  },
  {
    timestamps: true,
  }
);

import { MockUser } from "../lib/mockDb";

// Prevent compiling model in development on hot reload
const ActualUser: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

const UserProxy = new Proxy({} as any, {
  get(target, prop) {
    if (global.useMockDb) {
      return (MockUser as any)[prop];
    }
    return (ActualUser as any)[prop];
  }
});

export default UserProxy as unknown as Model<IUser>;

