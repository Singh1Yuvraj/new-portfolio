import React from "react";
import { Mail, MapPin, FileText, ExternalLink, Github, Linkedin, Twitter, Globe, ArrowRight } from "lucide-react";

interface ThemeProps {
  data: any;
}

export default function MinimalTheme({ data }: ThemeProps) {
  const { profile = {}, skills = [], projects = [], experience = [], education = [], socials = {} } = data;

  return (
    <div className="min-h-screen bg-white text-stone-900 selection:bg-stone-100 font-sans antialiased py-20 px-6 max-w-3xl mx-auto space-y-16">
      {/* Bio / Intro */}
      <header className="space-y-6">
        {profile.avatarUrl && (
          <img
            src={profile.avatarUrl}
            alt={profile.fullName}
            className="w-16 h-16 rounded-full object-cover grayscale border border-stone-200"
          />
        )}
        <div className="space-y-2">
          <h1 className="text-4xl font-semibold tracking-tight text-stone-900">{profile.fullName || "Your Name"}</h1>
          <p className="text-stone-500 font-medium text-lg">{profile.title || "Your Professional Title"}</p>
        </div>
        
        <p className="text-stone-600 leading-relaxed text-base max-w-xl font-normal">
          {profile.bio || "Write your professional summary here."}
        </p>

        {/* Action Info */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-stone-500 pt-2 border-t border-stone-100">
          {profile.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{profile.location}</span>
            </div>
          )}
          {profile.email && (
            <a href={`mailto:${profile.email}`} className="flex items-center gap-1 hover:text-stone-850 transition-colors">
              <Mail className="w-3.5 h-3.5" />
              <span>{profile.email}</span>
            </a>
          )}
          {profile.resumeUrl && (
            <a href={profile.resumeUrl} target="_blank" className="flex items-center gap-1 hover:text-stone-850 transition-colors">
              <FileText className="w-3.5 h-3.5" />
              <span>CV / Resume</span>
            </a>
          )}
        </div>
      </header>

      {/* Projects */}
      {projects.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-xs uppercase tracking-widest font-bold text-stone-400">Featured Projects</h2>
          <div className="divide-y divide-stone-100">
            {projects.map((proj: any, idx: number) => (
              <div key={idx} className="py-6 first:pt-0 last:pb-0 group space-y-2">
                <div className="flex justify-between items-start gap-4">
                  <h3 className="font-semibold text-stone-900 group-hover:text-stone-650 transition-colors">
                    {proj.title}
                  </h3>
                  <div className="flex gap-3 text-stone-400">
                    {proj.githubUrl && (
                      <a href={proj.githubUrl} target="_blank" className="hover:text-stone-700 transition-colors">
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {proj.liveUrl && (
                      <a href={proj.liveUrl} target="_blank" className="hover:text-stone-700 transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-stone-500 text-sm leading-relaxed max-w-2xl">{proj.description}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {proj.techStack?.map((tech: string, tIdx: number) => (
                    <span key={tIdx} className="text-[11px] font-medium text-stone-400 bg-stone-50 px-2 py-0.5 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Work Experience */}
      {experience.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-xs uppercase tracking-widest font-bold text-stone-400">Work Experience</h2>
          <div className="space-y-6">
            {experience.map((item: any, idx: number) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                <div>
                  <h3 className="font-semibold text-stone-900">{item.role}</h3>
                  <p className="text-stone-500 text-sm">{item.company}</p>
                  <p className="text-stone-600 text-sm mt-1 max-w-xl leading-relaxed">{item.description}</p>
                </div>
                <span className="text-xs font-semibold text-stone-400 whitespace-nowrap pt-1">
                  {item.from} — {item.to}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-xs uppercase tracking-widest font-bold text-stone-400">Education</h2>
          <div className="space-y-4">
            {education.map((item: any, idx: number) => (
              <div key={idx} className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="font-semibold text-stone-900 text-sm sm:text-base">{item.degree}</h3>
                  <p className="text-stone-500 text-sm">{item.school}</p>
                </div>
                <span className="text-xs font-semibold text-stone-400 whitespace-nowrap">
                  {item.from} — {item.to}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xs uppercase tracking-widest font-bold text-stone-400">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill: string, idx: number) => (
              <span key={idx} className="text-xs font-medium text-stone-600 bg-stone-100/60 px-3 py-1 rounded">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Footer / Contact */}
      <footer className="pt-12 border-t border-stone-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-medium text-stone-400">
        <span>&copy; {profile.fullName || "User"}. All rights reserved.</span>
        
        {/* Social Links */}
        <div className="flex items-center gap-4">
          {socials.github && (
            <a href={socials.github} target="_blank" className="hover:text-stone-700 transition-colors">
              <Github className="w-4.5 h-4.5" />
            </a>
          )}
          {socials.linkedin && (
            <a href={socials.linkedin} target="_blank" className="hover:text-stone-700 transition-colors">
              <Linkedin className="w-4.5 h-4.5" />
            </a>
          )}
          {socials.twitter && (
            <a href={socials.twitter} target="_blank" className="hover:text-stone-700 transition-colors">
              <Twitter className="w-4.5 h-4.5" />
            </a>
          )}
          {socials.website && (
            <a href={socials.website} target="_blank" className="hover:text-stone-700 transition-colors">
              <Globe className="w-4.5 h-4.5" />
            </a>
          )}
        </div>
      </footer>
    </div>
  );
}
