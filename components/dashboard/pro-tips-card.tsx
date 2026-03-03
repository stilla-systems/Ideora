'use client';

import Image from 'next/image';

interface ProTip {
  title: string;
  description: string;
  action: string;
}

export function ProTipsCard() {
  const tips: ProTip[] = [
    {
      title: 'Reels are seeing a 92% surge in engagement today!',
      description: 'Time to grab attention! Check the Idea Library for trendy reels topics, and aim to post between 5PM - 7PM',
      action: 'View Library'
    },
    {
      title: 'Live streams peak at 8:00 PM',
      description: 'Your audience is most active in the evening. Schedule your next live stream to maximize engagement.',
      action: 'Schedule Live'
    },
    {
      title: 'Trending hashtags this week',
      description: 'Stay ahead with the latest trending hashtags and keywords for maximum visibility.',
      action: 'Explore Trends'
    }
  ];

  return (
    <div
      className="rounded-2xl p-8 relative group"
      style={{
        background: 'linear-gradient(135deg, rgba(167, 139, 250, 0.15) 0%, rgba(139, 92, 246, 0.1) 100%)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(167, 139, 250, 0.3)',
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Ideora Pro Tips</h3>
        <a href="#" className="text-sm text-violet-400 hover:text-violet-300 font-semibold">
          View all →
        </a>
      </div>

      <div className="space-y-4">
        {tips.map((tip, idx) => (
          <div 
            key={idx}
            className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
          >
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Image 
                  src="/ideora-icon.png" 
                  alt="Ideora" 
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full"
                />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-white text-sm mb-1">
                  {tip.title}
                </h4>
                <p className="text-xs text-gray-400 mb-3 line-clamp-2">
                  {tip.description}
                </p>
                <button className="text-xs px-3 py-1 rounded-lg bg-violet-600/30 text-violet-300 border border-violet-500/30 hover:bg-violet-600/50 transition-all font-semibold">
                  {tip.action}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
