'use client';

import { Zap, Brain, BarChart3, Radar } from 'lucide-react';

export function AuthoritySection() {
  return (
    <section className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-balance">
            Not Just Ideas. Direction.
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Enterprise-grade AI trained on millions of creator insights provides strategic guidance that scales with you.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Predictive Scoring */}
          <div 
            className="group relative overflow-hidden rounded-2xl p-8 transition-all duration-300 hover:shadow-xl"
            style={{
              background: 'rgba(167, 139, 250, 0.08)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(167, 139, 250, 0.2)',
            }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br from-violet-500/20 to-transparent blur-2xl" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-lg bg-violet-500/20 flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-violet-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Predictive Scoring</h3>
              <p className="text-gray-400">
                ML models score content potential across engagement, virality, and audience fit before posting. Know which ideas win.
              </p>
            </div>
          </div>

          {/* Real-time Opportunity Alerts */}
          <div 
            className="group relative overflow-hidden rounded-2xl p-8 transition-all duration-300 hover:shadow-xl"
            style={{
              background: 'rgba(6, 214, 255, 0.08)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(6, 214, 255, 0.2)',
            }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500/20 to-transparent blur-2xl" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center mb-4">
                <Radar className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Real-time Opportunity Alerts</h3>
              <p className="text-gray-400">
                Get notified the moment trending topics align with your creator niche. Never miss growth opportunities again.
              </p>
            </div>
          </div>

          {/* Content Structure Engine */}
          <div 
            className="group relative overflow-hidden rounded-2xl p-8 transition-all duration-300 hover:shadow-xl"
            style={{
              background: 'rgba(244, 114, 182, 0.08)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(244, 114, 182, 0.2)',
            }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br from-pink-500/20 to-transparent blur-2xl" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-lg bg-pink-500/20 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-pink-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Content Structure Engine</h3>
              <p className="text-gray-400">
                AI writes hooks, outlines, and optimization suggestions tailored to platform algorithms and your audience.
              </p>
            </div>
          </div>

          {/* Multi-Platform Strategy Alignment */}
          <div 
            className="group relative overflow-hidden rounded-2xl p-8 transition-all duration-300 hover:shadow-xl"
            style={{
              background: 'rgba(251, 191, 36, 0.08)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(251, 191, 36, 0.2)',
            }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br from-amber-500/20 to-transparent blur-2xl" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Multi-Platform Strategy Alignment</h3>
              <p className="text-gray-400">
                Content adapted for TikTok, YouTube Shorts, Instagram Reels, Twitter, and Threads with platform-specific optimization.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
