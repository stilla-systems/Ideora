'use client';

interface ActivityMetric {
  label: string;
  value: string;
  change: string;
  color: string;
  chart: string;
}

export function PlatformActivityCard() {
  const metrics: ActivityMetric[] = [
    { label: 'Audiences', value: '+78%', change: 'Sun, 26, 11:00ex', color: 'from-green-400 to-cyan-400', chart: '📈' },
    { label: 'Live Folders', value: '+61%', change: 'San, 28, 10:00ex', color: 'from-green-500 to-emerald-400', chart: '📊' },
    { label: 'Yeads', value: '+45K', change: 'San, 24, 11:00ex', color: 'from-teal-400 to-green-400', chart: '📉' },
    { label: '4. Pending', value: '+8.2K', change: 'San, 24, 15:40ex', color: 'from-cyan-400 to-blue-400', chart: '📈' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Platform Activity</h3>
        <div className="flex gap-2">
          <button className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
            📊
          </button>
          <button className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
            ⚙️
          </button>
          <button className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
            ⋮
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {metrics.map((metric, idx) => (
          <div
            key={idx}
            className="rounded-xl p-4"
            style={{
              background: 'rgba(167, 139, 250, 0.08)',
              border: '1px solid rgba(167, 139, 250, 0.2)',
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-xs text-gray-400">{metric.label}</div>
                <div className="text-lg font-bold text-white mt-1">{metric.value}</div>
              </div>
              <div className="text-sm text-gray-400">{metric.chart}</div>
            </div>

            {/* Mini chart representation */}
            <div className="h-8 bg-white/5 rounded-lg relative overflow-hidden border border-white/10">
              <div 
                className={`h-full w-full bg-gradient-to-r ${metric.color} opacity-20 rounded-lg`}
                style={{width: `${60 + idx * 5}%`}}
              />
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                <polyline
                  points="0,6 20,4 40,5 60,3 80,4 100,2"
                  fill="none"
                  stroke={metric.color === 'from-green-400 to-cyan-400' ? '#4ade80' : '#06d6ff'}
                  strokeWidth="1"
                  opacity="0.6"
                />
              </svg>
            </div>

            <div className="text-xs text-gray-500 mt-2">{metric.change}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
