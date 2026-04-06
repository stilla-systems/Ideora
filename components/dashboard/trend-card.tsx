'use client';

import { TrendRecommendation } from '@/lib/api';

interface TrendCardProps extends TrendRecommendation {
  onSave?: () => void;
}

const platformColors: Record<string, { bg: string; text: string }> = {
  TikTok: { bg: 'bg-rose-500/20', text: 'text-rose-700 dark:text-rose-400' },
  YouTube: { bg: 'bg-red-500/20', text: 'text-red-700 dark:text-red-400' },
  X: { bg: 'bg-black/20 dark:bg-white/20', text: 'text-black dark:text-white' },
  Threads: { bg: 'bg-slate-500/20', text: 'text-slate-700 dark:text-slate-400' },
  Facebook: { bg: 'bg-blue-500/20', text: 'text-blue-700 dark:text-blue-400' },
};

export function TrendCard({
  postIdea,
  hook,
  caption,
  hashtagOrSound,
  engagementReason,
  platform,
  niche,
  engagement,
  trend,
  platformIcon,
  onSave,
}: TrendCardProps) {
  const trendIcon = trend === 'up' ? '📈' : trend === 'down' ? '📉' : '➡️';
  const trendColor =
    trend === 'up'
      ? 'text-green-600 dark:text-green-400'
      : trend === 'down'
        ? 'text-red-600 dark:text-red-400'
        : 'text-blue-600 dark:text-blue-400';

  const colors = platformColors[platform] || platformColors.TikTok;

  return (
    <div 
      className="p-6 space-y-5 rounded-2xl border border-white/30 dark:border-white/10 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
      style={{
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(10px) saturate(200%)',
      }}
    >
      {/* Header with platform and trend */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-lg ${colors.bg} flex items-center justify-center text-2xl`}>
            {platformIcon}
          </div>
          <div>
            <p className={`text-xs font-semibold uppercase tracking-wide ${colors.text}`}>{platform}</p>
            <p className="text-xs text-foreground/60">{niche}</p>
          </div>
        </div>
        <div className={`text-2xl ${trendColor}`}>{trendIcon}</div>
      </div>

      {/* Post Idea */}
      <div>
        <h3 className="font-bold text-lg text-foreground leading-snug">{postIdea}</h3>
      </div>

      {/* Hook */}
      <div className="bg-white/30 dark:bg-white/10 rounded-lg p-3 border border-white/20">
        <p className="text-xs text-foreground/60 uppercase tracking-wide mb-1">Hook</p>
        <p className="text-sm font-medium text-foreground italic">{hook}</p>
      </div>

      {/* Caption */}
      <div>
        <p className="text-xs text-foreground/60 uppercase tracking-wide mb-2">Caption</p>
        <p className="text-sm leading-relaxed text-foreground/80 line-clamp-3">{caption}</p>
      </div>

      {/* Hashtag or Sound */}
      <div className="bg-white/20 dark:bg-white/5 rounded-lg p-3 border border-white/20">
        <p className="text-xs text-foreground/60 uppercase tracking-wide mb-1">Hashtag / Sound</p>
        <p className="text-sm font-medium text-foreground">{hashtagOrSound}</p>
      </div>

      {/* Engagement Reason */}
      <div className="bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 rounded-lg p-3 border border-indigo-300/30 dark:border-indigo-300/20">
        <p className="text-xs text-foreground/60 uppercase tracking-wide mb-2">Why This Works</p>
        <p className="text-sm leading-relaxed text-foreground/90">{engagementReason}</p>
      </div>

      {/* Engagement Score */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-foreground/60 uppercase tracking-wide">Predicted Engagement</p>
          <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{engagement}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-white/20 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-cyan-600 transition-all duration-500"
            style={{ width: `${engagement}%` }}
          />
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={onSave}
        className="w-full mt-2 py-2 px-4 rounded-lg bg-white/20 hover:bg-white/30 dark:hover:bg-white/10 border border-white/30 hover:border-white/50 transition-all duration-300 text-sm font-medium text-foreground"
      >
        Save to Drafts
      </button>
    </div>
  );
}
