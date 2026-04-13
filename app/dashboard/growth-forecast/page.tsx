'use client';

import { Sidebar } from '@/components/dashboard/sidebar';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Eye, Target } from 'lucide-react';

const FORECAST_DATA = [
  { week: 'Now',    followers: 12400, views: 48000,  score: 72 },
  { week: 'Wk 1',  followers: 12960, views: 54200,  score: 75 },
  { week: 'Wk 2',  followers: 13640, views: 62800,  score: 78 },
  { week: 'Wk 3',  followers: 14550, views: 73400,  score: 81 },
  { week: 'Wk 4',  followers: 15800, views: 88600,  score: 85 },
];

const maxFollowers = Math.max(...FORECAST_DATA.map((d) => d.followers));
const maxViews = Math.max(...FORECAST_DATA.map((d) => d.views));

const MILESTONES = [
  {
    icon: '🎯',
    target: '15K Followers',
    current: '12.4K',
    percent: 83,
    daysLeft: 22,
    color: 'from-violet-500 to-cyan-500',
  },
  {
    icon: '👁️',
    target: '100K Monthly Views',
    current: '88.6K',
    percent: 89,
    daysLeft: 8,
    color: 'from-pink-500 to-yellow-500',
  },
  {
    icon: '💬',
    target: '10% Engagement Rate',
    current: '8.4%',
    percent: 84,
    daysLeft: 14,
    color: 'from-cyan-500 to-green-500',
  },
];

const GROWTH_DRIVERS = [
  { label: 'Consistent Posting (5×/week)', impact: '+34%', up: true },
  { label: 'Use Trending Audio', impact: '+28%', up: true },
  { label: 'Post at Peak Time (Fri 8 PM)', impact: '+21%', up: true },
  { label: 'Cross-Platform Repurposing', impact: '+17%', up: true },
  { label: 'Reduce Video Length to <45s', impact: '+12%', up: true },
  { label: 'Inconsistent Schedule', impact: '-18%', up: false },
];

export default function GrowthForecastPage() {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Growth Forecast</h1>
              <p className="mt-1 text-foreground/60 text-sm">30-day AI-powered growth projections</p>
            </div>
            <Badge
              variant="outline"
              className="border-green-500/30 text-green-400 bg-green-500/10 w-fit"
            >
              <TrendingUp className="h-3.5 w-3.5 mr-1.5" />
              On Track for +27% Growth
            </Badge>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {[
              { label: 'Current Followers', value: '12.4K', icon: Users, color: 'text-violet-400' },
              { label: '30-Day Projection', value: '15.8K', icon: Target, color: 'text-cyan-400' },
              { label: 'Predicted Views/Mo', value: '88.6K', icon: Eye, color: 'text-pink-400' },
              { label: 'Growth Score', value: '85/100', icon: TrendingUp, color: 'text-green-400' },
            ].map(({ label, value, icon: Icon, color }) => (
              <Card key={label} className="border border-white/10 bg-card p-4 sm:p-5">
                <Icon className={`h-5 w-5 ${color} mb-3`} />
                <div className="text-xl sm:text-2xl font-bold">{value}</div>
                <p className="text-xs text-foreground/50 mt-1">{label}</p>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Followers Forecast Chart */}
            <Card className="border border-white/10 bg-card p-5 sm:p-6">
              <h2 className="font-semibold mb-5">Follower Growth Trajectory (4 Weeks)</h2>
              <div className="flex items-end gap-3 h-36">
                {FORECAST_DATA.map((d, i) => (
                  <div key={d.week} className="flex-1 flex flex-col items-center gap-1.5">
                    <span className="text-[10px] text-foreground/40 font-mono hidden sm:block">
                      {(d.followers / 1000).toFixed(1)}K
                    </span>
                    <div className="w-full h-full relative">
                      <div
                        className={`absolute bottom-0 w-full rounded-t transition-all duration-500 ${
                          i === 0
                            ? 'bg-white/20'
                            : 'bg-gradient-to-t from-violet-600 to-cyan-500'
                        }`}
                        style={{ height: `${(d.followers / maxFollowers) * 100}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-foreground/40 font-mono">{d.week}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-foreground/40 mt-3 text-center">
                * Projections assume 5× weekly posting schedule
              </p>
            </Card>

            {/* Milestones */}
            <Card className="border border-white/10 bg-card p-5 sm:p-6">
              <h2 className="font-semibold mb-5">Milestone Tracker</h2>
              <div className="space-y-5">
                {MILESTONES.map((m) => (
                  <div key={m.target}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{m.icon}</span>
                        <div>
                          <p className="text-xs font-semibold">{m.target}</p>
                          <p className="text-[10px] text-foreground/40">
                            Current: {m.current} · {m.daysLeft} days left
                          </p>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-cyan-400">{m.percent}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${m.color} transition-all duration-700`}
                        style={{ width: `${m.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Growth Drivers */}
          <Card className="border border-white/10 bg-card p-5 sm:p-6">
            <h2 className="font-semibold mb-5">Growth Drivers & Risk Factors</h2>
            <div className="grid sm:grid-cols-2 gap-2">
              {GROWTH_DRIVERS.map((driver) => (
                <div
                  key={driver.label}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    driver.up
                      ? 'bg-green-500/5 border-green-500/20'
                      : 'bg-red-500/5 border-red-500/20'
                  }`}
                >
                  <span className="text-xs text-foreground/70">{driver.label}</span>
                  <span
                    className={`text-xs font-bold ${
                      driver.up ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {driver.impact}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
