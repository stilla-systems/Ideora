'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/dashboard/sidebar';
import { CircularMetricCard } from '@/components/dashboard/circular-metric-card';
import { LiveOpportunitiesCard } from '@/components/dashboard/live-opportunities-card';
import { PlatformActivityCard } from '@/components/dashboard/platform-activity-card';
import { TopIdeasGrid } from '@/components/dashboard/top-ideas-grid';
import { ProTipsCard } from '@/components/dashboard/pro-tips-card';
import { NotificationsPanel } from '@/components/dashboard/notifications-panel';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { fetchDailyTrends, type DailyRecommendation } from '@/lib/api';
import { getCurrentUser } from '@/lib/auth';

const PLATFORMS = ['TikTok', 'YouTube', 'X', 'Threads', 'Facebook'];
const NICHE_SUGGESTIONS = ['Entertainment', 'Education', 'News', 'Creator Content', 'Wellness', 'Comedy', 'Technology', 'Sports'];

interface LiveOpportunity {
  id: string;
  platform: string;
  streamIdea: string;
  bestTimeWindow: string;
  openingHook: string;
  engagementGoal: string;
}

export default function DashboardPage() {
  const [showSearch, setShowSearch] = useState(false);
  const [state, setState] = useState<'empty' | 'loading' | 'results' | 'error'>('empty');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [niche, setNiche] = useState('');
  const [recommendations, setRecommendations] = useState<DailyRecommendation[]>([]);
  const [liveOpportunities, setLiveOpportunities] = useState<LiveOpportunity[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handlePlatformToggle = (platform: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]
    );
  };

  const generateLiveOpportunities = (platforms: string[]): LiveOpportunity[] => {
    const opportunities: Record<string, LiveOpportunity> = {
      TikTok: {
        id: '1',
        platform: 'TikTok Live',
        streamIdea: 'Q&A or trend reaction with audience participation',
        bestTimeWindow: '7-9 PM (peak viewing hours)',
        openingHook: 'Start with bold statement or urgent question',
        engagementGoal: 'Growth through live engagement',
      },
      YouTube: {
        id: '2',
        platform: 'YouTube Live',
        streamIdea: 'Tutorial, behind-the-scenes, or community conversation',
        bestTimeWindow: '8-10 PM (evening commute time)',
        openingHook: 'Highlight what viewers will learn in first 30 seconds',
        engagementGoal: 'Interaction and channel growth',
      },
      X: {
        id: '3',
        platform: 'X Spaces',
        streamIdea: 'News reaction, industry discussion, or hot takes',
        bestTimeWindow: '5-7 PM (after work hours)',
        openingHook: 'Lead with controversial take or breaking insight',
        engagementGoal: 'Visibility and thought leadership',
      },
      Threads: {
        id: '4',
        platform: 'Threads',
        streamIdea: 'Casual conversations and community building',
        bestTimeWindow: '6-8 PM (evening scroll time)',
        openingHook: 'Start with relatable observation or question',
        engagementGoal: 'Community engagement and reach',
      },
      Facebook: {
        id: '5',
        platform: 'Facebook Live',
        streamIdea: 'Long-form content, tutorials, or personal stories',
        bestTimeWindow: '7-9 PM (family time)',
        openingHook: 'Warm greeting with clear value proposition',
        engagementGoal: 'Family reach and engagement',
      },
    };

    return platforms
      .map((platform) => opportunities[platform])
      .filter((opp) => opp !== undefined);
  };

  const handleGetTrends = async () => {
    if (selectedPlatforms.length === 0 || !niche.trim()) return;

    setState('loading');
    setErrorMessage('');

    const user = getCurrentUser();
    if (!user) {
      setState('error');
      setErrorMessage('Please log in to fetch growth direction.');
      return;
    }

    const result = await fetchDailyTrends(user.id, [niche], selectedPlatforms);

    if (result.error) {
      setState('error');
      setErrorMessage(result.error);
      return;
    }

    if (result.recommendations.length === 0) {
      setState('error');
      setErrorMessage('No content direction available right now. Please try again soon.');
      return;
    }

    setRecommendations(result.recommendations);
    const liveOps = generateLiveOpportunities(selectedPlatforms);
    setLiveOpportunities(liveOps);
    setState('results');
  };

  const handleReset = () => {
    setState('empty');
    setSelectedPlatforms([]);
    setNiche('');
    setRecommendations([]);
    setLiveOpportunities([]);
    setErrorMessage('');
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen" style={{background: 'linear-gradient(135deg, rgba(15, 15, 21, 0.95) 0%, rgba(26, 31, 53, 0.9) 100%)'}}>
      <Sidebar />

      {/* Search Modal Overlay */}
      {showSearch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowSearch(false)} />
          <div className="relative bg-gradient-to-br from-violet-950/40 to-pink-950/40 rounded-2xl border border-violet-500/30 p-8 max-w-md w-full max-h-96 overflow-y-auto" style={{backdropFilter: 'blur(12px)'}}>
            <button onClick={() => setShowSearch(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl">✕</button>
            <h2 className="text-2xl font-bold text-white mb-6">Get Your Daily Direction</h2>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-semibold text-white">Your niche</label>
                <Input
                  placeholder="e.g. Comedy, Tech, Wellness"
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  className="h-12 bg-violet-500/10 border-violet-500/30 text-white placeholder:text-gray-500"
                />
                {niche === '' && (
                  <div className="flex flex-wrap gap-2">
                    {NICHE_SUGGESTIONS.slice(0, 4).map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => setNiche(suggestion)}
                        className="text-xs px-3 py-1 rounded-lg border border-violet-500/30 text-gray-400 hover:text-white hover:border-violet-500/50 transition-all"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-white">Platforms</label>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {PLATFORMS.map((platform) => (
                    <label key={platform} className="flex items-center gap-3 cursor-pointer group">
                      <Checkbox
                        checked={selectedPlatforms.includes(platform)}
                        onCheckedChange={() => handlePlatformToggle(platform)}
                        className="border-white/30 bg-white/10"
                      />
                      <span className="text-white group-hover:text-white/80 transition-colors">
                        {platform}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <Button
                onClick={() => {
                  handleGetTrends();
                  setShowSearch(false);
                }}
                disabled={selectedPlatforms.length === 0 || !niche.trim()}
                className="w-full h-12 bg-gradient-to-r from-violet-600 via-pink-500 to-cyan-500 hover:shadow-xl hover:shadow-violet-500/40 font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Generate Direction
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* PREMIUM HOME DASHBOARD */}
      {state === 'empty' && (
        <main className="flex-1 px-6 md:px-8 py-8 overflow-y-auto max-w-7xl mx-auto">
          <div className="space-y-8">
            {/* Welcome Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white">Welcome back, Alex.</h1>
                <p className="text-gray-400 mt-2">Your AI-powered idea intelligence platform is ready.</p>
              </div>
              <button onClick={() => setShowSearch(true)} className="mt-4 sm:mt-0 px-6 py-2 rounded-lg bg-gradient-to-r from-violet-600 via-pink-500 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-violet-500/30 transition-all">
                + New Direction
              </button>
            </div>

            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Main Cards */}
              <div className="lg:col-span-2 space-y-6">
                {/* Today's Best Ideas - Circular Metric Card */}
                <CircularMetricCard 
                  title="Educational Reels"
                  metric={92}
                  description="Teach your audience something interesting about your niche"
                  platforms={['TikTok', 'Instagram', 'YouTube']}
                />

                {/* Live Opportunities Card */}
                <LiveOpportunitiesCard />

                {/* Top Ideas Grid */}
                <TopIdeasGrid />
              </div>

              {/* Right Column - Activity & Tips */}
              <div className="space-y-6">
                {/* Platform Activity Stats */}
                <PlatformActivityCard />

                {/* Pro Tips Card */}
                <ProTipsCard />

                {/* Notifications Panel */}
                <NotificationsPanel />
              </div>
            </div>
          </div>
        </main>
      )}

      {/* LOADING STATE */}
      {state === 'loading' && (
        <main className="flex-1 flex items-center justify-center px-6">
          <div className="text-center space-y-6 max-w-md">
            <div className="flex justify-center">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 rounded-full border-2 border-white/20 border-t-indigo-600 animate-spin" />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-lg font-semibold text-foreground">
                Checking what matters today…
              </p>
              <p className="text-sm text-foreground/60">
                We're pulling the latest content and live opportunities for you.
              </p>
            </div>
          </div>
        </main>
      )}

      {/* ERROR STATE */}
      {state === 'error' && (
        <main className="flex-1 flex items-center justify-center px-6">
          <div className="text-center space-y-6 max-w-md">
            <div className="space-y-2">
              <p className="text-lg font-semibold text-foreground">
                Something didn't work
              </p>
              <p className="text-sm text-foreground/60">
                {errorMessage}
              </p>
            </div>
            <Button
              onClick={handleReset}
              className="w-full h-12 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:shadow-lg hover:shadow-indigo-500/50"
            >
              Try again
            </Button>
          </div>
        </main>
      )}

      {/* RESULTS STATE */}
      {state === 'results' && (
        <main className="flex-1 px-6 py-8 max-w-6xl mx-auto w-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Today's direction
              </h1>
              <p className="mt-2 text-foreground/60">
                {niche} • {selectedPlatforms.join(', ')}
              </p>
            </div>
            <Button
              onClick={handleReset}
              variant="outline"
              className="border-white/30 text-foreground hover:bg-white/10 bg-transparent"
            >
              New search
            </Button>
          </div>

          {/* SECTION A: Trending Content Direction */}
          <div className="mb-16">
            <h2 className="text-xl font-bold text-foreground mb-6">
              Trending content direction
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recommendations.slice(0, 3).map((rec, index) => (
                <div
                  key={rec.id}
                  className="rounded-2xl border border-white/20 p-6 space-y-4 group hover:border-white/40 transition-all duration-300"
                  style={{
                    background: 'rgba(255, 255, 255, 0.5)',
                    backdropFilter: 'blur(20px)',
                  }}
                >
                  {/* Platform Badge */}
                  <div className="flex items-start justify-between">
                    <span className="inline-flex items-center rounded-lg bg-gradient-to-r from-indigo-600/20 to-cyan-600/20 px-3 py-1 text-sm font-semibold text-indigo-700 dark:text-indigo-300 border border-indigo-500/30">
                      {rec.platform}
                    </span>
                    <span className="text-xs font-medium text-foreground/40">
                      #{index + 1}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-wider font-semibold text-foreground/50">
                        What to post
                      </p>
                      <p className="text-base leading-relaxed text-foreground">
                        {rec.whatToPost}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-wider font-semibold text-foreground/50">
                        Hook direction
                      </p>
                      <p className="text-base leading-relaxed text-foreground">
                        {rec.hookDirection}
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-white/20">
                      <p className="text-xs uppercase tracking-wider font-semibold text-foreground/50">
                        Why it matters
                      </p>
                      <p className="text-sm leading-relaxed text-foreground/80">
                        {rec.whyMatters}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION B: Live & Streaming Opportunities */}
          {liveOpportunities.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-foreground mb-6">
                Live & streaming opportunities
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {liveOpportunities.map((live) => (
                  <div
                    key={live.id}
                    className="rounded-2xl border border-white/20 p-6 space-y-4 group hover:border-white/40 transition-all duration-300"
                    style={{
                      background: 'rgba(255, 255, 255, 0.5)',
                      backdropFilter: 'blur(20px)',
                    }}
                  >
                    {/* Platform Badge */}
                    <span className="inline-flex items-center rounded-lg bg-gradient-to-r from-purple-600/20 to-pink-600/20 px-3 py-1 text-sm font-semibold text-purple-700 dark:text-purple-300 border border-purple-500/30">
                      {live.platform}
                    </span>

                    {/* Content */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <p className="text-xs uppercase tracking-wider font-semibold text-foreground/50">
                          Stream idea
                        </p>
                        <p className="text-base leading-relaxed text-foreground">
                          {live.streamIdea}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-xs uppercase tracking-wider font-semibold text-foreground/50">
                          Best time to go live
                        </p>
                        <p className="text-base leading-relaxed text-foreground">
                          {live.bestTimeWindow}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-xs uppercase tracking-wider font-semibold text-foreground/50">
                          Opening hook
                        </p>
                        <p className="text-base leading-relaxed text-foreground">
                          {live.openingHook}
                        </p>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-white/20">
                        <p className="text-xs uppercase tracking-wider font-semibold text-foreground/50">
                          Engagement goal
                        </p>
                        <p className="text-sm leading-relaxed text-foreground/80">
                          {live.engagementGoal}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      )}
    </div>
  );
}
