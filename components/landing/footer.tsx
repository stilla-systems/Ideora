'use client';

import React from "react"

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronUp, Mail, Twitter, Linkedin, MessageCircle } from 'lucide-react';
import Image from 'next/image';

export function Footer() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubscribing(true);
    // Simulate subscription
    setTimeout(() => {
      setEmail('');
      setIsSubscribing(false);
    }, 1000);
  };

  return (
    <footer 
      className="relative border-t transition-all duration-300"
      style={{
        background: 'linear-gradient(180deg, rgba(15, 15, 21, 0.8) 0%, rgba(26, 31, 53, 0.6) 100%)',
        borderColor: 'rgba(167, 139, 250, 0.15)',
      }}
    >
      {/* Pull-up/Dropdown Bar */}
      <div
        className="sticky bottom-0 z-40 border-t backdrop-blur-md cursor-pointer transition-all duration-300 hover:bg-violet-500/10"
        style={{
          background: 'linear-gradient(180deg, rgba(15, 15, 21, 0.9) 0%, rgba(26, 31, 53, 0.8) 100%)',
          borderColor: 'rgba(167, 139, 250, 0.15)',
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500" />
            <span className="text-sm font-medium text-gray-300">
              {isExpanded ? 'Hide' : 'Show'} more from Ideora
            </span>
          </div>
          <ChevronUp 
            className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
          />
        </div>
      </div>

      {/* Expandable Content */}
      {isExpanded && (
        <div 
          className="relative max-h-screen overflow-hidden transition-all duration-300"
          style={{
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.3) 100%)',
          }}
        >
          <div className="mx-auto max-w-7xl px-4 py-12">
            {/* Newsletter Section */}
            <div className="mb-12 rounded-2xl border border-white/20 bg-gradient-to-br from-indigo-50 to-cyan-50 p-8 md:p-12">
              <div className="grid items-center gap-8 md:grid-cols-2">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                    Get Smarter Faster
                  </h3>
                  <p className="text-foreground/70 mb-6">
                    Subscribe to our newsletter and get trend recommendations delivered to your inbox every morning.
                  </p>
                </div>
                <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                  <div className="flex gap-2">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1"
                      required
                    />
                    <Button
                      type="submit"
                      disabled={isSubscribing || !email}
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium"
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
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5 mb-12">
              <div>
                <h4 className="mb-4 font-semibold text-foreground">Product</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/#features" className="text-foreground/70 hover:text-foreground transition-colors flex items-center gap-2 group">
                    <span className="inline-block w-0 h-px bg-gradient-to-r from-indigo-600 to-cyan-600 group-hover:w-2 transition-all" />
                    Features
                  </Link></li>
                  <li><Link href="/pricing" className="text-foreground/70 hover:text-foreground transition-colors flex items-center gap-2 group">
                    <span className="inline-block w-0 h-px bg-gradient-to-r from-indigo-600 to-cyan-600 group-hover:w-2 transition-all" />
                    Pricing
                  </Link></li>
                  <li><Link href="/dashboard" className="text-foreground/70 hover:text-foreground transition-colors flex items-center gap-2 group">
                    <span className="inline-block w-0 h-px bg-gradient-to-r from-indigo-600 to-cyan-600 group-hover:w-2 transition-all" />
                    Dashboard
                  </Link></li>
                  <li><Link href="/contact" className="text-foreground/70 hover:text-foreground transition-colors flex items-center gap-2 group">
                    <span className="inline-block w-0 h-px bg-gradient-to-r from-indigo-600 to-cyan-600 group-hover:w-2 transition-all" />
                    Support
                  </Link></li>
                </ul>
              </div>

              <div>
                <h4 className="mb-4 font-semibold text-foreground">Company</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/" className="text-foreground/70 hover:text-foreground transition-colors flex items-center gap-2 group">
                    <span className="inline-block w-0 h-px bg-gradient-to-r from-indigo-600 to-cyan-600 group-hover:w-2 transition-all" />
                    Home
                  </Link></li>
                  <li><Link href="/contact" className="text-foreground/70 hover:text-foreground transition-colors flex items-center gap-2 group">
                    <span className="inline-block w-0 h-px bg-gradient-to-r from-indigo-600 to-cyan-600 group-hover:w-2 transition-all" />
                    Contact
                  </Link></li>
                  <li><Link href="/dashboard/settings" className="text-foreground/70 hover:text-foreground transition-colors flex items-center gap-2 group">
                    <span className="inline-block w-0 h-px bg-gradient-to-r from-indigo-600 to-cyan-600 group-hover:w-2 transition-all" />
                    Settings
                  </Link></li>
                </ul>
              </div>

              <div>
                <h4 className="mb-4 font-semibold text-foreground">Resources</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/#features" className="text-foreground/70 hover:text-foreground transition-colors flex items-center gap-2 group">
                    <span className="inline-block w-0 h-px bg-gradient-to-r from-indigo-600 to-cyan-600 group-hover:w-2 transition-all" />
                    Features
                  </Link></li>
                  <li><Link href="/pricing" className="text-foreground/70 hover:text-foreground transition-colors flex items-center gap-2 group">
                    <span className="inline-block w-0 h-px bg-gradient-to-r from-indigo-600 to-cyan-600 group-hover:w-2 transition-all" />
                    Pricing
                  </Link></li>
                  <li><Link href="/contact" className="text-foreground/70 hover:text-foreground transition-colors flex items-center gap-2 group">
                    <span className="inline-block w-0 h-px bg-gradient-to-r from-indigo-600 to-cyan-600 group-hover:w-2 transition-all" />
                    Contact
                  </Link></li>
                </ul>
              </div>

              <div>
                <h4 className="mb-4 font-semibold text-foreground">Legal</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/privacy" className="text-foreground/70 hover:text-foreground transition-colors flex items-center gap-2 group">
                    <span className="inline-block w-0 h-px bg-gradient-to-r from-indigo-600 to-cyan-600 group-hover:w-2 transition-all" />
                    Privacy
                  </Link></li>
                  <li><Link href="/terms" className="text-foreground/70 hover:text-foreground transition-colors flex items-center gap-2 group">
                    <span className="inline-block w-0 h-px bg-gradient-to-r from-indigo-600 to-cyan-600 group-hover:w-2 transition-all" />
                    Terms
                  </Link></li>
                  <li><Link href="/contact" className="text-foreground/70 hover:text-foreground transition-colors flex items-center gap-2 group">
                    <span className="inline-block w-0 h-px bg-gradient-to-r from-indigo-600 to-cyan-600 group-hover:w-2 transition-all" />
                    Contact
                  </Link></li>
                </ul>
              </div>

              <div>
                <h4 className="mb-4 font-semibold text-foreground">Connect</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-foreground transition-colors flex items-center gap-2 group">
                    <Twitter className="h-4 w-4" />
                    Twitter
                  </a></li>
                  <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-foreground transition-colors flex items-center gap-2 group">
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </a></li>
                  <li><a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-foreground transition-colors flex items-center gap-2 group">
                    <MessageCircle className="h-4 w-4" />
                    Discord
                  </a></li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10 pt-8 flex flex-col items-center justify-between gap-4 text-sm text-foreground/60 md:flex-row">
              <div className="flex items-center gap-2">
                <Image
                  src="/ideora-logo.png"
                  alt="Ideora"
                  width={120}
                  height={30}
                  className="h-6 w-auto"
                />
                <p>&copy; 2024 Ideora. All rights reserved.</p>
              </div>
              <div className="text-xs text-foreground/50">
                Made with intent for creators, by creators.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Static Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="text-center text-xs text-foreground/50">
          <p>Ready to discover trends? <Link href="/auth/signup" className="text-indigo-600 hover:text-indigo-700 font-medium">Start for free</Link></p>
        </div>
      </div>
    </footer>
  );
}
