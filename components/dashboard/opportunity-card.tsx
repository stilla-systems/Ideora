'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Zap, Globe, ChevronDown, ChevronUp, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';

export interface Opportunity {
  id: string;
  trendTitle: string;
  region: string;
  niche: string;
  momentumScore: number;
  saturationLevel: 'Low' | 'Medium' | 'High';
  whyTrending: string;
  suggestedAngle: string;
  bestPlatform: string;
  bestFormat: string;
  postingWindow: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  confidenceScore: number;
  hook: string;
}

interface OpportunityCardProps {
  opportunity: Opportunity;
  variant?: 'compact' | 'expanded' | 'featured';
  index?: number;
}

const PLATFORM_COLORS: Record<string, string> = {
  TikTok: 'bg-pink-500/15 text-pink-300 border-pink-500/25',
  YouTube: 'bg-red-500/15 text-red-300 border-red-500/25',
  X: 'bg-sky-500/15 text-sky-300 border-sky-500/25',
  Instagram: 'bg-purple-500/15 text-purple-300 border-purple-500/25',
  Threads: 'bg-slate-400/15 text-slate-300 border-slate-400/25',
  LinkedIn: 'bg-blue-500/15 text-blue-300 border-blue-500/25',
  Facebook: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/25',
};

const SATURATION_CONFIG = {
  Low: { label: 'Low Saturation', color: 'text-emerald-400', dot: 'bg-emerald-400' },
  Medium: { label: 'Medium Saturation', color: 'text-amber-400', dot: 'bg-amber-400' },
  High: { label: 'High Saturation', color: 'text-red-400', dot: 'bg-red-400' },
};

const DIFFICULTY_CONFIG = {
  Easy: { color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
  Medium: { color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
  Hard: { color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' },
};

function getMomentumColor(score: number) {
  if (score >= 85) return '#00D9FF';
  if (score >= 70) return '#10B981';
  if (score >= 55) return '#F59E0B';
  return '#94A3B8';
}

function MomentumBar({ score }: { score: number }) {
  const color = getMomentumColor(score);
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: `${score}%`,
            background: `linear-gradient(90deg, ${color}55, ${color})`,
            boxShadow: `0 0 8px ${color}40`,
          }}
        />
      </div>
      <span
        className="text-sm font-bold font-mono tabular-nums w-7 text-right"
        style={{ color }}
      >
        {score}
      </span>
    </div>
  );
}

// ─── FEATURED VARIANT ────────────────────────────────────────────────────────

