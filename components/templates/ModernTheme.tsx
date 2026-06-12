import React from "react";
import { Mail, MapPin, FileText, ExternalLink, Github, Linkedin, Twitter, Globe, ArrowRight, Sparkles } from "lucide-react";

interface ThemeProps {
  data: any;
}

export default function ModernTheme({ data }: ThemeProps) {
  const { profile = {}, skills = [], projects = [], experience = [], education = [], socials = {} } = data;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-violet-900/30 py-24 px-4 overflow-hidden relative">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-16 relative z-10">
        {/* Header Profile Section */}
        <header className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left bg-slate-900/30 border border-slate-800/80 p-8 rounded-2xl backdrop-blur-md">
          {profile.avatarUrl ? (
            <img
              src={profile.avatarUrl}
              alt={profile.fullName}
              className="w-28 h-28 rounded-2xl object-cover border-2 border-violet-500/30 shadow-lg shadow-violet-950/20"
            />
          ) : (
            <div className="w-28 h-28 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center font-bold text-4xl text-white uppercase shadow-md shadow-violet-950/30">
              {profile.fullName ? profile.fullName[0] : "P"}
            </div>
          )}

          <div className="space-y-4 flex-1">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                {profile.fullName || "Your Name"}
              </h1>
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400 font-semibold text-lg mt-1">
                {profile.title || "Your Professional Title"}
              </p>
            </div>
            
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base max-w-xl">
              {profile.bio || "Write your professional summary here."}
            </p>

            {/* Icons Info */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-semibold text-slate-400 pt-2">
              {profile.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-violet-400" />
                  <span>{profile.location}</span>
                </div>
              )}
              {profile.email && (
                <a href={`mailto:${profile.email}`} className="flex items-center gap-1 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 text-violet-400" />
                  <span>{profile.email}</span>
                </a>
              )}
              {profile.resumeUrl && (
                <a href={profile.resumeUrl} target="_blank" className="flex items-center gap-1 hover:text-white transition-colors">
                  <FileText className="w-4 h-4 text-violet-400" />
                  <span>View Resume</span>
                </a>
              )}
            </div>
          </div>
        </header>

        {/* Featured Projects Grid */}
        {projects.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4.5 h-4.5 text-violet-400" />
              <h2 className="text-lg uppercase tracking-wider font-bold text-slate-300">Featured Projects</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj: any, idx: number) => (
                <div
                  key={idx}
                  className="group rounded-xl bg-slate-900/40 border border-slate-800/80 overflow-hidden flex flex-col justify-between hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-950/20 transition-all duration-300"
                >
                  {proj.imageUrl && (
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={proj.imageUrl}
                        alt={proj.title}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-550"
                      />
                    </div>
                  )}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-bold text-white text-lg group-hover:text-violet-400 transition-colors">
                        {proj.title}
                      </h3>
                      <p className="text-slate-400 text-xs sm:text-sm leading-relaxed line-clamp-3">
                        {proj.description}
                      </p>
                    </div>

                    <div className="space-y-3 pt-2">
                      <div className="flex flex-wrap gap-1.5">
                        {proj.techStack?.map((tech: string, tIdx: number) => (
                          <span
                            key={tIdx}
                            className="text-[10px] font-semibold text-violet-300 bg-violet-950/20 border border-violet-900/40 px-2 py-0.5 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-3 pt-2 border-t border-slate-800/60 text-xs font-semibold text-slate-400">
                        {proj.liveUrl && (
                          <a
                            href={proj.liveUrl}
                            target="_blank"
                            className="flex items-center gap-1 hover:text-white transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            Live Demo
                          </a>
                        )}
                        {proj.githubUrl && (
                          <a
                            href={proj.githubUrl}
                            target="_blank"
                            className="flex items-center gap-1 hover:text-white transition-colors"
                          >
                            <Github className="w-3.5 h-3.5" />
                            GitHub
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience & Education Double Column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Experience */}
          {experience.length > 0 && (
            <section className="space-y-6">
              <h2 className="text-lg uppercase tracking-wider font-bold text-slate-300">Experience</h2>
              <div className="space-y-6 border-l-2 border-slate-800 pl-4 ml-2">
                {experience.map((item: any, idx: number) => (
                  <div key={idx} className="relative space-y-1">
                    {/* Circle Node */}
                    <span className="absolute left-[-23px] top-1.5 w-3.5 h-3.5 rounded-full bg-violet-600 border border-slate-950 shadow-md shadow-violet-950" />
                    <h3 className="font-bold text-white">{item.role}</h3>
                    <p className="text-violet-400 text-xs font-semibold">{item.company}</p>
                    <p className="text-slate-500 text-[11px] font-medium">{item.from} — {item.to}</p>
                    <p className="text-slate-400 text-xs leading-relaxed pt-1">{item.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section className="space-y-6">
              <h2 className="text-lg uppercase tracking-wider font-bold text-slate-300">Education</h2>
              <div className="space-y-6 border-l-2 border-slate-800 pl-4 ml-2">
                {education.map((item: any, idx: number) => (
                  <div key={idx} className="relative space-y-1">
                    {/* Circle Node */}
                    <span className="absolute left-[-23px] top-1.5 w-3.5 h-3.5 rounded-full bg-indigo-600 border border-slate-950 shadow-md shadow-indigo-950" />
                    <h3 className="font-bold text-white">{item.degree}</h3>
                    <p className="text-indigo-400 text-xs font-semibold">{item.school}</p>
                    <p className="text-slate-500 text-[11px] font-medium">{item.from} — {item.to}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Skills Tag Area */}
        {skills.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-lg uppercase tracking-wider font-bold text-slate-300">Technical Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill: string, idx: number) => (
                <span
                  key={idx}
                  className="text-xs font-semibold text-slate-300 bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-lg shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="pt-12 border-t border-slate-900/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500">
          <span>&copy; {profile.fullName || "User"}. Built with PortfolioForge.</span>
          
          <div className="flex items-center gap-4">
            {socials.github && (
              <a href={socials.github} target="_blank" className="hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
            )}
            {socials.linkedin && (
              <a href={socials.linkedin} target="_blank" className="hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            )}
            {socials.twitter && (
              <a href={socials.twitter} target="_blank" className="hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            )}
            {socials.website && (
              <a href={socials.website} target="_blank" className="hover:text-white transition-colors">
                <Globe className="w-5 h-5" />
              </a>
            )}
          </div>
        </footer>
      </div>
    </div>
  );
}
