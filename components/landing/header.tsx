'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header 
      className="sticky top-0 z-50 border-b backdrop-blur-xl transition-all duration-300"
      style={{
        background: 'linear-gradient(180deg, rgba(15, 15, 21, 0.8) 0%, rgba(26, 31, 53, 0.6) 100%)',
        borderColor: 'rgba(167, 139, 250, 0.15)',
      }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:py-4">
        {/* Logo Section - Enhanced */}
        <Link href="/" className="flex items-center gap-2 md:gap-3 group shrink-0">
          <div className="relative flex items-center gap-0">
            {/* Full Logo with Text */}
            <Image 
              src="/ideora-logo.png" 
              alt="Ideora" 
              width={160}
              height={40}
              priority
              className="h-8 md:h-10 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>

        {/* Desktop Navigation - Enhanced */}
        <div className="hidden items-center gap-6 md:gap-8 md:flex">
          <div className="flex items-center gap-6 md:gap-8">
            <Link 
              href="#features" 
              className="relative text-sm font-medium text-gray-300 hover:text-white transition-colors after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-violet-500 after:via-pink-500 after:to-cyan-500 after:transition-all after:duration-300 hover:after:w-full"
            >
              Features
            </Link>
            <Link 
              href="/pricing" 
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
            <Link href="/auth/signup">
              <Button 
                size="sm"
                className="bg-gradient-to-r from-violet-600 via-pink-500 to-cyan-500 hover:shadow-2xl hover:shadow-violet-500/50 text-white font-medium px-6"
              >
                Start Free Trial
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 hover:bg-foreground/10 rounded-lg transition-colors"
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
            className="absolute left-0 right-0 top-full border-b p-4 md:hidden"
            style={{
              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.6) 100%)',
              borderColor: 'rgba(255, 255, 255, 0.3)',
            }}
          >
            <div className="flex flex-col gap-4">
              <Link 
                href="#features" 
                className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Features
              </Link>
              <Link 
                href="/pricing" 
                className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </Link>
              <div className="h-px bg-foreground/10" />
              <Link href="/auth/login" className="block">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-foreground hover:bg-foreground/10"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup" className="block">
                <Button 
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                  onClick={() => setIsOpen(false)}
                >
                  Start Free
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
