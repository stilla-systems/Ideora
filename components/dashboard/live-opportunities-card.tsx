'use client';

interface LiveOpportunity {
  platform: string;
  time: string;
  duration: string;
  trend: string;
  icon: string;
}

interface LiveOpportunitiesCardProps {
  opportunities?: LiveOpportunity[];
}

export function LiveOpportunitiesCard({ opportunities }: LiveOpportunitiesCardProps) {
  const defaultOpportunities: LiveOpportunity[] = [
    { platform: 'TikTok', time: '9:00 PM', duration: '11:30pm', trend: 'Educational Reels', icon: '🎵' },
    { platform: 'YouTube', time: '10:00 AM', duration: '12:00pm', trend: 'Live Gaming', icon: '📹' },
    { platform: 'Instagram', time: '8:30 PM', duration: '10:00pm', trend: 'Story Time', icon: '📷' },
  ];

  const data = opportunities || defaultOpportunities;

  return (
    <div
      className="rounded-2xl p-8 relative group"
      style={{
        background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.15) 0%, rgba(248, 113, 113, 0.1) 100%)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(236, 72, 153, 0.3)',
      }}
    >
      <div className="absolute top-6 right-6 text-gray-500 text-xl cursor-pointer group-hover:text-gray-300">•••</div>

      <h3 className="text-xl font-semibold text-white mb-6">Live Opportunities</h3>

      <div className="space-y-4">
        {data.map((opp, idx) => (
          <div key={idx} className="p-3 rounded-lg bg-white/5 border border-white/10">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="text-sm font-semibold text-white">{opp.platform}</div>
                <div className="text-2xl font-bold text-white mt-1">{opp.time}</div>
              </div>
              <span className="text-xs text-gray-400">{opp.duration}</span>
            </div>
            <div className="text-xs text-gray-400 flex items-center gap-1">
              <span>🔥</span> {opp.trend}
            </div>
          </div>
        ))}
      </div>

      {/* Data Trends section */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <div className="text-sm font-semibold text-white mb-3">Data Trends</div>
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between text-gray-400">
            <span>🌟 Hits trending in Incense</span>
            <span className="text-orange-400">+15%</span>
          </div>
          <div className="flex items-center justify-between text-gray-400">
            <span>💬 Tweet ratio 216 logs</span>
            <span className="text-cyan-400">+8%</span>
          </div>
          <div className="flex items-center justify-between text-gray-400">
            <span>📊 Search 6.5Iniles</span>
            <span className="text-pink-400">+22%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