function FeaturedCard({ opportunity }: { opportunity: Opportunity }) {
  const platformColor = PLATFORM_COLORS[opportunity.bestPlatform] ?? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/25';
  const sat = SATURATION_CONFIG[opportunity.saturationLevel];
  const diff = DIFFICULTY_CONFIG[opportunity.difficulty];
  const momentumColor = getMomentumColor(opportunity.momentumScore);

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-white/[0.08] backdrop-blur-sm"
      style={{
        background: 'linear-gradient(135deg, rgba(0,217,255,0.04) 0%, rgba(176,38,255,0.04) 100%)',
        boxShadow: '0 0 60px rgba(0,217,255,0.06), 0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
      }}
    >
      {/* Animated top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />

      <div className="p-6 md:p-8">
        {/* Header row */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-cyan-500/25 bg-cyan-500/10">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-mono text-cyan-400 tracking-widest">TOP OPPORTUNITY</span>
            </div>
            <Badge
              variant="outline"
              className={`text-xs font-mono border ${platformColor} px-2 py-0.5`}
            >
              {opportunity.bestPlatform}
            </Badge>
          </div>
          <div
            className="text-3xl font-bold font-mono tabular-nums"
            style={{ color: momentumColor, textShadow: `0 0 20px ${momentumColor}50` }}
          >
            {opportunity.momentumScore}
          </div>
        </div>

        {/* Title + meta */}
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
          {opportunity.trendTitle}
        </h2>
        <div className="flex items-center gap-3 mb-5">
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Globe className="w-3 h-3" />
            {opportunity.region}
          </div>
          <span className="text-gray-700">·</span>
          <span className="text-xs text-gray-400">{opportunity.niche}</span>
          <span className="text-gray-700">·</span>
          <div className="flex items-center gap-1">
            <div className={`w-1.5 h-1.5 rounded-full ${sat.dot}`} />
            <span className={`text-xs ${sat.color}`}>{sat.label}</span>
          </div>
        </div>

        {/* Momentum bar */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-gray-500 tracking-wider">MOMENTUM SCORE</span>
            <span className="text-xs font-mono text-gray-500">CONFIDENCE: <span className="text-cyan-400 font-bold">{opportunity.confidenceScore}%</span></span>
          </div>
          <MomentumBar score={opportunity.momentumScore} />
        </div>

        {/* Why trending */}
        <p className="text-sm text-gray-300 leading-relaxed mb-5">{opportunity.whyTrending}</p>

        {/* Angle block */}
        <div
          className="p-4 rounded-xl mb-5 border border-cyan-500/10"
          style={{ background: 'rgba(0,217,255,0.03)' }}
        >
          <p className="text-xs font-mono text-cyan-400/70 tracking-wider mb-2">SUGGESTED ANGLE</p>
          <p className="text-sm text-white leading-relaxed">"{opportunity.suggestedAngle}"</p>
        </div>

        {/* Hook */}
        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] mb-5">
          <p className="text-xs font-mono text-gray-600 tracking-wider mb-1.5">OPENING HOOK</p>
          <p className="text-sm text-gray-300 italic">"{opportunity.hook}"</p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { label: 'FORMAT', value: opportunity.bestFormat },
            { label: 'POST WINDOW', value: opportunity.postingWindow, icon: Clock },
            {
              label: 'DIFFICULTY',
              value: opportunity.difficulty,
              className: `${diff.color} font-semibold`,
            },
            { label: 'CONFIDENCE', value: `${opportunity.confidenceScore}%`, className: 'text-cyan-400 font-bold' },
          ].map(({ label, value, icon: Icon, className }) => (
            <div key={label} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <p className="text-xs font-mono text-gray-600 mb-1">{label}</p>
              <p className={`text-xs text-gray-300 flex items-center gap-1 ${className ?? ''}`}>
                {Icon && <Icon className="w-3 h-3 flex-shrink-0" />}
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Button
          className="w-full font-bold text-sm h-11 text-black transition-all duration-200"
          style={{
            background: 'linear-gradient(135deg, #00D9FF, #0080FF)',
            boxShadow: '0 4px 20px rgba(0,217,255,0.25)',
          }}
        >
          <Zap className="w-4 h-4 mr-2" />
          Use This Opportunity
          <ArrowUpRight className="w-4 h-4 ml-auto" />
        </Button>
      </div>
    </div>
  );
}

// ─── COMPACT / EXPANDED VARIANT ───────────────────────────────────────────────

function CompactCard({ opportunity, index = 0 }: { opportunity: Opportunity; index?: number }) {
  const [expanded, setExpanded] = useState(false);
  const platformColor = PLATFORM_COLORS[opportunity.bestPlatform] ?? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/25';
  const sat = SATURATION_CONFIG[opportunity.saturationLevel];
  const diff = DIFFICULTY_CONFIG[opportunity.difficulty];
  const momentumColor = getMomentumColor(opportunity.momentumScore);

  return (
    <div
      className="group relative rounded-xl border border-white/[0.06] hover:border-white/[0.12] backdrop-blur-sm transition-all duration-300 overflow-hidden cursor-pointer"
      style={{
        background: 'rgba(255,255,255,0.015)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
      }}
      onClick={() => setExpanded((v) => !v)}
    >
      {/* Hover glow top line */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${momentumColor}50, transparent)` }}
      />

      <div className="p-4">
        {/* Row 1: number + title + platform + score */}
        <div className="flex items-start gap-3 mb-3">
          <span className="text-xs font-mono text-gray-700 mt-0.5 w-4 flex-shrink-0 tabular-nums">
            {String(index + 2).padStart(2, '0')}
          </span>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-white leading-snug mb-1.5 truncate pr-2">
              {opportunity.trendTitle}
            </h3>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge
                variant="outline"
                className={`text-xs font-mono border px-1.5 py-0 h-5 ${platformColor}`}
              >
                {opportunity.bestPlatform}
              </Badge>
              <span className="text-xs text-gray-600">{opportunity.region}</span>
              <span className="text-gray-700 text-xs">·</span>
              <span className="text-xs text-gray-600">{opportunity.niche}</span>
            </div>
          </div>
          <div className="flex-shrink-0 text-right">
            <span
              className="text-base font-bold font-mono tabular-nums block"
              style={{ color: momentumColor }}
            >
              {opportunity.momentumScore}
            </span>
            <span className="text-xs font-mono text-gray-700">MOM</span>
          </div>
        </div>

        {/* Momentum bar */}
        <MomentumBar score={opportunity.momentumScore} />

        {/* Expanded section */}
        {expanded && (
          <div className="mt-4 space-y-3 border-t border-white/[0.05] pt-4">
            <p className="text-xs text-gray-400 leading-relaxed">{opportunity.whyTrending}</p>

            <div className="p-3 rounded-lg border border-cyan-500/10 bg-cyan-500/[0.02]">
              <p className="text-xs font-mono text-cyan-400/60 mb-1.5">ANGLE</p>
              <p className="text-xs text-gray-300 italic leading-relaxed">"{opportunity.suggestedAngle}"</p>
            </div>

            <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
              <p className="text-xs font-mono text-gray-700 mb-1">HOOK</p>
              <p className="text-xs text-gray-400 italic">"{opportunity.hook}"</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 rounded-lg bg-white/[0.02]">
                <p className="text-xs font-mono text-gray-700 mb-0.5">FORMAT</p>
                <p className="text-xs text-gray-300">{opportunity.bestFormat}</p>
              </div>
              <div className="p-2 rounded-lg bg-white/[0.02]">
                <p className="text-xs font-mono text-gray-700 mb-0.5">WINDOW</p>
                <p className="text-xs text-gray-300">{opportunity.postingWindow}</p>
              </div>
              <div className="p-2 rounded-lg bg-white/[0.02]">
                <p className="text-xs font-mono text-gray-700 mb-0.5">DIFFICULTY</p>
                <p className={`text-xs font-semibold ${diff.color}`}>{opportunity.difficulty}</p>
              </div>
              <div className="p-2 rounded-lg bg-white/[0.02]">
                <p className="text-xs font-mono text-gray-700 mb-0.5">CONFIDENCE</p>
                <p className="text-xs font-bold text-cyan-400">{opportunity.confidenceScore}%</p>
              </div>
            </div>

            <Button
              size="sm"
              className="w-full text-xs font-mono h-8 transition-all duration-200 border"
              style={{
                background: 'rgba(0,217,255,0.06)',
                color: '#00D9FF',
                borderColor: 'rgba(0,217,255,0.2)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <Zap className="w-3 h-3 mr-1.5" />
              USE THIS OPPORTUNITY
            </Button>
          </div>
        )}

        {/* Footer row */}
        <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-white/[0.04]">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <div className={`w-1 h-1 rounded-full ${sat.dot}`} />
              <span className={`text-xs ${sat.color}`}>{opportunity.saturationLevel} Sat.</span>
            </div>
            <span className={`text-xs ${diff.color}`}>{opportunity.difficulty}</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-600 group-hover:text-gray-400 transition-colors">
            <span className="text-xs font-mono">{expanded ? 'LESS' : 'MORE'}</span>
            {expanded ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PUBLIC EXPORT ────────────────────────────────────────────────────────────

export function OpportunityCard({ opportunity, variant = 'compact', index = 0 }: OpportunityCardProps) {
  if (variant === 'featured') {
    return <FeaturedCard opportunity={opportunity} />;
  }
  return <CompactCard opportunity={opportunity} index={index} />;
}
