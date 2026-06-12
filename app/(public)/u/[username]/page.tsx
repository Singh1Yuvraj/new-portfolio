import React from "react";
import { notFound } from "next/navigation";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import TemplateRenderer from "@/components/templates/TemplateRenderer";
import { Metadata } from "next";

interface PublicPortfolioProps {
  params: {
    username: string;
  };
}

// Generate dynamic metadata for SEO optimization
export async function generateMetadata({ params }: PublicPortfolioProps): Promise<Metadata> {
  const username = params.username.toLowerCase();
  
  try {
    await connectToDatabase();
    const user = await User.findOne({ username });
    
    if (!user || !user.settings?.isPublic) {
      return {
        title: "Portfolio Not Found | PortfolioForge",
      };
    }

    const name = user.profile.fullName || username;
    const title = user.profile.title || "Professional Portfolio";
    const bio = user.profile.bio || `Check out ${name}'s resume and creative projects.`;

    return {
      title: `${name} — ${title} | PortfolioForge`,
      description: bio,
      openGraph: {
        title: `${name} | ${title}`,
        description: bio,
        type: "profile",
        images: user.profile.avatarUrl ? [{ url: user.profile.avatarUrl }] : [],
      },
    };
  } catch (error) {
    return {
      title: "Portfolio | PortfolioForge",
    };
  }
}

export default async function PublicPortfolioPage({ params }: PublicPortfolioProps) {
  const username = params.username.toLowerCase();

  await connectToDatabase();
  const user = await User.findOne({ username });

  // If user doesn't exist or has set their portfolio to private, return 404
  if (!user || !user.settings?.isPublic) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <TemplateRenderer templateId={user.settings.template} data={user} />
    </div>
  );
}
