'use client';

import { Sidebar } from '@/components/dashboard/sidebar';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, MapPin, Clock, Smartphone } from 'lucide-react';

const AGE_BRACKETS = [
  { label: '13–17', percent: 8, color: 'bg-violet-400' },
  { label: '18–24', percent: 34, color: 'bg-cyan-400' },
  { label: '25–34', percent: 38, color: 'bg-pink-400' },
  { label: '35–44', percent: 14, color: 'bg-yellow-400' },
  { label: '45+', percent: 6, color: 'bg-green-400' },
];

const TOP_LOCATIONS = [
  { city: 'United States', flag: '🇺🇸', percent: 42 },
  { city: 'United Kingdom', flag: '🇬🇧', percent: 18 },
  { city: 'Canada', flag: '🇨🇦', percent: 12 },
  { city: 'Australia', flag: '🇦🇺', percent: 9 },
  { city: 'India', flag: '🇮🇳', percent: 7 },
  { city: 'Other', flag: '🌍', percent: 12 },
];

const PEAK_HOURS = [
  { hour: '6 AM', score: 22 },
  { hour: '9 AM', score: 38 },
  { hour: '12 PM', score: 55 },
  { hour: '3 PM', score: 64 },
  { hour: '6 PM', score: 88 },
  { hour: '8 PM', score: 97 },
  { hour: '10 PM', score: 72 },
  { hour: '12 AM', score: 41 },
];

const INTERESTS = [
  'AI & Technology', 'Productivity', 'Creator Economy', 'Marketing',
  'Entrepreneurship', 'Short-form Video', 'Self Improvement', 'Finance',
];

const DEVICES = [
  { label: 'Mobile', percent: 78, icon: Smartphone },
  { label: 'Desktop', percent: 16, icon: Smartphone },
  { label: 'Tablet', percent: 6, icon: Smartphone },
];

export default function ProfileIntelligencePage() {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Profile Intelligence</h1>
            <p className="mt-1 text-foreground/60 text-sm">Deep audience insights and behaviour patterns</p>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {[
              { label: 'Total Audience', value: '12.4K', sub: 'across all platforms', color: 'text-violet-400' },
              { label: 'Avg. Watch Time', value: '42s', sub: 'per short-form video', color: 'text-cyan-400' },
              { label: 'Return Viewers', value: '64%', sub: 'watch multiple videos', color: 'text-pink-400' },
              { label: 'Audience Score', value: '81/100', sub: 'engagement quality', color: 'text-green-400' },
            ].map(({ label, value, sub, color }) => (
              <Card key={label} className="border border-white/10 bg-card p-4 sm:p-5">
                <div className={`text-2xl font-bold ${color}`}>{value}</div>
                <p className="text-xs font-semibold mt-1">{label}</p>
                <p className="text-[10px] text-foreground/40">{sub}</p>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Age Demographics */}
            <Card className="border border-white/10 bg-card p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-5">
                <Users className="h-4 w-4 text-foreground/50" />
                <h2 className="font-semibold">Age Demographics</h2>
              </div>
              <div className="space-y-3">
                {AGE_BRACKETS.map((age) => (
                  <div key={age.label} className="flex items-center gap-3">
                    <span className="text-xs font-mono text-foreground/50 w-12">{age.label}</span>
                    <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${age.color} rounded-full transition-all duration-700`}
                        style={{ width: `${age.percent}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono text-foreground/60 w-8 text-right">
                      {age.percent}%
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-foreground/40 mt-4">
                Core audience: <span className="text-cyan-400 font-medium">18–34 (72%)</span>
              </p>
            </Card>

            {/* Peak Hours */}
            <Card className="border border-white/10 bg-card p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-5">
                <Clock className="h-4 w-4 text-foreground/50" />
                <h2 className="font-semibold">Audience Peak Hours</h2>
              </div>
              <div className="flex items-end gap-1.5 h-28">
                {PEAK_HOURS.map((h) => (
                  <div key={h.hour} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full relative h-full">
                      <div
                        className={`absolute bottom-0 w-full rounded-t transition-all duration-500 ${
                          h.score >= 88 ? 'bg-gradient-to-t from-cyan-500 to-violet-500' : 'bg-white/20'
                        }`}
                        style={{ height: `${h.score}%` }}
                      />
                    </div>
                    <span className="text-[8px] text-foreground/30 font-mono leading-none">
                      {h.hour.replace(' ', '')}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-foreground/40 mt-3">
                Best time to post: <span className="text-cyan-400 font-medium">6–10 PM your time zone</span>
              </p>
            </Card>

            {/* Top Locations */}
            <Card className="border border-white/10 bg-card p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-5">
                <MapPin className="h-4 w-4 text-foreground/50" />
                <h2 className="font-semibold">Top Locations</h2>
              </div>
              <div className="space-y-3">
                {TOP_LOCATIONS.map((loc) => (
                  <div key={loc.city} className="flex items-center gap-3">
                    <span className="text-base">{loc.flag}</span>
                    <span className="text-xs text-foreground/70 flex-1">{loc.city}</span>
                    <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full"
                        style={{ width: `${loc.percent}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono text-foreground/50 w-8 text-right">
                      {loc.percent}%
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Interests & Devices */}
            <Card className="border border-white/10 bg-card p-5 sm:p-6">
              <h2 className="font-semibold mb-4">Audience Interests</h2>
              <div className="flex flex-wrap gap-2 mb-6">
                {INTERESTS.map((interest) => (
                  <Badge
                    key={interest}
                    variant="outline"
                    className="border-white/10 text-foreground/60 text-xs"
                  >
                    {interest}
                  </Badge>
                ))}
              </div>

              <h2 className="font-semibold mb-3">Device Split</h2>
              <div className="flex items-center gap-2">
                {DEVICES.map((d) => (
                  <div
                    key={d.label}
                    className="flex-1 text-center bg-white/5 rounded-lg p-3 border border-white/10"
                  >
                    <div className="text-lg font-bold">{d.percent}%</div>
                    <div className="text-[10px] text-foreground/40">{d.label}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
