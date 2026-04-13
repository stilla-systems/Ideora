'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/dashboard/sidebar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import Link from 'next/link';

export default function BillingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annually'>('monthly');
  const [cancelling, setCancelling] = useState(false);

  const currentPlan = {
    name: 'Creator',
    price: 79,
    annualPrice: 63,
    status: 'active',
    renewalDate: 'April 15, 2026',
    features: [
      'Daily trend recommendations',
      'All 5 platforms',
      'Weekly insights',
      'Real-time alerts',
      'Priority support',
      'Analytics exports',
    ],
  };

  const upgradePlans = [
    {
      name: 'Starter',
      price: 29,
      annualPrice: 23,
      features: [
        'Daily trend recommendations',
        '1 platform tracking',
        'Basic insights',
        'Community support',
      ],
    },
    {
      name: 'Agency',
      price: 199,
      annualPrice: 159,
      features: [
        'Everything in Creator',
        'Multiple team members',
        'Advanced reporting',
        'API access',
        'Custom integrations',
        '24/7 dedicated support',
      ],
    },
  ];

  const invoices = [
    { id: 'INV-2026-003', date: 'Mar 15, 2026', amount: 79, status: 'Paid' },
    { id: 'INV-2026-002', date: 'Feb 15, 2026', amount: 79, status: 'Paid' },
    { id: 'INV-2026-001', date: 'Jan 15, 2026', amount: 79, status: 'Paid' },
  ];

  const handleManageBilling = () => {
    toast.info('Billing portal', {
      description: 'Connect Stripe to enable the billing portal. See .env.example for setup.',
      duration: 5000,
    });
  };

  const handleCancelSubscription = async () => {
    setCancelling(true);
    await new Promise((r) => setTimeout(r, 800));
    setCancelling(false);
    toast.error('Cancellation request', {
      description: 'To cancel, email hello@ideora.com — we\'ll process it within 1 business day.',
      duration: 6000,
    });
  };

  const handleUpgrade = (planName: string) => {
    toast.info(`Upgrade to ${planName}`, {
      description: 'Billing integrations are coming soon. Contact hello@ideora.com to upgrade manually.',
      duration: 5000,
    });
  };

  const handleUpdatePayment = () => {
    toast.info('Update payment method', {
      description: 'Connect Stripe to manage payment methods. See .env.example for setup.',
      duration: 5000,
    });
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    // Generate a simple text receipt
    const content = `IDEORA INVOICE\n\nInvoice: ${invoiceId}\nPlan: Creator ($79/month)\nStatus: Paid\n\nThank you for your subscription.\nhello@ideora.com`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${invoiceId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Invoice downloaded', { description: invoiceId });
  };

  const displayPrice = (monthly: number, annual: number) =>
    billingPeriod === 'annually' ? annual : monthly;

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        <div className="px-4 sm:px-8 py-6 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Billing & Subscription</h1>
              <p className="mt-2 text-foreground/60">Manage your plan and payment methods</p>
            </div>
            {/* Billing Period Toggle */}
            <div className="flex items-center gap-1 p-1 rounded-lg border border-white/10 bg-white/5 w-fit">
              {(['monthly', 'annually'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setBillingPeriod(p)}
                  className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all capitalize ${
                    billingPeriod === p
                      ? 'bg-indigo-600 text-white shadow'
                      : 'text-foreground/50 hover:text-foreground'
                  }`}
                >
                  {p}
                  {p === 'annually' && (
                    <span className="ml-1 text-green-400 text-[10px]">-20%</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Current Plan */}
          <div>
            <h2 className="mb-4 text-xl font-bold">Current Plan</h2>
            <div className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-card">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold">{currentPlan.name}</h3>
                    <Badge className="bg-green-600/20 text-green-400 border-green-500/30">Active</Badge>
                  </div>
                  <p className="text-4xl font-bold mb-1">
                    ${displayPrice(currentPlan.price, currentPlan.annualPrice)}
                    <span className="text-lg text-foreground/60">/month</span>
                  </p>
                  <p className="text-foreground/60 mb-4 text-sm">Next renewal: {currentPlan.renewalDate}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {currentPlan.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-sm">
                        <svg className="h-4 w-4 text-cyan-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="border-t border-white/10 mt-6 pt-6 flex flex-wrap gap-3">
                <Button
                  className="bg-gradient-to-r from-indigo-600 to-purple-600"
                  onClick={handleManageBilling}
                >
                  Manage Billing
                </Button>
                <Button
                  variant="outline"
                  className="border-red-500/20 text-red-400 hover:bg-red-500/10 hover:border-red-500/40"
                  onClick={handleCancelSubscription}
                  disabled={cancelling}
                >
                  {cancelling ? 'Processing…' : 'Cancel Subscription'}
                </Button>
              </div>
            </div>
          </div>

          {/* Upgrade Options */}
          <div>
            <h2 className="mb-4 text-xl font-bold">Other Plans</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {upgradePlans.map((plan) => (
                <div
                  key={plan.name}
                  className="p-6 rounded-2xl border border-white/10 bg-card"
                >
                  <h3 className="mb-2 text-xl font-bold">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-3xl font-bold">
                      ${displayPrice(plan.price, plan.annualPrice)}
                    </span>
                    <span className="text-foreground/60">/month</span>
                    {billingPeriod === 'annually' && (
                      <span className="ml-2 text-xs text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20">
                        Save 20%
                      </span>
                    )}
                  </div>
                  <ul className="mb-6 space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <svg className="h-4 w-4 text-cyan-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant="outline"
                    className="w-full border-white/10 hover:border-indigo-500/40 hover:bg-indigo-500/10"
                    onClick={() => handleUpgrade(plan.name)}
                  >
                    {plan.name === 'Starter' ? 'Downgrade' : 'Upgrade'} to {plan.name}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h2 className="mb-4 text-xl font-bold">Payment Method</h2>
            <div className="p-6 rounded-2xl border border-white/10 bg-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Credit Card on file</p>
                  <p className="text-lg font-semibold">•••• •••• •••• 4242</p>
                  <p className="text-sm text-foreground/60 mt-1">Expires 12/2027</p>
                </div>
                <div className="text-4xl select-none">💳</div>
              </div>
              <div className="border-t border-white/10 mt-6 pt-6">
                <Button
                  variant="outline"
                  className="border-white/10 hover:border-white/20"
                  onClick={handleUpdatePayment}
                >
                  Update Payment Method
                </Button>
              </div>
            </div>
          </div>

          {/* Billing History */}
          <div className="pb-8">
            <h2 className="mb-4 text-xl font-bold">Billing History</h2>
            <div className="rounded-2xl border border-white/10 bg-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-4 sm:px-6 py-3 text-left font-semibold text-foreground/70">Invoice</th>
                      <th className="px-4 sm:px-6 py-3 text-left font-semibold text-foreground/70">Date</th>
                      <th className="px-4 sm:px-6 py-3 text-left font-semibold text-foreground/70">Amount</th>
                      <th className="px-4 sm:px-6 py-3 text-left font-semibold text-foreground/70">Status</th>
                      <th className="px-4 sm:px-6 py-3 text-left font-semibold text-foreground/70">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((invoice) => (
                      <tr key={invoice.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="px-4 sm:px-6 py-4 font-mono text-xs sm:text-sm">{invoice.id}</td>
                        <td className="px-4 sm:px-6 py-4 text-foreground/70">{invoice.date}</td>
                        <td className="px-4 sm:px-6 py-4">${invoice.amount}</td>
                        <td className="px-4 sm:px-6 py-4">
                          <Badge className="bg-green-600/20 text-green-400 border-green-500/30">
                            {invoice.status}
                          </Badge>
                        </td>
                        <td className="px-4 sm:px-6 py-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-indigo-400 hover:text-indigo-300 text-xs"
                            onClick={() => handleDownloadInvoice(invoice.id)}
                          >
                            Download
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
