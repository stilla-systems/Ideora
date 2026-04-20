'use client';

import { useState } from 'react';
import { DashboardShell } from '@/components/dashboard/dashboard-shell';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, CreditCard, Download } from 'lucide-react';

const CARD_STYLE = {
  background: 'rgba(255,255,255,0.015)',
  backdropFilter: 'blur(10px)',
} as const;

const currentPlan = {
  name: 'Growth',
  price: 79,
  renewalDate: 'May 15, 2026',
  features: [
    'Unlimited daily content ideas',
    'All 5 platforms',
    'Weekly insights',
    'Real-time alerts',
    'Priority support',
    'Analytics exports',
  ],
};

const otherPlans = [
  {
    name: 'Starter',
    price: 39,
    features: ['Daily content ideas (5/day)', '1 platform tracking', 'Basic insights', 'Community support'],
  },
  {
    name: 'Elite',
    price: 149,
    features: [
      'Everything in Growth',
      'Competitor tracking',
      'Team collaboration (3 seats)',
      'Custom AI training',
      '24/7 priority support',
    ],
  },
];

const invoices = [
  { id: 'INV-2026-004', date: 'Apr 15, 2026', amount: 79, status: 'Paid' },
  { id: 'INV-2026-003', date: 'Mar 15, 2026', amount: 79, status: 'Paid' },
  { id: 'INV-2026-002', date: 'Feb 15, 2026', amount: 79, status: 'Paid' },
  { id: 'INV-2026-001', date: 'Jan 15, 2026', amount: 79, status: 'Paid' },
];

export default function BillingPage() {
  const [period, setPeriod] = useState<'monthly' | 'annually'>('monthly');

  return (
    <DashboardShell>
      <div className="px-4 md:px-6 py-6 md:py-8 space-y-8 max-w-5xl">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span className="text-xs font-mono text-gray-500 tracking-widest">BILLING</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Billing & Subscription</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your plan and payment methods</p>
        </div>

        {/* Current Plan */}
        <section>
          <h2 className="text-sm font-mono text-gray-500 tracking-widest mb-4">CURRENT PLAN</h2>
          <div
            className="p-6 rounded-xl border border-cyan-500/20"
            style={{
              background: 'rgba(0,217,255,0.03)',
              boxShadow: '0 0 40px rgba(0,217,255,0.04)',
            }}
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-xl font-bold text-white">{currentPlan.name}</h3>
                  <Badge className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-mono">
                    Active
                  </Badge>
                </div>
                <p className="text-sm text-gray-500">Renews {currentPlan.renewalDate}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-3xl font-bold text-white">${currentPlan.price}</p>
                <p className="text-xs text-gray-500 font-mono">/month</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
              {currentPlan.features.map((f) => (
                <div key={f} className="flex items-center gap-2 text-xs text-gray-300">
                  <Check className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                  {f}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 pt-5 border-t border-white/[0.06]">
              <Button
                size="sm"
                className="text-xs font-mono h-8"
                style={{ background: 'linear-gradient(135deg, #00D9FF, #0080FF)', color: '#0A0E27' }}
              >
                Manage Billing
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-xs text-red-400 hover:text-red-300 hover:bg-red-500/[0.08] h-8"
              >
                Cancel Subscription
              </Button>
            </div>
          </div>
        </section>

        {/* Billing period toggle */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-mono text-gray-500 tracking-widest">OTHER PLANS</span>
          <div className="flex rounded-lg overflow-hidden border border-white/[0.08]">
            {(['monthly', 'annually'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-4 py-1.5 text-xs font-mono transition-colors ${
                  period === p
                    ? 'bg-cyan-500/15 text-cyan-400'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {p === 'monthly' ? 'Monthly' : 'Annually (−20%)'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {otherPlans.map((plan) => (
            <div
              key={plan.name}
              className="p-5 rounded-xl border border-white/[0.06] hover:border-white/[0.1] transition-all duration-200"
              style={CARD_STYLE}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-base font-bold text-white">{plan.name}</h3>
                <div>
                  <span className="text-2xl font-bold text-white">
                    ${period === 'annually' ? Math.round(plan.price * 0.8) : plan.price}
                  </span>
                  <span className="text-xs text-gray-500 font-mono">/mo</span>
                </div>
              </div>
              <ul className="space-y-1.5 mb-5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-gray-400">
                    <Check className="w-3.5 h-3.5 text-gray-600 flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                size="sm"
                variant="outline"
                className="w-full text-xs font-mono h-8 border-white/[0.08] text-gray-400 hover:text-white hover:border-white/20"
              >
                Switch to {plan.name}
              </Button>
            </div>
          ))}
        </div>

        {/* Payment Method */}
        <section>
          <h2 className="text-sm font-mono text-gray-500 tracking-widest mb-4">PAYMENT METHOD</h2>
          <div
            className="p-5 rounded-xl border border-white/[0.06]"
            style={CARD_STYLE}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.06)' }}
                >
                  <CreditCard className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">•••• •••• •••• 4242</p>
                  <p className="text-xs text-gray-500 mt-0.5">Expires 12/2027</p>
                </div>
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="text-xs text-gray-400 hover:text-white h-8"
              >
                Update
              </Button>
            </div>
          </div>
        </section>

        {/* Billing History */}
        <section className="pb-8">
          <h2 className="text-sm font-mono text-gray-500 tracking-widest mb-4">BILLING HISTORY</h2>
          <div
            className="rounded-xl border border-white/[0.06] overflow-hidden"
            style={CARD_STYLE}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    {['Invoice', 'Date', 'Amount', 'Status', ''].map((h) => (
                      <th key={h} className="px-4 py-3 text-left font-mono text-gray-600 tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((inv) => (
                    <tr key={inv.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                      <td className="px-4 py-3 font-mono text-gray-300">{inv.id}</td>
                      <td className="px-4 py-3 text-gray-400">{inv.date}</td>
                      <td className="px-4 py-3 text-white font-semibold">${inv.amount}</td>
                      <td className="px-4 py-3">
                        <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono">
                          {inv.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <button className="flex items-center gap-1 text-gray-600 hover:text-cyan-400 transition-colors">
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
