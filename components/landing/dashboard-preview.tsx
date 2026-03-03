'use client';

import { BarChart3, LineChart as LineChartIcon, TrendingUp, Zap, ChevronUp } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export function DashboardPreview() {
  const [isExpanded, setIsExpanded] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState<string>('auto');

  useEffect(() => {
    if (contentRef.current) {
      setMaxHeight(isExpanded ? `${contentRef.current.scrollHeight}px` : '0px');
    }
  }, [isExpanded]);

  return (
    <section className="relative w-full py-16 sm:py-20 md:py-28 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 md:mb-6 text-balance px-2 sm:px-0">
            Growth Dashboard Preview
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-2 sm:px-0">
            A command center for creators. See what works, what's trending, and what to post next.
          </p>
        </div>

        {/* Expandable Content Container */}
        <div
          ref={contentRef}
          style={{ maxHeight, opacity: isExpanded ? 1 : 0 }}
          className="relative w-full overflow-hidden transition-all duration-500 ease-in-out"
        >
        {/* Dashboard Mock with layered depth */}
        <div 
          className="relative rounded-lg sm:rounded-2xl border overflow-x-auto overflow-y-hidden transition-all duration-300 hover:shadow-xl"
          style={{
            background: 'linear-gradient(135deg, rgba(167, 139, 250, 0.06) 0%, rgba(6, 214, 255, 0.04) 100%)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(167, 139, 250, 0.2)',
            boxShadow: '0 4px 32px rgba(139, 92, 246, 0.08)',
          }}
        >
          {/* Dashboard header */}
          <div className="border-b border-gray-800/50 p-4 sm:p-6 md:p-8 min-w-full">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              <h3 className="text-sm sm:text-base font-semibold text-white">Your Content Intelligence</h3>
              <div className="flex gap-2">
                <div className="px-3 py-1.5 rounded-lg bg-violet-500/20 text-violet-400 text-xs font-medium border border-violet-500/30 whitespace-nowrap">
                  Last 7 days
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard content */}
          <div className="p-4 sm:p-6 md:p-8 overflow-x-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 min-w-min lg:min-w-full">
              {/* Idea Performance Gauge with subtle background */}
              <div className="group p-3 sm:p-4 rounded-lg transition-all duration-300 hover:bg-white/5" style={{ background: 'rgba(167, 139, 250, 0.04)' }}>
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center group-hover:bg-violet-500/30 transition-colors duration-300">
                    <Zap className="w-4 h-4 text-violet-400" />
                  </div>
                  <span className="text-xs sm:text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Avg Idea Score</span>
                </div>
                <div className="text-3xl font-bold text-white mb-2">87</div>
                <div className="w-full h-1 bg-gray-700/40 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-violet-500 to-pink-500 w-87%" />
                </div>
              </div>

              {/* Growth Projection */}
              <div className="group p-3 sm:p-4 rounded-lg transition-all duration-300 hover:bg-white/5" style={{ background: 'rgba(6, 214, 255, 0.04)' }}>
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/30 transition-colors duration-300">
                    <TrendingUp className="w-4 h-4 text-cyan-400" />
                  </div>
                  <span className="text-xs sm:text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Growth Projection</span>
                </div>
                <div className="text-2.5xl sm:text-3xl font-bold text-white mb-1.5 sm:mb-2">+34%</div>
                <span className="text-xs text-cyan-400">vs. last 7 days</span>
              </div>

              {/* Weekly Content Ideas */}
              <div className="group p-3 sm:p-4 rounded-lg transition-all duration-300 hover:bg-white/5" style={{ background: 'rgba(236, 72, 153, 0.04)' }}>
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <div className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center group-hover:bg-pink-500/30 transition-colors duration-300">
                    <BarChart3 className="w-4 h-4 text-pink-400" />
                  </div>
                  <span className="text-xs sm:text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Ideas This Week</span>
                </div>
                <div className="text-2.5xl sm:text-3xl font-bold text-white mb-1.5 sm:mb-2">12</div>
                <span className="text-xs text-pink-400">high-potential ideas</span>
              </div>

              {/* Engagement Momentum */}
              <div className="group p-3 sm:p-4 rounded-lg transition-all duration-300 hover:bg-white/5" style={{ background: 'rgba(251, 191, 36, 0.04)' }}>
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center group-hover:bg-amber-500/30 transition-colors duration-300">
                    <LineChartIcon className="w-4 h-4 text-amber-400" />
                  </div>
                  <span className="text-xs sm:text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Engagement Momentum</span>
                </div>
                <div className="text-2.5xl sm:text-3xl font-bold text-white mb-1.5 sm:mb-2">↑ Strong</div>
                <span className="text-xs text-amber-400">all platforms rising</span>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Idea Performance by Platform */}
              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-4">Idea Performance by Platform</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-400">TikTok</span>
                      <span className="text-xs font-medium text-white">92/100</span>
                    </div>
                    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 w-92%" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-400">YouTube Shorts</span>
                      <span className="text-xs font-medium text-white">78/100</span>
                    </div>
                    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 w-78%" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-400">Instagram Reels</span>
                      <span className="text-xs font-medium text-white">85/100</span>
                    </div>
                    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 w-85%" />
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Recommendation Panel with subtle depth */}
              <div
                className="group rounded-lg sm:rounded-xl p-3 sm:p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(135deg, rgba(6, 214, 255, 0.08) 0%, rgba(6, 214, 255, 0.04) 100%)',
                  border: '1px solid rgba(6, 214, 255, 0.25)',
                  boxShadow: '0 2px 12px rgba(6, 214, 255, 0.08)',
                }}
              >
                <h4 className="text-xs sm:text-sm font-medium text-cyan-300 group-hover:text-cyan-200 transition-colors duration-300 mb-2 sm:mb-3">🤖 AI Recommendation</h4>
                <p className="text-xs sm:text-sm text-gray-300 group-hover:text-gray-200 transition-colors duration-300 mb-2 sm:mb-3">
                  Post your upcoming idea on TikTok at 7:42 PM tomorrow. Your audience is most active then, and this topic is trending +23% globally.
                </p>
                <p className="text-xs text-gray-400 group-hover:text-gray-350 transition-colors duration-300">
                  Expected engagement: <span className="text-cyan-400 font-medium">+61% higher</span> than your average.
                </p>
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* Toggle Bar - Always Visible */}
        <div
          className="mt-4 sm:mt-6 border-t border-violet-500/20 bg-gradient-to-r from-background via-background to-violet-950/20 backdrop-blur-sm rounded-b-lg cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-background hover:via-violet-950/10 hover:to-violet-950/30"
          onClick={() => setIsExpanded(!isExpanded)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setIsExpanded(!isExpanded);
            }
          }}
        >
          <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 animate-pulse" />
              <span className="text-xs sm:text-sm font-medium text-foreground/70">
                {isExpanded ? 'Hide' : 'Show'} dashboard preview
              </span>
            </div>
            <ChevronUp 
              className={`h-4 w-4 sm:h-5 sm:w-5 text-foreground/60 transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
