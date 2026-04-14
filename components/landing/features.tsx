export function FeaturesSection() {
  const features = [
    {
      id: 'idea-finder',
      icon: '💡',
      title: 'Idea Finder',
      description: 'Spot creative ideas that resonate to your niche',
      borderColor: 'from-violet-500 to-pink-500',
      glowColor: '#a78bfa',
    },
    {
      id: 'live-insights',
      icon: '🔥',
      title: 'Live Insights',
      description: 'Find the optimal times to go live and engage',
      borderColor: 'from-pink-500 to-orange-500',
      glowColor: '#f472b6',
    },
    {
      id: 'analytics',
      icon: '📊',
      title: 'Analytics',
      description: 'Track your engagement and predict growth outcomes',
      borderColor: 'from-cyan-500 to-blue-500',
      glowColor: '#06d6ff',
    },
  ];

  return (
    <section id="features" className="relative px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 md:mb-24 text-center space-y-4">
          <h2 className="text-balance text-4xl font-bold md:text-5xl">
            Keys to Creative Growth.
          </h2>
          <p className="text-lg text-foreground/70">
            Here's what to focus on today.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="group relative rounded-xl p-6 transition-all duration-300 hover:scale-105"
              style={{
                background: 'rgba(167, 139, 250, 0.08)',
                backdropFilter: 'blur(10px)',
                border: `2px solid rgba(167, 139, 250, 0.3)`,
              }}
            >
              {/* Neon glow border on hover */}
              <div 
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -inset-0.5 blur-lg -z-10"
                style={{
                  background: `linear-gradient(135deg, ${feature.glowColor}40 0%, transparent 100%)`,
                }}
              />

              <div className="relative z-10">
                {/* Icon and title */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-3xl">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-white flex-1">
                    {feature.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-300 leading-relaxed">
                  {feature.description}
                </p>

                {/* Three dots menu */}
                <div className="absolute top-6 right-6 text-gray-500 text-xl cursor-pointer">•••</div>
              </div>
            </div>
          ))}
        </div>

        {/* Social platform icons row */}
        <div className="flex justify-center gap-6 md:gap-8 mb-12">
          {['TikTok', 'YouTube', 'X', 'Threads', 'Instagram', 'Facebook'].map((platform, idx) => (
            <div key={platform} className="w-10 h-10 rounded-full bg-gray-500/20 flex items-center justify-center text-gray-400 hover:bg-gray-500/30 transition-colors cursor-pointer">
              {['🎵', '📹', '𝕏', '💬', '📷', 'f'][idx]}
            </div>
          ))}
        </div>

        {/* Bottom text */}
        <div className="text-center text-sm text-gray-400 mb-8">
          🔒 Align your growth strategy across the platforms that matter most.
        </div>

        <div className="mt-16 text-center">
          <p className="text-foreground/60 max-w-3xl mx-auto text-base">
            Daily content direction and live streaming opportunities designed for creators who want clarity, not complexity.
          </p>
        </div>
      </div>
    </section>
  );
}
