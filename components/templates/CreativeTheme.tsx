import React from "react";
import { Mail, MapPin, FileText, ExternalLink, Github, Linkedin, Twitter, Globe, Star, Sparkles } from "lucide-react";

interface ThemeProps {
  data: any;
}

export default function CreativeTheme({ data }: ThemeProps) {
  const { profile = {}, skills = [], projects = [], experience = [], education = [], socials = {} } = data;

  return (
    <div className="min-h-screen bg-yellow-50 text-slate-900 font-sans py-20 px-4 antialiased selection:bg-rose-200">
      <div className="max-w-3xl mx-auto space-y-12">
        
        {/* Header Block / Neo-Brutalist Hero Card */}
        <header className="p-8 rounded-xl border-4 border-black bg-violet-200 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-6 relative overflow-hidden">
          <div className="absolute top-2 right-2 rotate-12 text-black/10">
            <Star className="w-32 h-32 fill-current" />
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10 text-center sm:text-left">
            {profile.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt={profile.fullName}
                className="w-24 h-24 rounded-full border-4 border-black object-cover bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              />
            ) : (
              <div className="w-24 h-24 rounded-full border-4 border-black bg-rose-450 flex items-center justify-center font-black text-4xl text-white uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                {profile.fullName ? profile.fullName[0] : "C"}
              </div>
            )}
            
            <div className="space-y-3">
              <div>
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-black uppercase">
                  {profile.fullName || "Creative Maker"}
                </h1>
                <p className="inline-block mt-1 px-3 py-1 font-bold text-xs bg-black text-white border-2 border-black rounded-md rotate-[-1deg]">
                  {profile.title || "Designer & Developer"}
                </p>
              </div>
              <p className="text-slate-800 font-medium leading-relaxed max-w-lg">
                {profile.bio || "Hi, I'm a builder. I make clean and interactive digital products."}
              </p>
            </div>
          </div>

          {/* Social icons header row */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-bold pt-4 border-t-2 border-black text-black">
            {profile.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{profile.location}</span>
              </div>
            )}
            {profile.email && (
              <a href={`mailto:${profile.email}`} className="flex items-center gap-1 underline decoration-2 hover:bg-black hover:text-white p-1 rounded transition-all">
                <Mail className="w-4 h-4" />
                <span>{profile.email}</span>
              </a>
            )}
            {profile.resumeUrl && (
              <a href={profile.resumeUrl} target="_blank" className="flex items-center gap-1 underline decoration-2 hover:bg-black hover:text-white p-1 rounded transition-all">
                <FileText className="w-4 h-4" />
                <span>Read CV</span>
              </a>
            )}
          </div>
        </header>

        {/* Skills Block */}
        {skills.length > 0 && (
          <section className="p-6 rounded-xl border-4 border-black bg-emerald-200 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-4">
            <h2 className="text-xl font-black uppercase text-black flex items-center gap-2">
              <Sparkles className="w-5 h-5 fill-current" />
              What I Can Do
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill: string, idx: number) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-xs font-black bg-white border-2 border-black rounded-md shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Projects Block */}
        {projects.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-2xl font-black uppercase tracking-tight text-black">Cool Creations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj: any, idx: number) => (
                <div
                  key={idx}
                  className="rounded-xl border-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col justify-between"
                >
                  {proj.imageUrl && (
                    <div className="border-b-4 border-black h-40 relative">
                      <img src={proj.imageUrl} alt={proj.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-extrabold text-lg uppercase text-black">{proj.title}</h3>
                      <p className="text-slate-700 text-xs sm:text-sm font-medium leading-relaxed">
                        {proj.description}
                      </p>
                    </div>

                    <div className="space-y-3 pt-2">
                      <div className="flex flex-wrap gap-1.5">
                        {proj.techStack?.map((tech: string, tIdx: number) => (
                          <span
                            key={tIdx}
                            className="text-[9px] font-black uppercase bg-yellow-100 border border-black px-2 py-0.5 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-3 pt-3 border-t-2 border-black/10 text-xs font-bold text-black">
                        {proj.liveUrl && (
                          <a href={proj.liveUrl} target="_blank" className="flex items-center gap-1 underline hover:text-violet-600">
                            <ExternalLink className="w-3.5 h-3.5" />
                            Live Demo
                          </a>
                        )}
                        {proj.githubUrl && (
                          <a href={proj.githubUrl} target="_blank" className="flex items-center gap-1 underline hover:text-violet-600">
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

        {/* History Double Column (Experience & Education) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Work History */}
          {experience.length > 0 && (
            <section className="p-6 rounded-xl border-4 border-black bg-rose-200 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-4">
              <h2 className="text-xl font-black uppercase text-black">Journey so far</h2>
              <div className="space-y-4 divide-y divide-black/10">
                {experience.map((item: any, idx: number) => (
                  <div key={idx} className="pt-3 first:pt-0 space-y-1">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-extrabold text-black text-sm sm:text-base leading-tight">
                        {item.role}
                      </h3>
                      <span className="text-[10px] font-bold bg-black text-white px-2 py-0.5 rounded">
                        {item.from}-{item.to}
                      </span>
                    </div>
                    <p className="text-slate-800 text-xs font-bold">{item.company}</p>
                    <p className="text-slate-700 text-xs font-medium leading-relaxed pt-1">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section className="p-6 rounded-xl border-4 border-black bg-cyan-200 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-4">
              <h2 className="text-xl font-black uppercase text-black">Knowledge</h2>
              <div className="space-y-4 divide-y divide-black/10">
                {education.map((item: any, idx: number) => (
                  <div key={idx} className="pt-3 first:pt-0 space-y-1">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-extrabold text-black text-sm sm:text-base leading-tight">
                        {item.degree}
                      </h3>
                      <span className="text-[10px] font-bold bg-black text-white px-2 py-0.5 rounded">
                        {item.from}-{item.to}
                      </span>
                    </div>
                    <p className="text-slate-800 text-xs font-bold">{item.school}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Footer */}
        <footer className="p-6 rounded-xl border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-black uppercase text-black">
          <span>&copy; {profile.fullName || "User"}. PortfolioForge.</span>
          <div className="flex items-center gap-4">
            {socials.github && <a href={socials.github} target="_blank" className="hover:text-violet-600"><Github className="w-5 h-5" /></a>}
            {socials.linkedin && <a href={socials.linkedin} target="_blank" className="hover:text-violet-600"><Linkedin className="w-5 h-5" /></a>}
            {socials.twitter && <a href={socials.twitter} target="_blank" className="hover:text-violet-600"><Twitter className="w-5 h-5" /></a>}
            {socials.website && <a href={socials.website} target="_blank" className="hover:text-violet-600"><Globe className="w-5 h-5" /></a>}
          </div>
        </footer>
      </div>
    </div>
  );
}
