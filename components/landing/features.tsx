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
    <section id="features" className="relative w-full px-4 sm:px-6 py-16 sm:py-24 md:py-32">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-12 sm:mb-16 md:mb-24 text-center space-y-3 sm:space-y-4">
          <h2 className="text-balance text-3xl sm:text-4xl font-bold md:text-5xl px-2 sm:px-0">
            Keys to Creative Growth.
          </h2>
          <p className="text-base sm:text-lg text-foreground/70">
            Here's what to focus on today.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="group relative rounded-lg sm:rounded-xl p-4 sm:p-6 transition-all duration-300 hover:translate-y--1.5 hover:shadow-lg"
              style={{
                background: 'rgba(167, 139, 250, 0.08)',
                backdropFilter: 'blur(10px)',
                border: `1px solid rgba(167, 139, 250, 0.25)`,
              }}
            >
              {/* Subtle radial glow overlay on hover */}
              <div 
                className="absolute inset-0 rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-xl -inset-2 -z-10"
                style={{
                  background: `radial-gradient(ellipse 80% 40% at 50% 20%, ${feature.glowColor}20 0%, transparent 70%)`,
                }}
              />

              <div className="relative z-10 space-y-3 sm:space-y-4">
                {/* Icon and title with precise alignment */}
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="text-2.5xl sm:text-3xl flex-shrink-0 mt-0.5">{feature.icon}</div>
                  <h3 className="text-base sm:text-lg font-semibold text-white flex-1 pt-0.5">
                    {feature.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {feature.description}
                </p>

                {/* Three dots menu with hover effect */}
                <div className="absolute top-4 sm:top-6 right-4 sm:right-6 text-gray-500 text-lg cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:text-gray-300">•••</div>
              </div>
            </div>
          ))}
        </div>

        {/* Social platform icons row */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
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
