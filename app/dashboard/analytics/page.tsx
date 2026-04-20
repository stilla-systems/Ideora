'use client';

import { DashboardShell } from '@/components/dashboard/dashboard-shell';
import { LineChart, PieChart, ArrowUpRight, Calendar } from 'lucide-react';

const features = [
  { icon: LineChart, label: 'Growth Analytics', desc: 'Track follower growth, reach, and engagement across all platforms' },
  { icon: PieChart, label: 'Content Performance', desc: 'See which content types, formats, and topics drive your results' },
  { icon: ArrowUpRight, label: 'Trend Attribution', desc: 'Understand which trends translated into measurable growth' },
  { icon: Calendar, label: 'Historical Data', desc: 'Compare performance across weeks, months, and content eras' },
];

export default function AnalyticsPage() {
  return (
    <DashboardShell>
      <div className="px-4 md:px-6 py-6 md:py-8 flex flex-col items-center justify-center min-h-[70vh] text-center max-w-2xl mx-auto">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
          style={{ background: 'rgba(16,185,129,0.08)', boxShadow: '0 0 40px rgba(16,185,129,0.1)' }}
        >
          <LineChart className="w-8 h-8 text-emerald-400" />
        </div>

        <div className="flex items-center gap-2 mb-3">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-xs font-mono text-amber-400 tracking-widest">IN DEVELOPMENT</span>
        </div>

        <h1 className="text-3xl font-bold text-white mb-3">Analytics</h1>
        <p className="text-sm text-gray-400 leading-relaxed mb-10 max-w-md">
          Decision-grade analytics that connect your content choices to real growth outcomes. Not just metrics — insights that drive your next move.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full text-left">
          {features.map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              className="p-4 rounded-xl border border-white/[0.06] flex gap-3"
              style={{ background: 'rgba(255,255,255,0.015)' }}
            >
              <Icon className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
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
