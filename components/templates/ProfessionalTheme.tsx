import React from "react";
import { Mail, MapPin, FileText, ExternalLink, Github, Linkedin, Twitter, Globe, Briefcase } from "lucide-react";

interface ThemeProps {
  data: any;
}

export default function ProfessionalTheme({ data }: ThemeProps) {
  const { profile = {}, skills = [], projects = [], experience = [], education = [], socials = {} } = data;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-slate-200 py-24 px-6">
      <div className="max-w-4xl mx-auto space-y-16 bg-white border border-slate-200/80 shadow-xl rounded-2xl p-8 sm:p-12">
        
        {/* Header Block / Business Card Header */}
        <header className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 pb-8 border-b border-slate-200">
          <div className="space-y-3 flex-1 text-center sm:text-left">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{profile.fullName || "Your Name"}</h1>
            <p className="text-slate-500 font-semibold text-base">{profile.title || "Professional Role"}</p>
            <p className="text-slate-600 text-sm max-w-xl leading-relaxed pt-1">
              {profile.bio || "Provide your professional summary detailing your core value proposition."}
            </p>
          </div>
          
          <div className="flex flex-col items-center sm:items-end gap-2 text-xs font-semibold text-slate-500 flex-shrink-0">
            {profile.location && (
              <div className="flex items-center gap-1.5 justify-end">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>{profile.location}</span>
              </div>
            )}
            {profile.email && (
              <a href={`mailto:${profile.email}`} className="flex items-center gap-1.5 hover:text-slate-900 transition-colors">
                <Mail className="w-4 h-4 text-slate-400" />
                <span>{profile.email}</span>
              </a>
            )}
            {profile.resumeUrl && (
              <a href={profile.resumeUrl} target="_blank" className="flex items-center gap-1.5 hover:text-slate-900 transition-colors text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded border border-slate-250 mt-1">
                <FileText className="w-4 h-4 text-slate-500" />
                <span>View CV / Resume</span>
              </a>
            )}
          </div>
        </header>

        {/* Timeline Layout (Double Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Left Side: Skills & Socials */}
          <div className="space-y-10 md:col-span-1 border-r border-slate-100 pr-6">
            {/* Skills */}
            {skills.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Core Expertise</h2>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((skill: string, idx: number) => (
                    <span
                      key={idx}
                      className="text-[11px] font-semibold text-slate-700 bg-slate-100/80 px-2.5 py-1 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Links */}
            <div className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Contact & Networks</h2>
              <div className="flex flex-col gap-2 text-xs font-semibold text-slate-600">
                {socials.github && (
                  <a href={socials.github} target="_blank" className="flex items-center gap-2 hover:text-slate-900 transition-colors">
                    <Github className="w-4 h-4 text-slate-400" />
                    <span>GitHub</span>
                  </a>
                )}
                {socials.linkedin && (
                  <a href={socials.linkedin} target="_blank" className="flex items-center gap-2 hover:text-slate-900 transition-colors">
                    <Linkedin className="w-4 h-4 text-slate-400" />
                    <span>LinkedIn</span>
                  </a>
                )}
                {socials.twitter && (
                  <a href={socials.twitter} target="_blank" className="flex items-center gap-2 hover:text-slate-900 transition-colors">
                    <Twitter className="w-4 h-4 text-slate-400" />
                    <span>Twitter</span>
                  </a>
                )}
                {socials.website && (
                  <a href={socials.website} target="_blank" className="flex items-center gap-2 hover:text-slate-900 transition-colors">
                    <Globe className="w-4 h-4 text-slate-400" />
                    <span>Personal Website</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Side: Experience, Education, Projects */}
          <div className="md:col-span-2 space-y-12">
            {/* Work History */}
            {experience.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-2">
                  Professional Experience
                </h2>
                <div className="space-y-6">
                  {experience.map((item: any, idx: number) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-slate-900 text-sm sm:text-base">{item.role}</h3>
                        <span className="text-xs font-semibold text-slate-400">{item.from} - {item.to}</span>
                      </div>
                      <p className="text-slate-500 font-semibold text-xs">{item.company}</p>
                      <p className="text-slate-600 text-xs leading-relaxed pt-1">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {education.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-2">
                  Academic Credentials
                </h2>
                <div className="space-y-4">
                  {education.map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm">{item.degree}</h3>
                        <p className="text-slate-500 text-xs font-semibold">{item.school}</p>
                      </div>
                      <span className="text-xs font-semibold text-slate-400">{item.from} - {item.to}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Selected Projects (Full Width bottom segment) */}
        {projects.length > 0 && (
          <section className="space-y-6 pt-8 border-t border-slate-200/80">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Selected Case Studies</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {projects.map((proj: any, idx: number) => (
                <div key={idx} className="p-5 border border-slate-200 hover:border-slate-350 hover:shadow-md transition-all rounded-xl space-y-3 bg-slate-50/50">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-bold text-slate-900 text-base">{proj.title}</h3>
                    <div className="flex items-center gap-2 text-slate-400">
                      {proj.githubUrl && (
                        <a href={proj.githubUrl} target="_blank" className="hover:text-slate-700 transition-all">
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {proj.liveUrl && (
                        <a href={proj.liveUrl} target="_blank" className="hover:text-slate-700 transition-all">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed">{proj.description}</p>
                  <div className="flex flex-wrap gap-1 pt-1 text-[10px] text-slate-500 font-semibold">
                    {proj.techStack?.map((tech: string, tIdx: number) => (
                      <span key={tIdx} className="bg-slate-200/50 px-2 py-0.5 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="pt-8 border-t border-slate-200 text-center text-xs font-medium text-slate-400">
          &copy; {profile.fullName || "User"}. Corporate Profile. Generated by PortfolioForge.
        </footer>
      </div>
    </div>
  );
}
