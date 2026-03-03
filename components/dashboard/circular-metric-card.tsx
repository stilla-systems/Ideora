'use client';

interface CircularMetricCardProps {
  title: string;
  metric: number;
  description: string;
  platforms: string[];
  ideaId?: string;
}

export function CircularMetricCard({ 
  title, 
  metric, 
  description, 
  platforms 
}: CircularMetricCardProps) {
  return (
    <div
      className="rounded-2xl p-8 relative group"
      style={{
        background: 'linear-gradient(135deg, rgba(167, 139, 250, 0.15) 0%, rgba(236, 72, 153, 0.1) 100%)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(167, 139, 250, 0.3)',
      }}
    >
      {/* Three dots menu */}
      <div className="absolute top-6 right-6 text-gray-500 text-xl cursor-pointer group-hover:text-gray-300">•••</div>

      <div className="flex flex-col gap-6">
        {/* Circular metric with gradient */}
        <div className="flex justify-center">
          <div className="relative w-40 h-40">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="rgba(167, 139, 250, 0.2)"
                strokeWidth="4"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="url(#metricGradient)"
                strokeWidth="4"
                strokeDasharray={`${(metric / 100) * 440} 440`}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="metricGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a78bfa" />
                  <stop offset="50%" stopColor="#f472b6" />
                  <stop offset="100%" stopColor="#06d6ff" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold text-white">{metric}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="text-center space-y-2">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <p className="text-sm text-gray-400">{description}</p>
        </div>

        {/* Platform icons */}
        <div className="flex justify-center gap-3">
          {platforms.map((platform) => (
            <div 
              key={platform}
              className="w-10 h-10 rounded-full bg-gray-500/20 flex items-center justify-center text-gray-300 hover:bg-gray-500/30 transition-colors cursor-pointer"
            >
              {['🎵', '📹', '𝕏', '💬', '📷'][platforms.indexOf(platform)] || '•'}
            </div>
          ))}
        </div>

        {/* Generate button */}
        <button className="w-full py-2 rounded-lg bg-gradient-to-r from-violet-600 via-pink-500 to-cyan-500 text-white text-sm font-semibold hover:shadow-lg hover:shadow-violet-500/30 transition-all">
          Generate Topics
        </button>
      </div>
    </div>
  );
}
