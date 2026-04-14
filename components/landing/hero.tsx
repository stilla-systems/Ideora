import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-20 md:py-0">
      {/* Cosmic background with particles effect */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute left-1/4 top-20 h-96 w-96 rounded-full bg-gradient-to-r from-violet-500/20 via-pink-500/15 to-transparent blur-3xl" />
        <div className="absolute right-1/4 bottom-20 h-96 w-96 rounded-full bg-gradient-to-r from-cyan-500/20 to-violet-500/15 blur-3xl" />
        {/* Particle dots */}
        <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(2px 2px at 20px 30px, rgba(167, 139, 250, 0.5), rgba(0, 0, 0, 0))', backgroundSize: '200px 200px'}} />
      </div>

      <div className="grid max-w-6xl gap-12 lg:grid-cols-2 items-center">
        {/* Left content */}
        <div className="flex flex-col gap-8">
          <div 
            className="inline-block rounded-full px-4 py-2 w-fit"
            style={{
              background: 'rgba(167, 139, 250, 0.15)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(167, 139, 250, 0.3)',
            }}
          >
            <span className="text-sm font-semibold text-violet-300">
              Real-Time Growth Direction
            </span>
          </div>

          <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl leading-tight text-white">
            Turn Ideas Into Impact.
          </h1>

          <p className="text-balance text-lg text-gray-300">
            Content and live growth direction for creators who want clarity, structure, and growth.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link href="/auth/signup">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-violet-600 via-pink-500 to-cyan-500 hover:shadow-xl hover:shadow-violet-500/50 text-white px-8 font-semibold transition-all"
              >
                Start Free Trial
              </Button>
            </Link>
            <Link href="#features">
              <Button 
                size="lg" 
                variant="outline" 
                className="px-8 font-semibold"
                style={{
                  background: 'rgba(167, 139, 250, 0.15)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(167, 139, 250, 0.3)',
                  color: '#f0f1f5',
                }}
              >
                See How It Works →
              </Button>
            </Link>
          </div>
        </div>

        {/* Right - Lightbulb illustration */}
        <div className="relative h-96 md:h-full flex items-center justify-center">
          <div className="relative w-64 h-96 md:w-80 md:h-96">
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-violet-500/30 via-pink-500/20 to-transparent blur-3xl" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-t from-cyan-500/30 to-transparent blur-3xl" />
            
            {/* Lightbulb SVG */}
            <svg 
              className="w-full h-full drop-shadow-2xl"
              viewBox="0 0 300 400" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Bulb with gradient layers */}
              <defs>
                <linearGradient id="bulbGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor: '#c084fc', stopOpacity: 1}} />
                  <stop offset="25%" style={{stopColor: '#ec4899', stopOpacity: 1}} />
                  <stop offset="50%" style={{stopColor: '#f97316', stopOpacity: 1}} />
                  <stop offset="75%" style={{stopColor: '#fbbf24', stopOpacity: 1}} />
                  <stop offset="100%" style={{stopColor: '#06d6ff', stopOpacity: 1}} />
                </linearGradient>
              </defs>
              
              {/* Main bulb shape with flowing effect */}
              <path d="M150 40 Q200 80 200 140 Q200 180 180 200 L120 200 Q100 180 100 140 Q100 80 150 40" fill="url(#bulbGradient)" opacity="0.9" />
              <path d="M160 50 Q190 85 190 135 Q190 170 175 190 L125 190 Q110 170 110 135 Q110 85 160 50" fill="url(#bulbGradient)" opacity="0.6" />
              <path d="M170 65 Q180 90 180 130 Q180 160 170 180 L130 180 Q120 160 120 130 Q120 90 170 65" fill="url(#bulbGradient)" opacity="0.3" />
              
              {/* Center glow */}
              <circle cx="150" cy="120" r="15" fill="#ffffff" opacity="0.8" />
              <circle cx="150" cy="120" r="20" fill="#fbbf24" opacity="0.4" />
              
              {/* Base */}
              <rect x="130" y="200" width="40" height="15" fill="#1e293b" />
              <rect x="125" y="215" width="50" height="12" fill="#0f172a" />
              <circle cx="150" cy="230" r="22" fill="#1e293b" />
              <circle cx="150" cy="230" r="18" fill="#0f172a" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
