'use client';

import { Sidebar } from '@/components/dashboard/sidebar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Users, Eye, Heart, Share2, Download } from 'lucide-react';
import { toast } from 'sonner';

const WEEKLY_DATA = [
  { day: 'Mon', views: 12400, engagement: 8.2, followers: 34 },
  { day: 'Tue', views: 9800, engagement: 6.7, followers: 22 },
  { day: 'Wed', views: 18600, engagement: 11.4, followers: 58 },
  { day: 'Thu', views: 14200, engagement: 9.1, followers: 41 },
  { day: 'Fri', views: 24800, engagement: 14.3, followers: 87 },
  { day: 'Sat', views: 19600, engagement: 12.8, followers: 63 },
  { day: 'Sun', views: 16200, engagement: 10.5, followers: 49 },
];

const maxViews = Math.max(...WEEKLY_DATA.map((d) => d.views));

const STATS = [
  { label: 'Total Views', value: '115.6K', change: '+18.4%', up: true, icon: Eye, color: 'text-cyan-400' },
  { label: 'Avg. Engagement', value: '10.4%', change: '+2.1%', up: true, icon: Heart, color: 'text-pink-400' },
  { label: 'New Followers', value: '+354', change: '+12.6%', up: true, icon: Users, color: 'text-violet-400' },
  { label: 'Shares', value: '2,840', change: '-3.2%', up: false, icon: Share2, color: 'text-yellow-400' },
];

const TOP_CONTENT = [
  { title: 'AI Goes Wrong Compilation', platform: 'TikTok', views: '48.2K', engagement: '14.8%' },
  { title: '5 Productivity Hacks', platform: 'YouTube', views: '22.6K', engagement: '11.3%' },
  { title: 'Creator Day in My Life', platform: 'Instagram', views: '17.4K', engagement: '9.7%' },
  { title: 'Quick Tech Tutorial', platform: 'YouTube Shorts', views: '14.1K', engagement: '8.4%' },
  { title: '#DeInfluencing Take', platform: 'TikTok', views: '13.3K', engagement: '7.9%' },
];

function downloadCSV() {
  const rows = [
    ['Day', 'Views', 'Engagement Rate (%)', 'New Followers'],
    ...WEEKLY_DATA.map((d) => [d.day, d.views, d.engagement, d.followers]),
    [],
    ['Top Content', 'Platform', 'Views', 'Engagement Rate'],
    ...TOP_CONTENT.map((c) => [c.title, c.platform, c.views, c.engagement]),
  ];
  const csv = rows.map((r) => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `ideora-analytics-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  toast.success('Analytics exported', { description: 'CSV downloaded to your device' });
}

export default function AnalyticsPage() {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Analytics</h1>
              <p className="mt-1 text-foreground/60 text-sm">Performance overview for the last 7 days</p>
            </div>
            <Button
              variant="outline"
              className="border-white/10 hover:border-white/20 gap-2 w-fit"
              onClick={downloadCSV}
            >
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {STATS.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.label} className="border border-white/10 bg-card p-4 sm:p-5">
                  <div className="flex items-start justify-between mb-3">
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                    <span
                      className={`text-xs font-medium flex items-center gap-0.5 ${
                        stat.up ? 'text-green-400' : 'text-red-400'
                      }`}
                    >
                      {stat.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {stat.change}
                    </span>
                  </div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-foreground/50 mt-1">{stat.label}</p>
                </Card>
              );
            })}
          </div>

          {/* Views Bar Chart */}
          <Card className="border border-white/10 bg-card p-5 sm:p-6">
            <h2 className="font-semibold mb-5">Daily Views This Week</h2>
            <div className="flex items-end gap-2 sm:gap-3 h-40">
              {WEEKLY_DATA.map((d) => (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-1.5">
                  <span className="text-[10px] text-foreground/40 font-mono hidden sm:block">
                    {(d.views / 1000).toFixed(1)}K
                  </span>
                  <div className="w-full rounded-t relative" style={{ height: '100%' }}>
                    <div
                      className="absolute bottom-0 w-full rounded-t bg-gradient-to-t from-cyan-600 to-violet-500 transition-all duration-500"
                      style={{ height: `${(d.views / maxViews) * 100}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-foreground/40 font-mono">{d.day}</span>
                </div>
              ))}
            </div>
          </Card>

          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Engagement Rate */}
            <Card className="border border-white/10 bg-card p-5 sm:p-6">
              <h2 className="font-semibold mb-5">Engagement Rate by Day</h2>
              <div className="space-y-3">
                {WEEKLY_DATA.map((d) => (
                  <div key={d.day} className="flex items-center gap-3">
                    <span className="text-xs font-mono text-foreground/50 w-8">{d.day}</span>
                    <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-pink-500 to-violet-500 rounded-full transition-all duration-500"
                        style={{ width: `${(d.engagement / 15) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono text-foreground/60 w-10 text-right">
                      {d.engagement}%
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Top Content */}
            <Card className="border border-white/10 bg-card p-5 sm:p-6">
              <h2 className="font-semibold mb-5">Top Performing Content</h2>
              <div className="space-y-3">
                {TOP_CONTENT.map((item, i) => (
                  <div key={item.title} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] text-foreground/40 shrink-0">
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">{item.title}</p>
                      <p className="text-[10px] text-foreground/40">{item.platform}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs font-semibold">{item.views}</p>
                      <p className="text-[10px] text-green-400">{item.engagement}</p>
                    </div>
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
