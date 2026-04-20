'use client';

import { DashboardShell } from '@/components/dashboard/dashboard-shell';
import { TrendingUp, Globe, Layers, Bell } from 'lucide-react';

const features = [
  { icon: Globe, label: 'Global Trend Map', desc: 'Real-time trending signals across 30+ countries and regions' },
  { icon: Layers, label: 'Niche Filtering', desc: 'Filter by your specific niche for hyper-relevant opportunities' },
  { icon: Bell, label: 'Trend Alerts', desc: 'Get notified the moment a trend enters your space' },
  { icon: TrendingUp, label: 'Momentum Tracking', desc: 'Follow trends from emergence to peak — never post too late' },
];

export default function TrendRadarPage() {
  return (
    <DashboardShell>
      <div className="px-4 md:px-6 py-6 md:py-8 flex flex-col items-center justify-center min-h-[70vh] text-center max-w-2xl mx-auto">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
          style={{ background: 'rgba(176,38,255,0.08)', boxShadow: '0 0 40px rgba(176,38,255,0.1)' }}
        >
          <TrendingUp className="w-8 h-8 text-violet-400" />
        </div>

        <div className="flex items-center gap-2 mb-3">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-xs font-mono text-amber-400 tracking-widest">IN DEVELOPMENT</span>
        </div>

        <h1 className="text-3xl font-bold text-white mb-3">Trend Radar</h1>
        <p className="text-sm text-gray-400 leading-relaxed mb-10 max-w-md">
          A global intelligence map of emerging trends. Spot opportunities before they peak — in your niche, on your platforms, in your region.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full text-left">
          {features.map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              className="p-4 rounded-xl border border-white/[0.06] flex gap-3"
              style={{ background: 'rgba(255,255,255,0.015)' }}
            >
              <Icon className="w-4 h-4 text-violet-400 flex-shrink-0 mt-0.5" />
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
