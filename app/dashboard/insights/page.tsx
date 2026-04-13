'use client';

import { useEffect, useState } from 'react';
import { Sidebar } from '@/components/dashboard/sidebar';
import { fetchWeeklyInsights, type WeeklyInsights } from '@/lib/insights-api';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { toast } from 'sonner';

function downloadInsightsCSV(insights: WeeklyInsights) {
  const rows: (string | number)[][] = [
    ['IDEORA — WEEKLY INSIGHTS REPORT'],
    [`Week of ${insights.weekOf}`],
    [],
    ['WHAT WORKED THIS WEEK'],
    ['Title', 'Platform', 'Engagement %', 'Views'],
    ...insights.whatWorked.map((i) => [i.title, i.platform, i.engagement, i.views]),
    [],
    ['ENGAGEMENT PATTERNS'],
    ['Title', 'Metric', 'Change %', 'Trend'],
    ...insights.engagementPatterns.map((p) => [p.title, p.metric, p.change, p.trend]),
    [],
    ['COMPETITOR HIGHLIGHTS'],
    ['Name', 'Platform', 'Engagement %', 'Viewer Increase'],
    ...insights.competitorHighlights.map((c) => [c.name, c.platform, c.engagement, c.viewerIncrease]),
    [],
    ['NEXT WEEK TRENDS'],
    ['Position', 'Title', 'Platform', 'Confidence Score', 'Expected Engagement'],
    ...insights.nextWeekTrends.map((t) => [t.position, t.title, t.platform, t.confidenceScore, t.expectedEngagement]),
  ];
  const csv = rows.map((r) => r.map(String).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `ideora-insights-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  toast.success('Report downloaded', { description: 'Weekly insights exported as CSV' });
}

export default function InsightsPage() {
  const [insights, setInsights] = useState<WeeklyInsights | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInsights = async () => {
      try {
        const data = await fetchWeeklyInsights();
        setInsights(data);
      } catch (error) {
        console.error('Failed to load insights:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInsights();
  }, []);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        <div className="px-8 py-6 space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Weekly Insights</h1>
              {insights && <p className="mt-2 text-foreground/60">Week of {insights.weekOf}</p>}
            </div>
            <Button
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg gap-2"
              onClick={() => insights && downloadInsightsCSV(insights)}
              disabled={!insights}
            >
              <Download className="h-4 w-4" />
              Download Report
            </Button>
          </div>

          {loading ? (
            <div className="flex h-96 items-center justify-center">
              <div className="space-y-4 text-center">
                <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
                <p className="text-foreground/60">Loading weekly insights...</p>
              </div>
            </div>
          ) : insights ? (
            <>
              {/* What Worked Section */}
              <section>
                <h2 className="mb-4 text-2xl font-bold">What Worked This Week</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {insights.whatWorked.map((item) => (
                    <div
                      key={item.id}
                      className="p-6 rounded-2xl border border-white/30 dark:border-white/10 transition-all duration-300 hover:shadow-lg"
                      style={{
                        background: 'rgba(255, 255, 255, 0.7)',
                        backdropFilter: 'blur(10px) saturate(200%)',
                      }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="text-4xl">{item.icon}</div>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold text-indigo-700 dark:text-indigo-400 bg-indigo-100/50 dark:bg-indigo-900/30">
                          {item.platform}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                      <p className="text-foreground/70 text-sm mb-4">{item.description}</p>
                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <div>
                          <p className="text-xs text-foreground/60">Engagement</p>
                          <p className="text-lg font-bold text-green-600 dark:text-green-400">{item.engagement}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-foreground/60">Views</p>
                          <p className="text-lg font-bold">{(item.views / 1000).toFixed(0)}K</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Engagement Patterns Section */}
              <section>
                <h2 className="mb-4 text-2xl font-bold">Top Engagement Patterns</h2>
                <div className="grid gap-6 md:grid-cols-3">
                  {insights.engagementPatterns.map((pattern) => (
                    <div
                      key={pattern.id}
                      className="p-6 rounded-2xl border border-white/30 dark:border-white/10"
                      style={{
                        background: 'rgba(255, 255, 255, 0.7)',
                        backdropFilter: 'blur(10px) saturate(200%)',
                      }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-3xl">{pattern.icon}</div>
                        <div
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            pattern.trend === 'up'
                              ? 'text-green-700 dark:text-green-400 bg-green-100/50 dark:bg-green-900/30'
                              : 'text-blue-700 dark:text-blue-400 bg-blue-100/50 dark:bg-blue-900/30'
                          }`}
                        >
                          {pattern.trend === 'up' ? '↑' : '→'} {pattern.change}%
                        </div>
                      </div>
                      <h3 className="text-lg font-bold mb-2">{pattern.title}</h3>
                      <p className="text-foreground/70 text-sm mb-3">{pattern.description}</p>
                      <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{pattern.metric}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Competitor Highlights Section */}
              <section>
                <h2 className="mb-4 text-2xl font-bold">Competitor Highlights</h2>
                <div className="grid gap-6">
                  {insights.competitorHighlights.map((competitor) => (
                    <div
                      key={competitor.id}
                      className="p-6 rounded-2xl border border-white/30 dark:border-white/10"
                      style={{
                        background: 'rgba(255, 255, 255, 0.7)',
                        backdropFilter: 'blur(10px) saturate(200%)',
                      }}
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between md:gap-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className="text-lg font-bold">{competitor.name}</h3>
                            <span className="px-3 py-1 rounded-full text-xs font-semibold text-cyan-700 dark:text-cyan-400 bg-cyan-100/50 dark:bg-cyan-900/30">
                              {competitor.platform}
                            </span>
                          </div>
                          <p className="text-foreground/70 mb-3">{competitor.strategy}</p>
                          <p className="text-sm text-foreground/60">
                            <span className="font-semibold">Top Content:</span> {competitor.topContent}
                          </p>
                        </div>
                        <div className="flex gap-6 mt-4 md:mt-0 md:flex-col md:text-right">
                          <div>
                            <p className="text-xs text-foreground/60 mb-1">Engagement Rate</p>
                            <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{competitor.engagement}%</p>
                          </div>
                          <div>
                            <p className="text-xs text-foreground/60 mb-1">Growth This Week</p>
                            <p className="text-2xl font-bold text-green-600 dark:text-green-400">+{(competitor.viewerIncrease / 1000).toFixed(1)}K</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Next Week Trends Section */}
              <section className="pb-8">
                <h2 className="mb-4 text-2xl font-bold">Next Week's Top 3 Recommended Trends</h2>
                <div className="space-y-4">
                  {insights.nextWeekTrends.map((trend) => (
                    <div
                      key={trend.id}
                      className="p-6 rounded-2xl border border-white/30 dark:border-white/10 hover:border-indigo-400/50 transition-all duration-300"
                      style={{
                        background: 'rgba(255, 255, 255, 0.7)',
                        backdropFilter: 'blur(10px) saturate(200%)',
                      }}
                    >
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex items-center gap-4">
                          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 border border-indigo-300/30">
                            <span className="text-3xl">{trend.icon}</span>
                          </div>
                          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg px-4 py-2">
                            <p className="text-sm font-semibold text-white"># {trend.position}</p>
                          </div>
                        </div>

                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-2">{trend.title}</h3>
                          <p className="text-foreground/70 mb-4">{trend.description}</p>
                          <div className="flex flex-wrap gap-4">
                            <div>
                              <p className="text-xs text-foreground/60 mb-1">Platforms</p>
                              <p className="font-semibold text-sm">{trend.platform}</p>
                            </div>
                            <div>
                              <p className="text-xs text-foreground/60 mb-1">Confidence Score</p>
                              <p className="font-semibold text-sm text-indigo-600 dark:text-indigo-400">{trend.confidenceScore}%</p>
                            </div>
                            <div>
                              <p className="text-xs text-foreground/60 mb-1">Expected Engagement</p>
                              <p className="font-semibold text-sm text-green-600 dark:text-green-400">{trend.expectedEngagement}</p>
                            </div>
                          </div>
                        </div>

                        <Button
                          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg h-fit"
                          onClick={() => {
                            navigator.clipboard.writeText(`${trend.title}\n\n${trend.description}\n\nPlatforms: ${trend.platform}\nConfidence: ${trend.confidenceScore}%`);
                            toast.success('Template copied!', { description: trend.title });
                          }}
                        >
                          Use Template
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </>
          ) : null}
        </div>
      </main>
    </div>
  );
}
