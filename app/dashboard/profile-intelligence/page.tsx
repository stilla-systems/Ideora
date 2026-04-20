'use client';

import { DashboardShell } from '@/components/dashboard/dashboard-shell';
import { User, Users, Layers, Star } from 'lucide-react';

const features = [
  { icon: Users, label: 'Audience Profile', desc: 'Deep breakdown of who follows you, what they care about, and when they engage' },
  { icon: Star, label: 'Content DNA', desc: 'Understand the specific elements that make your top content win' },
  { icon: Layers, label: 'Persona Mapping', desc: 'Map your audience into segments and create content that speaks to each' },
  { icon: User, label: 'Creator Score', desc: 'A composite intelligence score measuring your positioning in your niche' },
];

export default function ProfileIntelligencePage() {
  return (
    <DashboardShell>
      <div className="px-4 md:px-6 py-6 md:py-8 flex flex-col items-center justify-center min-h-[70vh] text-center max-w-2xl mx-auto">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
          style={{ background: 'rgba(0,128,255,0.08)', boxShadow: '0 0 40px rgba(0,128,255,0.1)' }}
        >
          <User className="w-8 h-8 text-blue-400" />
        </div>

        <div className="flex items-center gap-2 mb-3">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-xs font-mono text-amber-400 tracking-widest">IN DEVELOPMENT</span>
        </div>

        <h1 className="text-3xl font-bold text-white mb-3">Profile Intelligence</h1>
        <p className="text-sm text-gray-400 leading-relaxed mb-10 max-w-md">
          A complete intelligence profile of your creator brand. Understand your audience at a depth that most creators never access — and use it to win.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full text-left">
          {features.map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              className="p-4 rounded-xl border border-white/[0.06] flex gap-3"
              style={{ background: 'rgba(255,255,255,0.015)' }}
            >
              <Icon className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-white mb-0.5">{label}</p>
                <p className="text-xs text-gray-500 leading-snug">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
