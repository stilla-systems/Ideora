'use client';

import { useEffect, useState } from 'react';
import { DashboardShell } from '@/components/dashboard/dashboard-shell';
import { fetchWeeklyInsights, type WeeklyInsights } from '@/lib/insights-api';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Minus, Download } from 'lucide-react';

const CARD_STYLE = {
  background: 'rgba(255,255,255,0.015)',
  backdropFilter: 'blur(10px)',
} as const;

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <h2 className="text-lg font-bold text-white">{children}</h2>
      <div className="flex-1 h-px bg-white/[0.04]" />
    </div>
  );
}

export default function InsightsPage() {
  const [insights, setInsights] = useState<WeeklyInsights | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeeklyInsights()
      .then(setInsights)
      .catch((e) => console.error('Failed to load insights:', e))
      .finally(() => setLoading(false));
  }, []);

  return (
    <DashboardShell>
      <div className="px-4 md:px-6 py-6 md:py-8 space-y-10 max-w-7xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span className="text-xs font-mono text-gray-500 tracking-widest">WEEKLY REPORT</span>
            </div>
            <h1 className="text-2xl font-bold text-white">Weekly Insights</h1>
            {insights && (
              <p className="text-sm text-gray-500 mt-1">Week of {insights.weekOf}</p>
            )}
          </div>
          <Button
            size="sm"
            className="flex-shrink-0 font-mono text-xs h-8 gap-2"
            style={{
              background: 'rgba(0,217,255,0.08)',
              color: '#00D9FF',
              border: '1px solid rgba(0,217,255,0.2)',
            }}
          >
            <Download className="w-3.5 h-3.5" />
            Export
          </Button>
        </div>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="text-center space-y-3">
              <div className="w-8 h-8 border-2 border-cyan-400/20 border-t-cyan-400 rounded-full animate-spin mx-auto" />
              <p className="text-xs font-mono text-gray-600">Loading intelligence...</p>
            </div>
          </div>
        ) : insights ? (
          <>
            {/* What Worked */}
            <section>
              <SectionLabel>What Worked This Week</SectionLabel>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {insights.whatWorked.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 rounded-xl border border-white/[0.06] hover:border-white/[0.1] transition-all duration-200"
                    style={CARD_STYLE}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-3xl">{item.icon}</span>
                      <span className="text-xs font-mono px-2 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                        {item.platform}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-white mb-1.5">{item.title}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed mb-4">{item.description}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-white/[0.05]">
                      <div>
                        <p className="text-xs font-mono text-gray-600 mb-0.5">ENGAGEMENT</p>
                        <p className="text-base font-bold text-emerald-400">{item.engagement}%</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-mono text-gray-600 mb-0.5">VIEWS</p>
                        <p className="text-base font-bold text-white">{(item.views / 1000).toFixed(0)}K</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Engagement Patterns */}
            <section>
              <SectionLabel>Engagement Patterns</SectionLabel>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {insights.engagementPatterns.map((pattern) => (
                  <div
                    key={pattern.id}
                    className="p-5 rounded-xl border border-white/[0.06] hover:border-white/[0.1] transition-all duration-200"
                    style={CARD_STYLE}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl">{pattern.icon}</span>
                      <div
                        className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-mono font-bold ${
                          pattern.trend === 'up'
                            ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                            : 'bg-blue-500/10 border border-blue-500/20 text-blue-400'
                        }`}
                      >
                        {pattern.trend === 'up' ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : pattern.trend === 'down' ? (
                          <TrendingDown className="w-3 h-3" />
                        ) : (
                          <Minus className="w-3 h-3" />
                        )}
                        {pattern.change}%
                      </div>
                    </div>
                    <h3 className="text-sm font-bold text-white mb-1.5">{pattern.title}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed mb-3">{pattern.description}</p>
                    <p className="text-xs font-mono text-cyan-400">{pattern.metric}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Competitor Highlights */}
            <section>
              <SectionLabel>Competitor Highlights</SectionLabel>
              <div className="space-y-3">
                {insights.competitorHighlights.map((competitor) => (
                  <div
                    key={competitor.id}
                    className="p-5 rounded-xl border border-white/[0.06] hover:border-white/[0.1] transition-all duration-200"
                    style={CARD_STYLE}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-sm font-bold text-white">{competitor.name}</h3>
                          <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                            {competitor.platform}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 leading-relaxed mb-2">{competitor.strategy}</p>
                        <p className="text-xs text-gray-600">
                          <span className="text-gray-500 font-medium">Top content:</span>{' '}
                          {competitor.topContent}
                        </p>
                      </div>
                      <div className="flex sm:flex-col gap-6 sm:gap-3 sm:text-right flex-shrink-0">
                        <div>
                          <p className="text-xs font-mono text-gray-600 mb-0.5">ENGAGEMENT</p>
                          <p className="text-xl font-bold text-cyan-400">{competitor.engagement}%</p>
                        </div>
                        <div>
                          <p className="text-xs font-mono text-gray-600 mb-0.5">GROWTH</p>
                          <p className="text-xl font-bold text-emerald-400">
                            +{(competitor.viewerIncrease / 1000).toFixed(1)}K
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Next Week Trends */}
            <section className="pb-8">
              <SectionLabel>Next Week's Top Recommendations</SectionLabel>
              <div className="space-y-3">
                {insights.nextWeekTrends.map((trend) => (
                  <div
                    key={trend.id}
                    className="p-5 rounded-xl border border-white/[0.06] hover:border-cyan-500/20 transition-all duration-200"
                    style={CARD_STYLE}
                  >
                    <div className="flex flex-col sm:flex-row gap-5">
                      <div className="flex items-center gap-4 flex-shrink-0">
                        <div
                          className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/[0.08]"
                          style={{ background: 'rgba(0,217,255,0.06)' }}
                        >
                          <span className="text-2xl">{trend.icon}</span>
                        </div>
                        <div
                          className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-white"
                          style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}
                        >
                          #{trend.position}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-bold text-white mb-1.5">{trend.title}</h3>
                        <p className="text-xs text-gray-400 leading-relaxed mb-3">{trend.description}</p>
                        <div className="flex flex-wrap gap-4">
                          <div>
                            <p className="text-xs font-mono text-gray-600 mb-0.5">PLATFORM</p>
                            <p className="text-xs font-semibold text-gray-300">{trend.platform}</p>
                          </div>
                          <div>
                            <p className="text-xs font-mono text-gray-600 mb-0.5">CONFIDENCE</p>
                            <p className="text-xs font-bold text-cyan-400">{trend.confidenceScore}%</p>
                          </div>
                          <div>
                            <p className="text-xs font-mono text-gray-600 mb-0.5">EXP. ENGAGEMENT</p>
                            <p className="text-xs font-bold text-emerald-400">{trend.expectedEngagement}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex-shrink-0 self-center">
                        <Button
                          size="sm"
                          className="text-xs font-mono h-8"
                          style={{
                            background: 'rgba(0,217,255,0.08)',
                            color: '#00D9FF',
                            border: '1px solid rgba(0,217,255,0.2)',
                          }}
                        >
                          Use Template
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : (
          <div className="flex h-64 items-center justify-center">
            <p className="text-sm text-gray-600 font-mono">No insights available</p>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
