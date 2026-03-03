'use client';

import React from "react"

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronUp, Twitter, Linkedin, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import { newsletterSchema } from '@/lib/validations';
import { useToast } from '@/hooks/use-toast';

export function Footer() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState('0px');
  const { toast } = useToast();

  useEffect(() => {
    if (contentRef.current) {
      setMaxHeight(isExpanded ? `${contentRef.current.scrollHeight}px` : '0px');
    }
  }, [isExpanded]);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate email
    try {
      newsletterSchema.parse({ email });
    } catch (err: any) {
      const errorMessage = err.errors?.[0]?.message || 'Invalid email';
      setError(errorMessage);
      toast({
        title: 'Validation Error',
        description: errorMessage,
        variant: 'destructive',
      });
      return;
    }

    setIsSubscribing(true);
    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Subscription failed');
      }

      setEmail('');
      toast({
        title: 'Success',
        description: 'Thank you for subscribing!',
      });
    } catch (err) {
      setError('Failed to subscribe. Please try again.');
      toast({
        title: 'Error',
        description: 'Failed to subscribe. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer 
      className="relative border-t border-violet-500/20 bg-gradient-to-b from-background via-background to-violet-950/30 transition-colors duration-300"
    >
      {/* Expandable Content Container */}
      <div
        ref={contentRef}
        style={{ maxHeight, opacity: isExpanded ? 1 : 0 }}
        className="relative w-full overflow-hidden transition-all duration-500 ease-in-out"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-8 sm:py-12">
          {/* Newsletter Section */}
          <div className="mb-10 sm:mb-12 rounded-lg sm:rounded-xl border border-violet-500/25 bg-gradient-to-br from-violet-500/8 to-cyan-500/8 p-6 sm:p-8 md:p-10 backdrop-blur-sm hover:border-violet-500/35 transition-all duration-300">
            <div className="grid items-center gap-6 sm:gap-8 md:grid-cols-2">
              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 text-foreground">
                  Get Smarter Faster
                </h3>
                <p className="text-sm sm:text-base text-foreground/70 mb-4 sm:mb-6">
                  Subscribe to our newsletter and get trend recommendations delivered to your inbox every morning.
                </p>
              </div>
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2 sm:gap-3">
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-background/50 border-violet-500/20 text-foreground placeholder:text-foreground/40 focus-visible:border-violet-500/40 focus-visible:ring-violet-500/20"
                    required
                  />
                  <Button
                    type="submit"
                    disabled={isSubscribing || !email}
                    className="bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 text-white font-medium transition-all duration-300"
                  >
                    {isSubscribing ? 'Subscribing...' : 'Subscribe'}
                  </Button>
                </div>
                <p className="text-xs text-foreground/50">
                  No spam, unsubscribe anytime. By subscribing you agree to our Privacy Policy.
                </p>
              </form>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-6 sm:gap-8 sm:grid-cols-4 lg:grid-cols-5 mb-10 sm:mb-12 pt-4 sm:pt-8 border-t border-violet-500/15">
            <div>
              <h4 className="mb-3 sm:mb-4 text-xs sm:text-sm font-semibold text-foreground/90 uppercase tracking-wider">Product</h4>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <li><Link href="/#features" className="text-foreground/60 hover:text-foreground transition-colors duration-300 flex items-center gap-2 group">
                  <span className="inline-block w-0 h-0.5 bg-gradient-to-r from-violet-500 to-cyan-500 group-hover:w-2 transition-all duration-300" />
                  Features
                </Link></li>
                <li><Link href="/pricing" className="text-foreground/60 hover:text-foreground transition-colors duration-300 flex items-center gap-2 group">
                  <span className="inline-block w-0 h-0.5 bg-gradient-to-r from-violet-500 to-cyan-500 group-hover:w-2 transition-all duration-300" />
                  Pricing
                </Link></li>
                <li><Link href="/dashboard" className="text-foreground/60 hover:text-foreground transition-colors duration-300 flex items-center gap-2 group">
                  <span className="inline-block w-0 h-0.5 bg-gradient-to-r from-violet-500 to-cyan-500 group-hover:w-2 transition-all duration-300" />
                  Dashboard
                </Link></li>
                <li><Link href="/contact" className="text-foreground/60 hover:text-foreground transition-colors duration-300 flex items-center gap-2 group">
                  <span className="inline-block w-0 h-0.5 bg-gradient-to-r from-violet-500 to-cyan-500 group-hover:w-2 transition-all duration-300" />
                  Support
                </Link></li>
                </ul>
              </div>

            <div>
              <h4 className="mb-3 sm:mb-4 text-xs sm:text-sm font-semibold text-foreground/90 uppercase tracking-wider">Company</h4>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <li><Link href="/" className="text-foreground/60 hover:text-foreground transition-colors duration-300 flex items-center gap-2 group">
                  <span className="inline-block w-0 h-0.5 bg-gradient-to-r from-violet-500 to-cyan-500 group-hover:w-2 transition-all duration-300" />
                  Home
                </Link></li>
                <li><Link href="/contact" className="text-foreground/60 hover:text-foreground transition-colors duration-300 flex items-center gap-2 group">
                  <span className="inline-block w-0 h-0.5 bg-gradient-to-r from-violet-500 to-cyan-500 group-hover:w-2 transition-all duration-300" />
                  Contact
                </Link></li>
                <li><Link href="/dashboard/settings" className="text-foreground/60 hover:text-foreground transition-colors duration-300 flex items-center gap-2 group">
                  <span className="inline-block w-0 h-0.5 bg-gradient-to-r from-violet-500 to-cyan-500 group-hover:w-2 transition-all duration-300" />
                  Settings
                </Link></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-3 sm:mb-4 text-xs sm:text-sm font-semibold text-foreground/90 uppercase tracking-wider">Resources</h4>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <li><Link href="/#features" className="text-foreground/60 hover:text-foreground transition-colors duration-300 flex items-center gap-2 group">
                  <span className="inline-block w-0 h-0.5 bg-gradient-to-r from-violet-500 to-cyan-500 group-hover:w-2 transition-all duration-300" />
                  Features
                </Link></li>
                <li><Link href="/pricing" className="text-foreground/60 hover:text-foreground transition-colors duration-300 flex items-center gap-2 group">
                  <span className="inline-block w-0 h-0.5 bg-gradient-to-r from-violet-500 to-cyan-500 group-hover:w-2 transition-all duration-300" />
                  Pricing
                </Link></li>
                <li><Link href="/contact" className="text-foreground/60 hover:text-foreground transition-colors duration-300 flex items-center gap-2 group">
                  <span className="inline-block w-0 h-0.5 bg-gradient-to-r from-violet-500 to-cyan-500 group-hover:w-2 transition-all duration-300" />
                  Contact
                </Link></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-3 sm:mb-4 text-xs sm:text-sm font-semibold text-foreground/90 uppercase tracking-wider">Legal</h4>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <li><Link href="/privacy" className="text-foreground/60 hover:text-foreground transition-colors duration-300 flex items-center gap-2 group">
                  <span className="inline-block w-0 h-0.5 bg-gradient-to-r from-violet-500 to-cyan-500 group-hover:w-2 transition-all duration-300" />
                  Privacy
                </Link></li>
                <li><Link href="/terms" className="text-foreground/60 hover:text-foreground transition-colors duration-300 flex items-center gap-2 group">
                  <span className="inline-block w-0 h-0.5 bg-gradient-to-r from-violet-500 to-cyan-500 group-hover:w-2 transition-all duration-300" />
                  Terms
                </Link></li>
                <li><Link href="/contact" className="text-foreground/60 hover:text-foreground transition-colors duration-300 flex items-center gap-2 group">
                  <span className="inline-block w-0 h-0.5 bg-gradient-to-r from-violet-500 to-cyan-500 group-hover:w-2 transition-all duration-300" />
                  Contact
                </Link></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-3 sm:mb-4 text-xs sm:text-sm font-semibold text-foreground/90 uppercase tracking-wider">Connect</h4>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-foreground transition-colors duration-300 flex items-center gap-2 group">
                  <Twitter className="h-4 w-4" />
                  Twitter
                </a></li>
                <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-foreground transition-colors duration-300 flex items-center gap-2 group">
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a></li>
                <li><a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-foreground transition-colors duration-300 flex items-center gap-2 group">
                  <MessageCircle className="h-4 w-4" />
                  Discord
                </a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-violet-500/15 pt-6 sm:pt-8 flex flex-col items-center justify-between gap-3 sm:gap-4 text-xs sm:text-sm text-foreground/60 md:flex-row">
            <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
              <Image
                src="/ideora-logo.png"
                alt="Ideora"
                width={120}
                height={30}
                className="h-5 sm:h-6 w-auto"
              />
              <p>&copy; 2024 Ideora. All rights reserved.</p>
            </div>
            <div className="text-xs text-foreground/50 text-center">
              Made with intent for creators, by creators.
            </div>
          </div>
        </div>
      </div>

      {/* Toggle Bar - Always Visible */}
      <div
        className="sticky bottom-0 z-40 border-t border-violet-500/20 bg-gradient-to-r from-background via-background to-violet-950/20 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-background hover:via-violet-950/10 hover:to-violet-950/30"
        onClick={() => setIsExpanded(!isExpanded)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsExpanded(!isExpanded);
          }
        }}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 animate-pulse" />
            <span className="text-xs sm:text-sm font-medium text-foreground/70">
              {isExpanded ? 'Hide' : 'Explore'} more from Ideora
            </span>
          </div>
          <ChevronUp 
            className={`h-4 w-4 sm:h-5 sm:w-5 text-foreground/60 transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </div>
      </div>
    </footer>
  );
}
