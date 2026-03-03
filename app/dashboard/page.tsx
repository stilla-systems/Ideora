'use client';

import { CommandCenterSidebar } from '@/components/dashboard/command-center-sidebar';
import { GrowthCommandCenter } from '@/components/dashboard/growth-command-center';

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden">
      {/* Left Sidebar Navigation */}
      <CommandCenterSidebar />

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <GrowthCommandCenter />
        </div>
      </main>
    </div>
  );
}
