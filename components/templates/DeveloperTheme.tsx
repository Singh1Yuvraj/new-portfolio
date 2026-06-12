import React from "react";
import { Mail, MapPin, FileText, ExternalLink, Github, Linkedin, Twitter, Globe, Terminal, Code } from "lucide-react";

interface ThemeProps {
  data: any;
}

export default function DeveloperTheme({ data }: ThemeProps) {
  const { profile = {}, skills = [], projects = [], experience = [], education = [], socials = {} } = data;

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono py-16 px-4 selection:bg-green-950 selection:text-green-300">
      <div className="max-w-3xl mx-auto space-y-10">
        
        {/* Terminal Window Header Shell */}
        <div className="rounded-lg border border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden">
          <div className="bg-zinc-900 border-b border-zinc-850 px-4 py-3 flex items-center justify-between">
            <div className="flex gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3.5 h-3.5 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <span className="text-xs text-zinc-500 font-sans font-medium">bash - {(profile.fullName || "user").toLowerCase()}@forge</span>
            <div className="w-12" /> {/* Spacer */}
          </div>
          
          <div className="p-6 space-y-8 text-sm sm:text-base">
            {/* Command: Whoami */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-zinc-500">
                <span>$</span>
                <span>whoami</span>
              </div>
              <div className="pl-4 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                {profile.avatarUrl && (
                  <img
                    src={profile.avatarUrl}
                    alt={profile.fullName}
                    className="w-16 h-16 rounded border border-green-500/40 object-cover"
                  />
                )}
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight">{profile.fullName || "Developer Name"}</h1>
                  <p className="text-zinc-400 text-sm">{profile.title || "Full Stack Engineer"}</p>
                  <p className="text-zinc-500 text-xs mt-1">IP: 127.0.0.1 | LOC: {profile.location || "Localhost"}</p>
                </div>
              </div>
            </div>

            {/* Command: Cat bio.txt */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-zinc-500">
                <span>$</span>
                <span>cat bio.txt</span>
              </div>
              <p className="pl-4 text-green-300/95 leading-relaxed text-sm max-w-2xl">
                {profile.bio || "No biography text provided."}
              </p>
            </div>

            {/* Command: ls skills/ */}
            {skills.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-zinc-500">
                  <span>$</span>
                  <span>ls skills/</span>
                </div>
                <div className="pl-4 flex flex-wrap gap-x-6 gap-y-2 text-white font-bold text-sm">
                  {skills.map((skill: string, idx: number) => (
                    <span key={idx} className="hover:text-green-400 cursor-pointer">
                      {skill}*
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Command: ./view-projects.sh */}
            {projects.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-zinc-500">
                  <span>$</span>
                  <span>./view-projects.sh</span>
                </div>
                <div className="pl-4 space-y-6">
                  {projects.map((proj: any, idx: number) => (
                    <div key={idx} className="border-l border-green-900/60 pl-4 space-y-1.5 py-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="font-bold text-white text-base flex items-center gap-1.5">
                          <Code className="w-4 h-4 text-green-500" />
                          {proj.title}
                        </h3>
                        <div className="flex gap-3 text-zinc-500 text-xs">
                          {proj.githubUrl && (
                            <a href={proj.githubUrl} target="_blank" className="hover:text-green-400 flex items-center gap-0.5">
                              [code]
                            </a>
                          )}
                          {proj.liveUrl && (
                            <a href={proj.liveUrl} target="_blank" className="hover:text-green-400 flex items-center gap-0.5">
                              [live]
                            </a>
                          )}
                        </div>
                      </div>
                      <p className="text-zinc-400 text-xs leading-relaxed max-w-xl">{proj.description}</p>
                      <div className="flex flex-wrap gap-1.5 text-[10px] text-green-500/80 font-bold">
                        <span>tech:</span>
                        {proj.techStack?.map((tech: string, tIdx: number) => (
                          <span key={tIdx}>[{tech}]</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Command: cat experience.json */}
            {experience.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-zinc-500">
                  <span>$</span>
                  <span>cat experience.json</span>
                </div>
                <div className="pl-4 space-y-4">
                  {experience.map((item: any, idx: number) => (
                    <div key={idx} className="space-y-1 text-sm">
                      <div className="flex justify-between text-white font-bold">
                        <span>{item.role} @ {item.company}</span>
                        <span className="text-zinc-500 text-xs">{item.from} - {item.to}</span>
                      </div>
                      <p className="text-zinc-400 text-xs pl-2">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Command: cat education.json */}
            {education.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-zinc-500">
                  <span>$</span>
                  <span>cat education.json</span>
                </div>
                <div className="pl-4 space-y-3">
                  {education.map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-white">{item.degree} — {item.school}</span>
                      <span className="text-zinc-500 text-xs">{item.from} - {item.to}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Details */}
            <div className="space-y-2 pt-4 border-t border-zinc-900">
              <div className="flex items-center gap-2 text-zinc-500">
                <span>$</span>
                <span>ping socials</span>
              </div>
              <div className="pl-4 flex flex-wrap gap-x-6 gap-y-2 text-xs font-bold text-zinc-400">
                {profile.email && (
                  <a href={`mailto:${profile.email}`} className="hover:text-green-400">
                    email: {profile.email}
                  </a>
                )}
                {socials.github && (
                  <a href={socials.github} target="_blank" className="hover:text-green-400">
                    github: {socials.github.replace("https://github.com/", "")}
                  </a>
                )}
                {socials.linkedin && (
                  <a href={socials.linkedin} target="_blank" className="hover:text-green-400">
                    linkedin: {socials.linkedin.replace("https://linkedin.com/in/", "")}
                  </a>
                )}
                {socials.twitter && (
                  <a href={socials.twitter} target="_blank" className="hover:text-green-400">
                    twitter: {socials.twitter.replace("https://x.com/", "")}
                  </a>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-zinc-600 animate-pulse pt-4">
              <span>$</span>
              <span className="w-2.5 h-4 bg-green-400 inline-block" />
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-zinc-600">
          Powered by PortfolioForge terminal engine. &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
