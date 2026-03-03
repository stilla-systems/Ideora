'use client';

interface Notification {
  id: string;
  title: string;
  description: string;
  icon: string;
  timestamp: string;
  type: 'trending' | 'opportunity' | 'alert';
}

export function NotificationsPanel() {
  const notifications: Notification[] = [
    {
      id: '1',
      title: 'Your Reel "Mindset Hacks for Creators" is trending',
      description: 'Your Reel "Mindset Hacks for Creators" is trending with +35.1K likes. Keep the momentum going!',
      icon: '🎵',
      timestamp: 'Now',
      type: 'trending'
    },
    {
      id: '2',
      title: 'Live Opportunity: Peak Hours Today',
      description: 'Your audience is most active between 6-9 PM today. Schedule your live stream now!',
      icon: '🔴',
      timestamp: '2 hours ago',
      type: 'opportunity'
    },
    {
      id: '3',
      title: 'New Trend Alert',
      description: 'Educational content about productivity is trending in your niche. Create content around this.',
      icon: '⚡',
      timestamp: '5 hours ago',
      type: 'alert'
    }
  ];

  return (
    <div
      className="rounded-2xl p-6 h-full"
      style={{
        background: 'linear-gradient(135deg, rgba(167, 139, 250, 0.1) 0%, rgba(236, 72, 153, 0.08) 100%)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(167, 139, 250, 0.2)',
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Notifications</h3>
        <a href="#" className="text-xs text-violet-400 hover:text-violet-300">
          View all →
        </a>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer group"
          >
            <div className="flex gap-3">
              <div className="flex-shrink-0 text-xl mt-1">
                {notif.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-white text-sm group-hover:text-violet-300 transition-colors">
                  {notif.title}
                </h4>
                <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                  {notif.description}
                </p>
                <div className="text-xs text-gray-500 mt-2">
                  {notif.timestamp}
                </div>
              </div>
              {notif.type === 'trending' && (
                <div className="flex-shrink-0 text-xs bg-pink-500/20 text-pink-300 px-2 py-1 rounded-full border border-pink-500/30 font-semibold">
                  Trending
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
