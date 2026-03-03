interface StatCardProps {
  title: string;
  value: string | number;
  change: number;
  changeType: 'up' | 'down' | 'neutral';
  icon: string;
}

export function StatCard({ title, value, change, changeType, icon }: StatCardProps) {
  const changeColor =
    changeType === 'up'
      ? 'text-green-600 dark:text-green-400'
      : changeType === 'down'
        ? 'text-red-600 dark:text-red-400'
        : 'text-blue-600 dark:text-blue-400';

  return (
    <div 
      className="p-6 rounded-2xl shadow-lg transition-all duration-300 border border-white/30 dark:border-white/10"
      style={{
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(10px) saturate(200%)',
      }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-foreground/60">{title}</p>
          <p className="mt-2 text-3xl font-bold">{value}</p>
          <p className={`mt-1 text-sm font-semibold ${changeColor}`}>
            {change > 0 ? '+' : ''}{change}% this week
          </p>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  );
}
