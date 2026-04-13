'use client';

import { Sidebar } from '@/components/dashboard/sidebar';
import { GrowthCommandCenter } from '@/components/dashboard/growth-command-center';

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold">Growth Command Center</h1>
            <p className="mt-1 text-foreground/60 text-sm">Your AI-powered content intelligence hub</p>
          </div>
          <GrowthCommandCenter />
        </div>
      </main>
    </div>
  );
}
