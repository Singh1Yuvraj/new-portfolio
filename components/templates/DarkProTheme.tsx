import React from "react";
import { Mail, MapPin, FileText, ExternalLink, Github, Linkedin, Twitter, Globe, ArrowRight, Activity } from "lucide-react";

interface ThemeProps {
  data: any;
}

export default function DarkProTheme({ data }: ThemeProps) {
  const { profile = {}, skills = [], projects = [], experience = [], education = [], socials = {} } = data;

  return (
    <div className="min-h-screen bg-black text-zinc-350 font-sans selection:bg-cyan-500/20 py-24 px-4 overflow-hidden relative">
      {/* Laser gradients */}
      <div className="absolute top-[-10%] left-[-20%] w-[60%] h-[60%] rounded-full bg-cyan-500/5 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-20%] w-[60%] h-[60%] rounded-full bg-emerald-500/5 blur-[130px] pointer-events-none" />

      <div className="max-w-3xl mx-auto space-y-16 relative z-10">
        
        {/* Profile Card Header */}
        <header className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-zinc-950 border border-zinc-900 p-8 rounded-xl shadow-2xl">
          {profile.avatarUrl ? (
            <img
              src={profile.avatarUrl}
              alt={profile.fullName}
              className="w-20 h-20 rounded-lg object-cover border border-zinc-800 shadow-md"
            />
          ) : (
            <div className="w-20 h-20 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center font-bold text-3xl text-white uppercase">
              {profile.fullName ? profile.fullName[0] : "D"}
            </div>
          )}

          <div className="space-y-3 flex-1 text-center sm:text-left">
            <div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
                {profile.fullName || "Dark Engineer"}
              </h1>
              <p className="text-cyan-400 font-semibold text-sm sm:text-base mt-0.5">
                {profile.title || "Full Stack Developer"}
              </p>
            </div>
            
            <p className="text-zinc-400 leading-relaxed text-sm max-w-xl">
              {profile.bio || "Provide your professional summary detailing your core technical skills."}
            </p>

            <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-xs text-zinc-500 font-semibold pt-1">
              {profile.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-zinc-650" />
                  <span>{profile.location}</span>
                </div>
              )}
              {profile.email && (
                <a href={`mailto:${profile.email}`} className="flex items-center gap-1 hover:text-white transition-colors">
                  <Mail className="w-3.5 h-3.5 text-zinc-650" />
                  <span>{profile.email}</span>
                </a>
              )}
              {profile.resumeUrl && (
                <a href={profile.resumeUrl} target="_blank" className="flex items-center gap-1 hover:text-white transition-colors">
                  <FileText className="w-3.5 h-3.5 text-zinc-650" />
                  <span>Curriculum Vitae</span>
                </a>
              )}
            </div>
          </div>
        </header>

        {/* Selected Works (Projects) */}
        {projects.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xs uppercase tracking-widest font-black text-cyan-400 flex items-center gap-2">
              <Activity className="w-4.5 h-4.5" />
              Selected Node Projects
            </h2>
            <div className="space-y-4">
              {projects.map((proj: any, idx: number) => (
                <div
                  key={idx}
                  className="p-6 rounded-lg bg-zinc-950/80 border border-zinc-900 hover:border-zinc-800 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="space-y-2 flex-1">
                    <h3 className="font-extrabold text-white text-base sm:text-lg group-hover:text-cyan-400">
                      {proj.title}
                    </h3>
                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-xl">
                      {proj.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {proj.techStack?.map((tech: string, tIdx: number) => (
                        <span
                          key={tIdx}
                          className="text-[9px] font-bold text-emerald-400 bg-emerald-950/20 border border-emerald-900/30 px-2 py-0.5 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4 text-xs font-semibold text-zinc-400 shrink-0 md:border-l md:border-zinc-900 md:pl-6">
                    {proj.liveUrl && (
                      <a href={proj.liveUrl} target="_blank" className="flex items-center gap-1 hover:text-white transition-colors">
                        <ExternalLink className="w-3.5 h-3.5" />
                        Live
                      </a>
                    )}
                    {proj.githubUrl && (
                      <a href={proj.githubUrl} target="_blank" className="flex items-center gap-1 hover:text-white transition-colors">
                        <Github className="w-3.5 h-3.5" />
                        Code
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience & Education */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Experience */}
          {experience.length > 0 && (
            <section className="space-y-6">
              <h2 className="text-xs uppercase tracking-widest font-black text-cyan-400">Experience History</h2>
              <div className="space-y-6">
                {experience.map((item: any, idx: number) => (
                  <div key={idx} className="space-y-1 relative pl-4 border-l border-zinc-900">
                    <h3 className="font-bold text-white text-sm sm:text-base">{item.role}</h3>
                    <p className="text-zinc-400 text-xs font-semibold">{item.company}</p>
                    <p className="text-zinc-500 text-[10px]">{item.from} - {item.to}</p>
                    <p className="text-zinc-400 text-xs leading-relaxed pt-1">{item.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section className="space-y-6">
              <h2 className="text-xs uppercase tracking-widest font-black text-cyan-400">Education Details</h2>
              <div className="space-y-6">
                {education.map((item: any, idx: number) => (
                  <div key={idx} className="space-y-1 relative pl-4 border-l border-zinc-900">
                    <h3 className="font-bold text-white text-sm">{item.degree}</h3>
                    <p className="text-zinc-400 text-xs font-semibold">{item.school}</p>
                    <p className="text-zinc-500 text-[10px]">{item.from} - {item.to}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Skills Tag Cloud */}
        {skills.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xs uppercase tracking-widest font-black text-cyan-400">Core Capabilities</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill: string, idx: number) => (
                <span
                  key={idx}
                  className="text-xs font-bold text-zinc-300 bg-zinc-950 border border-zinc-900 px-3 py-1.5 rounded-lg"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-zinc-650">
          <span>&copy; {profile.fullName || "User"}. Generated via PortfolioForge.</span>
          <div className="flex items-center gap-4">
            {socials.github && <a href={socials.github} target="_blank" className="hover:text-white"><Github className="w-4.5 h-4.5" /></a>}
            {socials.linkedin && <a href={socials.linkedin} target="_blank" className="hover:text-white"><Linkedin className="w-4.5 h-4.5" /></a>}
            {socials.twitter && <a href={socials.twitter} target="_blank" className="hover:text-white"><Twitter className="w-4.5 h-4.5" /></a>}
            {socials.website && <a href={socials.website} target="_blank" className="hover:text-white"><Globe className="w-4.5 h-4.5" /></a>}
          </div>
        </footer>
      </div>
    </div>
  );
}
