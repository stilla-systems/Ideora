import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import pricingData from '@/lib/pricing-data.json';

export function PricingSection() {
  const { headline, subheadline, plans, subtext } = pricingData;

  return (
    <section className="relative px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="text-balance text-4xl font-bold md:text-5xl text-white">
            {headline}
          </h2>
          <p className="mt-4 text-xl text-gray-300">
            {subheadline}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-4 lg:gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative transition-all duration-300 flex flex-col ${
                plan.popular ? 'md:scale-105' : ''
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
                className={`p-8 rounded-2xl shadow-lg border h-full flex flex-col transition-all ${plan.popular ? 'ring-2 ring-violet-400' : 'border-violet-500/30'}`}
                style={{
                  background: plan.popular 
                    ? 'linear-gradient(135deg, rgba(167, 139, 250, 0.2) 0%, rgba(236, 72, 153, 0.15) 100%)'
                    : 'rgba(167, 139, 250, 0.08)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <div>
                  <h3 className="mb-2 text-2xl font-bold text-white">{plan.name}</h3>
                  <p className="mb-6 text-sm text-gray-400">{plan.tagline}</p>

                  <div className="mb-6">
                    {plan.name === 'Custom' ? (
                      <span className="text-2xl font-semibold text-white">{plan.price}</span>
                    ) : (
                      <>
                        <span className="text-4xl font-bold text-white">{plan.price}</span>
                        <span className="text-gray-400">{plan.period}</span>
                      </>
                    )}
                  </div>

                  <ul className="mb-8 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <svg className="h-5 w-5 text-violet-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link href="/auth/signup" className="block mt-auto">
                  <Button
                    className={`w-full font-semibold ${
                      plan.popular
                        ? 'bg-gradient-to-r from-violet-600 via-pink-500 to-cyan-500 hover:shadow-xl hover:shadow-violet-500/30 text-white'
                        : 'border-white/30 rounded-lg border hover:border-violet-400/50'
                    }`}
                    style={!plan.popular ? {
                      background: 'rgba(255, 255, 255, 0.15)',
                      backdropFilter: 'blur(12px)',
                    } : undefined}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-400">{subtext}</p>
        </div>
      </div>
    </section>
  );
}
