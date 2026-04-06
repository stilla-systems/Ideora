'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/dashboard/sidebar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function BillingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annually'>('monthly');

  const currentPlan = {
    name: 'Creator',
    price: 79,
    status: 'active',
    renewalDate: '2024-02-15',
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
    {
      id: 'INV-2024-001',
      date: '2024-01-15',
      amount: 79,
      status: 'Paid',
    },
    {
      id: 'INV-2023-012',
      date: '2023-12-15',
      amount: 79,
      status: 'Paid',
    },
    {
      id: 'INV-2023-011',
      date: '2023-11-15',
      amount: 79,
      status: 'Paid',
    },
  ];

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        <div className="px-8 py-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Billing & Subscription</h1>
            <p className="mt-2 text-foreground/60">Manage your plan and payment methods</p>
          </div>

          {/* Current Plan */}
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-bold">Current Plan</h2>
            <div 
              className="p-8 rounded-2xl shadow-lg border border-white/30 dark:border-white/10"
              style={{
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(10px) saturate(200%)',
              }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold">{currentPlan.name}</h3>
                    <Badge className="bg-green-600 text-white">Active</Badge>
                  </div>
                  <p className="text-4xl font-bold mb-4">
                    ${currentPlan.price}<span className="text-lg text-foreground/60">/month</span>
                  </p>
                  <p className="text-foreground/60 mb-4">Next renewal: {currentPlan.renewalDate}</p>
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {currentPlan.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-sm">
                        <svg className="h-4 w-4 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="border-t border-white/10 pt-6 flex gap-3">
                <Button className="bg-gradient-to-r from-indigo-600 to-purple-600">
                  Manage Billing
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white/20 bg-transparent rounded-lg border"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  Cancel Subscription
                </Button>
              </div>
            </div>
          </div>

          {/* Upgrade Options */}
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-bold">Other Plans</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {upgradePlans.map((plan) => (
                <div 
                  key={plan.name} 
                  className="p-6 rounded-2xl shadow-lg border border-white/30 dark:border-white/10"
                  style={{
                    background: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(10px) saturate(200%)',
                  }}
                >
                  <h3 className="mb-2 text-xl font-bold">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-3xl font-bold">${plan.price}</span>
                    <span className="text-foreground/60">/month</span>
                  </div>
                  <ul className="mb-6 space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <svg className="h-4 w-4 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    variant="outline" 
                    className="w-full border-white/20 bg-transparent rounded-lg border"
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    Upgrade to {plan.name}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-bold">Payment Method</h2>
            <div 
              className="p-6 rounded-2xl shadow-lg border border-white/30 dark:border-white/10"
              style={{
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(10px) saturate(200%)',
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Credit Card</p>
                  <p className="text-lg font-semibold">•••• •••• •••• 4242</p>
                  <p className="text-sm text-foreground/60 mt-1">Expires 12/2025</p>
                </div>
                <div className="text-4xl">💳</div>
              </div>
              <div className="border-t border-white/10 mt-6 pt-6">
                <Button 
                  variant="outline" 
                  className="border-white/20 bg-transparent rounded-lg border"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  Update Payment Method
                </Button>
              </div>
            </div>
          </div>

          {/* Billing History */}
          <div>
            <h2 className="mb-4 text-xl font-bold">Billing History</h2>
            <div 
              className="p-6 rounded-2xl shadow-lg border border-white/30 dark:border-white/10"
              style={{
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(10px) saturate(200%)',
              }}
            >
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-4 py-3 text-left font-semibold">Invoice</th>
                      <th className="px-4 py-3 text-left font-semibold">Date</th>
                      <th className="px-4 py-3 text-left font-semibold">Amount</th>
                      <th className="px-4 py-3 text-left font-semibold">Status</th>
                      <th className="px-4 py-3 text-left font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((invoice) => (
                      <tr key={invoice.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="px-4 py-4 font-medium">{invoice.id}</td>
                        <td className="px-4 py-4">{invoice.date}</td>
                        <td className="px-4 py-4">${invoice.amount}</td>
                        <td className="px-4 py-4">
                          <Badge className="bg-green-600/20 text-green-600 dark:text-green-400">
                            {invoice.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-4">
                          <Button variant="ghost" size="sm" className="text-indigo-600 hover:text-indigo-700">
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
