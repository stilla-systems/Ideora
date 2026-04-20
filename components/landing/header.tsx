'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show logo after scrolling past hero section (approximately 800px or 50vh)
      const heroHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
      setShowLogo(window.scrollY > heroHeight * 0.7);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className="sticky top-0 z-50 border-b backdrop-blur-xl transition-all duration-300"
      style={{
        background: 'linear-gradient(180deg, rgba(15, 15, 21, 0.8) 0%, rgba(26, 31, 53, 0.6) 100%)',
        borderColor: 'rgba(167, 139, 250, 0.15)',
      }}
    >
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-2.5 sm:py-3 md:py-4 lg:px-6">
        {/* Elite Logo Section - Scroll-triggered visibility */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className={`relative flex items-center justify-center transition-all duration-500 ${showLogo ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
            {/* Logo glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-pink-500 to-cyan-500 rounded-xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
            {/* Icon Logo */}
            <Image
              src="/ideora-logo.png"
              alt="Ideora"
              width={40}
              height={40}
              priority
              className="relative h-8 sm:h-9 md:h-10 w-auto transition-transform duration-300 group-hover:scale-110 drop-shadow-lg"
            />
          </div>
          {/* Brand name - also scroll-triggered */}
          <span className={`font-bold text-lg sm:text-xl bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent hidden sm:inline transition-all duration-500 ${showLogo ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            Ideora
          </span>
        </Link>

        {/* Desktop Navigation - Enhanced */}
        <div className="hidden items-center gap-6 md:gap-8 md:flex">
          <div className="flex items-center gap-6 md:gap-8">
            <Link 
              href="#features" 
              className="relative text-sm font-medium text-gray-300 hover:text-white transition-colors after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-violet-500 after:via-pink-500 after:to-cyan-500 after:transition-all after:duration-300 hover:after:w-full"
            >
              Intelligence
            </Link>
            <Link 
              href="#pricing" 
              className="relative text-sm font-medium text-gray-300 hover:text-white transition-colors after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-violet-500 after:via-pink-500 after:to-cyan-500 after:transition-all after:duration-300 hover:after:w-full"
            >
              Pricing
            </Link>
            <Link 
              href="/auth/login" 
              className="relative text-sm font-medium text-gray-300 hover:text-white transition-colors after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-violet-500 after:via-pink-500 after:to-cyan-500 after:transition-all after:duration-300 hover:after:w-full"
            >
              Login
            </Link>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link 
              href="/auth/signup"
              aria-label="Start free trial"
            >
              <Button 
                size="sm"
                className="bg-gradient-to-r from-violet-600 via-pink-500 to-cyan-500 hover:shadow-2xl hover:shadow-violet-500/50 text-white font-medium px-6 transition-all duration-300"
                aria-label="Sign up for free trial"
              >
                Start Free Trial
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-1.5 hover:bg-foreground/10 rounded-lg transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>

        {/* Mobile menu */}
        {isOpen && (
          <div 
            className="absolute left-0 right-0 top-full border-b p-3 sm:p-4 md:hidden backdrop-blur-xl"
            style={{
              background: 'linear-gradient(180deg, rgba(15, 15, 21, 0.95) 0%, rgba(26, 31, 53, 0.9) 100%)',
              borderColor: 'rgba(167, 139, 250, 0.15)',
            }}
          >
            <div className="flex flex-col gap-3 sm:gap-4">
              <Link 
                href="#features" 
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Intelligence
              </Link>
              <Link 
                href="#pricing" 
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </Link>
              <div className="h-px bg-gray-700/30" />
              <Link href="/auth/login" className="block">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/10"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup" className="block">
                <Button 
                  className="w-full bg-white text-black hover:bg-gray-100 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Start Free Trial
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
