'use client';

interface TopIdea {
  id: string;
  title: string;
  views: number;
  likes: number;
  shares: number;
  timeAgo: string;
  engagement: number;
  trend: boolean;
  thumbnail?: string;
}

interface TopIdeasGridProps {
  ideas?: TopIdea[];
}

export function TopIdeasGrid({ ideas }: TopIdeasGridProps) {
  const defaultIdeas: TopIdea[] = [
    {
      id: '1',
      title: '3 Passive Income Streams for 2024',
      views: 150500,
      likes: 1200,
      shares: 150900,
      timeAgo: '2h ago',
      engagement: 92,
      trend: true,
      thumbnail: '📚'
    },
    {
      id: '2',
      title: '10 Trends to Watch in 2024',
      views: 331400,
      likes: 400022,
      shares: 1500,
      timeAgo: '1d ago',
      engagement: 85,
      trend: false,
      thumbnail: '✨'
    },
    {
      id: '3',
      title: 'Fitness Tips for Beginners',
      views: 150900,
      likes: 450020,
      shares: 1500,
      timeAgo: '4d ago',
      engagement: 75,
      trend: false,
      thumbnail: '💪'
    },
    {
      id: '4',
      title: 'Fitness Tips for Beginners',
      views: 925100,
      likes: 821700,
      shares: 30500,
      timeAgo: '4d ago',
      engagement: 88,
      trend: false,
      thumbnail: '🏋️'
    }
  ];

  const data = ideas || defaultIdeas;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">Top Ideas</h3>
        <div className="flex gap-2">
          <button className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-gray-400">
            📋
          </button>
          <button className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-gray-400">
            🔄
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {data.map((idea) => (
          <div
            key={idea.id}
            className="rounded-xl overflow-hidden group cursor-pointer transition-all hover:scale-105"
            style={{
              background: 'rgba(167, 139, 250, 0.08)',
              border: '1px solid rgba(167, 139, 250, 0.2)',
            }}
          >
            {/* Thumbnail area */}
            <div className="relative h-32 bg-gradient-to-br from-violet-500/20 to-pink-500/20 flex items-center justify-center group-hover:from-violet-500/30 group-hover:to-pink-500/30 transition-all">
              <div className="text-4xl">{idea.thumbnail}</div>
              {idea.trend && (
                <div className="absolute top-2 left-2 bg-orange-500/80 text-white text-xs px-2 py-1 rounded-full font-semibold">
                  Trending
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <h4 className="font-semibold text-white text-sm line-clamp-2 mb-3">
                {idea.title}
              </h4>

              <div className="space-y-2 text-xs text-gray-400 mb-3">
                <div className="flex items-center justify-between">
                  <span>👀 {idea.views.toLocaleString()} views</span>
                  <span className="text-pink-400">+{idea.engagement}%</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>❤️ {(idea.likes / 1000).toFixed(1)}K</span>
                  <span>💬 {(idea.shares / 1000).toFixed(1)}K</span>
                </div>
                <div className="text-gray-500">{idea.timeAgo}</div>
              </div>

              <button className="w-full py-1.5 rounded-lg bg-gradient-to-r from-violet-600/30 to-pink-600/30 text-white text-xs font-semibold border border-violet-500/30 hover:border-violet-500/50 transition-all">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
