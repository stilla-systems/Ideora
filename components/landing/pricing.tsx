'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, ChevronUp } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const plans = [
  {
    name: 'Starter',
    price: '$39',
    period: '/month',
    tagline: 'For creators just starting out',
    description: 'Get your first win in 24 hours.',
    popular: false,
    features: [
      'Daily content ideas (5/day)',
      'Idea scoring engine',
      'Optimal posting times',
      '1 platform optimization',
      'Basic trend alerts',
      'Community support',
    ],
  },
  {
    name: 'Growth',
    price: '$79',
    period: '/month',
    tagline: 'For growing creators',
    description: 'Real-time intelligence at scale.',
    popular: true,
    features: [
      'Unlimited daily content ideas',
      'Predictive engagement scoring',
      'Real-time opportunity alerts',
      'All 5 platform optimization',
      'Content structure engine',
      'Weekly strategy insights',
      'Priority support',
      'Growth analytics dashboard',
    ],
  },
  {
    name: 'Elite',
    price: '$149',
    period: '/month',
    tagline: 'For scaling creators',
    description: 'Command center for creators.',
    popular: false,
    features: [
      'Everything in Growth',
      'Advanced predictive analytics',
      'Custom growth forecasting',
      'Competitor tracking',
      'Multi-account management',
      'Team collaboration (3 seats)',
      'Dedicated account manager',
      '24/7 priority support',
      'Custom AI training',
    ],
  },
];

export function PricingSection() {
  const [isExpanded, setIsExpanded] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState<string>('auto');

  useEffect(() => {
    if (contentRef.current) {
      setMaxHeight(isExpanded ? `${contentRef.current.scrollHeight}px` : '0px');
    }
  }, [isExpanded]);

  return (
    <section className="relative w-full px-4 sm:px-6 py-16 sm:py-20 md:py-28">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-10 sm:mb-12 md:mb-16 text-center">
          <h2 className="text-balance text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 md:mb-6 px-2 sm:px-0">
            Creator Plans
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-2 sm:px-0">
            Pricing designed for creators at every stage. Start free, scale with confidence.
          </p>
        </div>

        {/* Expandable Content Container */}
        <div
          ref={contentRef}
          style={{ maxHeight, opacity: isExpanded ? 1 : 0 }}
          className="relative w-full overflow-hidden transition-all duration-500 ease-in-out"
        >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative transition-all duration-300 flex flex-col ${
                plan.popular ? 'sm:scale-100 lg:scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <Badge className="bg-gradient-to-r from-violet-600 via-pink-500 to-cyan-500 text-white shadow-lg shadow-violet-500/30">
                    Most Popular
                  </Badge>
                </div>
              )}
              <div 
                className={`p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border h-full flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                  plan.popular 
                    ? 'ring-2 ring-violet-400 shadow-xl shadow-violet-500/20 hover:shadow-2xl hover:shadow-violet-500/30' 
                    : 'border-violet-500/25 shadow-md hover:shadow-lg hover:border-violet-500/40'
                }`}
                style={{
                  background: plan.popular 
                    ? 'linear-gradient(135deg, rgba(167, 139, 250, 0.15) 0%, rgba(236, 72, 153, 0.1) 100%)'
                    : 'rgba(167, 139, 250, 0.06)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <div>
                  <h3 className="mb-2 text-xl sm:text-2xl font-bold text-white">{plan.name}</h3>
                  <p className="mb-4 sm:mb-6 text-xs sm:text-sm text-gray-400">{plan.tagline}</p>

                  <div className="mb-4 sm:mb-6">
                    {plan.name === 'Custom' ? (
                      <span className="text-xl sm:text-2xl font-semibold text-white">{plan.price}</span>
                    ) : (
                      <>
                        <span className="text-3xl sm:text-4xl font-bold text-white">{plan.price}</span>
                        <span className="text-xs sm:text-sm text-gray-400">{plan.period}</span>
                      </>
                    )}
                  </div>

                  <ul className="mb-6 sm:mb-8 space-y-2 sm:space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 sm:gap-3">
                        <Check className="h-4 w-4 sm:h-5 sm:w-5 text-violet-400 flex-shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link 
                  href={`/auth/signup?plan=${plan.name.toLowerCase()}`}
                  className="block mt-auto"
                  aria-label={`Select ${plan.name} plan and sign up`}
                >
                  <Button
                    className={`w-full font-semibold transition-all duration-300 group/btn ${
                      plan.popular
                        ? 'bg-gradient-to-r from-violet-600 via-pink-500 to-cyan-500 hover:shadow-xl hover:shadow-violet-500/40 text-white hover:-translate-y-0.5'
                        : 'border-white/20 rounded-lg border hover:border-violet-400/60 hover:shadow-lg hover:shadow-violet-500/10 hover:-translate-y-0.5'
                    }`}
                    style={!plan.popular ? {
                      background: 'rgba(255, 255, 255, 0.12)',
                      backdropFilter: 'blur(12px)',
                    } : undefined}
                    aria-label={`Get started with ${plan.name} plan`}
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-400">Questions? Contact our sales team at sales@ideora.io</p>
        </div>
        </div>

        {/* Toggle Bar - Always Visible */}
        <div
          className="mt-6 sm:mt-8 border-t border-violet-500/20 bg-gradient-to-r from-background via-background to-violet-950/20 backdrop-blur-sm rounded-b-lg cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-background hover:via-violet-950/10 hover:to-violet-950/30"
          onClick={() => setIsExpanded(!isExpanded)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setIsExpanded(!isExpanded);
            }
          }}
        >
          <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 animate-pulse" />
              <span className="text-xs sm:text-sm font-medium text-foreground/70">
                {isExpanded ? 'Hide' : 'Show'} pricing plans
              </span>
            </div>
            <ChevronUp 
              className={`h-4 w-4 sm:h-5 sm:w-5 text-foreground/60 transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
