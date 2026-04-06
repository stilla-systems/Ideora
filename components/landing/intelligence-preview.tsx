'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, Zap, Clock, Flame, Gauge } from 'lucide-react';

export function IntelligencePreview() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="relative py-24 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-balance">
            Animated Intelligence Preview
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Real-time metrics that show your content's potential before you post.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Idea Score Card */}
          <div 
            className="group relative overflow-hidden rounded-lg p-4 transition-all duration-300 hover:shadow-xl"
            style={{
              background: 'rgba(167, 139, 250, 0.08)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(167, 139, 250, 0.2)',
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center">
                <Gauge className="w-4 h-4 text-violet-400" />
              </div>
              <span className="text-lg font-bold text-violet-400">92</span>
            </div>
            <p className="text-gray-200 text-xs font-medium">Idea Score</p>
            <p className="text-gray-300 text-xs mt-1">/100 potential match</p>
          </div>

          {/* Engagement Forecast */}
          <div 
            className="group relative overflow-hidden rounded-lg p-4 transition-all duration-300 hover:shadow-xl"
            style={{
              background: 'rgba(6, 214, 255, 0.08)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(6, 214, 255, 0.2)',
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
              </div>
              <span className="text-lg font-bold text-cyan-400">+61%</span>
            </div>
            <p className="text-gray-200 text-xs font-medium">Engagement Forecast</p>
            <p className="text-gray-300 text-xs mt-1">vs. your average</p>
          </div>

          {/* Optimal Post Time */}
          <div 
            className="group relative overflow-hidden rounded-lg p-4 transition-all duration-300 hover:shadow-xl"
            style={{
              background: 'rgba(244, 114, 182, 0.08)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(244, 114, 182, 0.2)',
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center">
                <Clock className="w-4 h-4 text-pink-400" />
              </div>
              <span className="text-lg font-bold text-pink-400">7:42 PM</span>
            </div>
            <p className="text-gray-200 text-xs font-medium">Optimal Post Time</p>
            <p className="text-gray-300 text-xs mt-1">Tuesday (tomorrow)</p>
          </div>

          {/* Trend Velocity Meter */}
          <div 
            className="group relative overflow-hidden rounded-lg p-4 transition-all duration-300 hover:shadow-xl"
            style={{
              background: 'rgba(251, 191, 36, 0.08)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(251, 191, 36, 0.2)',
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                <Zap className="w-4 h-4 text-amber-400" />
              </div>
              <span className="text-xs font-bold text-amber-400">RISING</span>
            </div>
            <p className="text-gray-200 text-xs font-medium">Trend Velocity</p>
            <p className="text-gray-300 text-xs mt-1">momentum meter</p>
          </div>

          {/* Platform Heat Index */}
          <div 
            className="group relative overflow-hidden rounded-lg p-4 transition-all duration-300 hover:shadow-xl"
            style={{
              background: 'rgba(239, 68, 68, 0.08)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
                <Flame className="w-4 h-4 text-red-400" />
              </div>
              <span className="text-lg font-bold text-red-400">🔥</span>
            </div>
            <p className="text-gray-200 text-xs font-medium">Platform Heat Index</p>
            <p className="text-gray-300 text-xs mt-1">TikTok trending now</p>
          </div>

          {/* Predictive Accuracy */}
          <div 
            className="group relative overflow-hidden rounded-lg p-4 transition-all duration-300 hover:shadow-xl"
            style={{
              background: 'rgba(167, 139, 250, 0.08)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(167, 139, 250, 0.2)',
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-violet-400" />
              </div>
              <span className="text-lg font-bold text-violet-400">94%</span>
            </div>
            <p className="text-gray-200 text-xs font-medium">Predictive Accuracy</p>
            <p className="text-gray-300 text-xs mt-1">based on your history</p>
          </div>
        </div>
      </div>
    </section>
  );
}
