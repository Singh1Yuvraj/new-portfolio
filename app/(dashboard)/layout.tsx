import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Sparkles, Edit, LayoutTemplate, Eye, ExternalLink, LogOut, CheckCircle } from "lucide-react";
import Navbar from "@/components/shared/Navbar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  // If authenticated but has not completed username selection, redirect to onboarding
  if (!(session.user as any).username) {
    redirect("/onboarding");
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      {/* Main dashboard body */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        {/* Sticky sidebar */}
        <aside className="lg:w-64 flex-shrink-0">
          <div className="sticky top-24 space-y-6">
            {/* User Profile Card Summary */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center font-bold text-white uppercase shadow-md shadow-violet-900/30">
                  {session.user.name ? session.user.name[0] : "U"}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white truncate max-w-[150px]">
                    {session.user.name || "User"}
                  </h3>
                  <p className="text-xs text-slate-400 truncate max-w-[150px]">
                    {session.user.email}
                  </p>
                </div>
              </div>

              {/* Public Portfolio URL Info */}
              <div className="pt-2 border-t border-slate-800 space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                  Your Public URL
                </span>
                <Link
                  href={`/u/${(session.user as any).username}`}
                  target="_blank"
                  className="flex items-center justify-between text-xs text-violet-400 hover:text-violet-300 font-mono bg-slate-950 p-2 rounded border border-slate-800 hover:border-slate-700 transition-colors"
                >
                  <span className="truncate">u/{(session.user as any).username}</span>
                  <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                </Link>
              </div>
            </div>

            {/* Sidebar Navigation */}
            <nav className="flex flex-col gap-1">
              <Link
                href="/dashboard"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-all text-slate-300 hover:text-white"
              >
                <Edit className="w-4 h-4 text-violet-400" />
                Edit Portfolio
              </Link>
              <Link
                href="/dashboard/templates"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-all text-slate-300 hover:text-white"
              >
                <LayoutTemplate className="w-4 h-4 text-indigo-400" />
                Templates Gallery
              </Link>
              <Link
                href="/dashboard/preview"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-all text-slate-300 hover:text-white"
              >
                <Eye className="w-4 h-4 text-emerald-400" />
                Live Preview
              </Link>
            </nav>
          </div>
        </aside>

        {/* Dashboard Content Area */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
