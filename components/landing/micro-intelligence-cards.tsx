import React from 'react';
import { TrendingUp, Gauge, Zap, FileText, Target } from 'lucide-react';

/**
 * IDEORA MICRO INTELLIGENCE CARDS SYSTEM
 * Premium floating card system for "Not Just Ideas. Direction" redesign
 * 
 * Design Specifications:
 * - Border Radius: 14px
 * - Glass effect with backdrop blur
 * - Subtle Electric Cyan border glow
 * - Micro data indicators and icons
 * - Hover elevation effect
 */

interface MicroCardProps {
  icon: React.ReactNode;
  title: string;
  metric: string;
  description: string;
  gradient: 'cyan' | 'blue' | 'violet' | 'orange' | 'green';
}

const MicroIntelligenceCard: React.FC<MicroCardProps> = ({
  icon,
  title,
  metric,
  description,
  gradient,
}) => {
  const gradientClasses = {
    cyan: 'from-cyan-500/20 to-cyan-500/5 border-cyan-400/30 hover:border-cyan-400/60',
    blue: 'from-blue-500/20 to-blue-500/5 border-blue-400/30 hover:border-blue-400/60',
    violet: 'from-violet-500/20 to-violet-500/5 border-violet-400/30 hover:border-violet-400/60',
    orange: 'from-orange-500/20 to-orange-500/5 border-orange-400/30 hover:border-orange-400/60',
    green: 'from-green-500/20 to-green-500/5 border-green-400/30 hover:border-green-400/60',
  };

  const accentClasses = {
    cyan: 'text-cyan-400 shadow-cyan-500/20',
    blue: 'text-blue-400 shadow-blue-500/20',
    violet: 'text-violet-400 shadow-violet-500/20',
    orange: 'text-orange-400 shadow-orange-500/20',
    green: 'text-green-400 shadow-green-500/20',
  };

  return (
    <div
      className={`
        relative group
        bg-gradient-to-br ${gradientClasses[gradient]}
        backdrop-blur-md border rounded-3.5
        px-6 py-5 min-h-[140px] max-w-[300px]
        transition-all duration-300 ease-out
        hover:shadow-lg hover:shadow-${gradient}-500/30
        transform hover:-translate-y-1
        cursor-pointer overflow-hidden
      `}
    >
      {/* Subtle background glow effect */}
      <div
        className={`
          absolute inset-0 opacity-0 group-hover:opacity-100
          transition-opacity duration-300
          bg-gradient-to-br ${gradientClasses[gradient]}
          blur-xl -z-10
        `}
      />

      {/* Content container */}
      <div className="relative z-10 space-y-3">
        {/* Header: Icon + Title */}
        <div className="flex items-start justify-between">
          <div className={`${accentClasses[gradient]} transition-transform duration-300 group-hover:scale-110`}>
            {icon}
          </div>
          <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">
            AI
          </div>
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold text-white leading-tight">
          {title}
        </h3>

        {/* Metric Display */}
        <div className={`${accentClasses[gradient]} font-bold text-base`}>
          {metric}
        </div>

        {/* Description */}
        <p className="text-xs text-slate-300/80 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Micro data indicator bar (optional) */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};

/**
 * MICRO INTELLIGENCE CARDS GRID SECTION
 * Replaces the "Not Just Ideas. Direction" section
 */
export const MicroIntelligenceCardsSection: React.FC = () => {
  const cards: MicroCardProps[] = [
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: 'Trend Intelligence',
      metric: '+24% week-over-week',
      description: 'Spot emerging trends before competition',
      gradient: 'cyan',
    },
    {
      icon: <Gauge className="w-5 h-5" />,
      title: 'Momentum Tracking',
      metric: 'Velocity: 8.2/10',
      description: 'Track content velocity and growth acceleration',
      gradient: 'blue',
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: 'Virality Scoring',
      metric: 'Virality: 78%',
      description: 'AI-powered viral potential analysis',
      gradient: 'violet',
    },
    {
      icon: <FileText className="w-5 h-5" />,
      title: 'Content Blueprint',
      metric: '3 templates matched',
      description: 'AI-generated content structure recommendations',
      gradient: 'orange',
    },
    {
      icon: <Target className="w-5 h-5" />,
      title: 'Strategic Angle AI',
      metric: '5 angles discovered',
      description: 'Uncover unique content angles and positioning',
      gradient: 'green',
    },
  ];

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Section background layer */}
      <div
        className="absolute inset-0 -z-10 opacity-30"
        style={{
          backgroundImage: 'url(/bg-neural-mesh.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-pretty">
            Not Just Ideas. Direction.
          </h2>
          <p className="text-lg text-slate-300/90 max-w-2xl mx-auto">
            Advanced AI intelligence engines working together to transform raw content potential into strategic clarity
          </p>
        </div>

        {/* Micro Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-5 justify-items-center">
          {cards.map((card, index) => (
            <MicroIntelligenceCard
              key={index}
              {...card}
            />
          ))}
        </div>

        {/* Optional: Call-to-action below cards */}
        <div className="mt-12 text-center">
          <button className="px-8 py-3 rounded-full bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 font-medium hover:bg-cyan-500/30 hover:border-cyan-400/80 transition-all duration-300">
            Explore All Intelligence Features
          </button>
        </div>
      </div>
    </section>
  );
};

export default MicroIntelligenceCardsSection;
