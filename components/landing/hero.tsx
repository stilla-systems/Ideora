import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative w-full flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 min-h-screen md:min-h-auto">
      {/* Premium video and gradient background */}
      <div className="absolute inset-0 -z-10">
        {/* Hero Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(135deg, rgba(15, 15, 21, 0.85) 0%, rgba(26, 31, 53, 0.8) 50%, rgba(15, 15, 21, 0.85) 100%)',
        }} />
        
        {/* Premium gradient orbs synchronized with video */}
        <div className="absolute top-20 left-1/3 w-80 h-80 rounded-full bg-gradient-to-r from-violet-500/15 via-purple-500/8 to-transparent blur-3xl" />
        <div className="absolute bottom-40 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-cyan-500/15 to-violet-500/8 blur-3xl" />
        
        {/* Elite accent glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto">
        {/* Premium Logo Section */}
        <div className="flex justify-center mb-8 sm:mb-10 md:mb-12">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-pink-500 to-cyan-500 rounded-2xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
            <Image 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/file_000000008ac871f59ede0f812917b6ce-8XEVvquPGbljY0q6kyKqAOz12XiklF.png"
              alt="Ideora Logo"
              width={120}
              height={120}
              priority
              className="relative h-20 sm:h-24 md:h-32 w-auto transition-transform duration-500 group-hover:scale-110 drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Subheading badge */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div 
            className="inline-flex items-center gap-2 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-center"
            style={{
              background: 'rgba(167, 139, 250, 0.12)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(167, 139, 250, 0.25)',
            }}
          >
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan-400 flex-shrink-0" />
            <span className="text-xs font-medium text-violet-300 whitespace-nowrap">
              AI Content Intelligence Platform
            </span>
          </div>
        </div>

        {/* Main headline with premium gradient */}
        <div className="relative mb-4 sm:mb-6">
          {/* Elite glow effect behind headline */}
          <div className="absolute -inset-8 sm:-inset-12 md:-inset-16 blur-3xl opacity-30 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(167, 139, 250, 0.3) 0%, rgba(6, 214, 255, 0.15) 40%, transparent 70%)',
            }}
          />
          <h1 className="relative text-balance text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-center leading-tight px-0 sm:px-2 bg-gradient-to-r from-white via-violet-100 to-cyan-100 bg-clip-text text-transparent">
            Turn Ideas Into Impact.
          </h1>
        </div>

        {/* Subheadline */}
        <p className="text-balance text-base sm:text-lg md:text-xl text-gray-300 text-center max-w-2xl mx-auto mb-8 sm:mb-10 md:mb-12 px-2 sm:px-0">
          AI-powered content intelligence for creators who want clarity, structure, and predictable growth.
        </p>

        {/* Elite CTA Buttons with premium effects */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full">
          <Link href="/auth/signup" className="w-full sm:w-auto group" aria-label="Start free trial">
            <Button 
              size="lg" 
              className="relative w-full sm:w-auto bg-gradient-to-r from-violet-600 via-pink-500 to-cyan-500 text-white hover:shadow-2xl px-6 sm:px-10 h-11 sm:h-13 font-semibold transition-all duration-300 text-sm sm:text-base disabled:opacity-50 group-hover:-translate-y-1 group-hover:shadow-violet-500/50 overflow-hidden"
              aria-label="Sign up for free trial"
            >
              <span className="relative z-10">Start Free Trial</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          </Link>
          <Link href="#features" className="w-full sm:w-auto group" aria-label="Scroll to features">
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:border-cyan-400 px-6 sm:px-10 h-11 sm:h-13 font-semibold transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-1 group-hover:shadow-cyan-500/20 text-sm sm:text-base"
              aria-label="Learn more about Ideora features"
            >
              <span className="hidden sm:inline">Explore the Intelligence Engine</span>
              <span className="sm:hidden">Learn More</span>
              <ArrowRight className="ml-2 w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1.5 transition-all duration-300 ease-out" aria-hidden="true" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
