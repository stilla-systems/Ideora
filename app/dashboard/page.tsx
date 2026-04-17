'use client';

import { CommandCenterSidebar } from '@/components/dashboard/command-center-sidebar';
import { GrowthCommandCenter } from '@/components/dashboard/growth-command-center';

export default function DashboardPage() {
  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#0A0E27' }}>
      {/* Sidebar */}
      <CommandCenterSidebar />

      {/* Main content */}
      <main className="flex-1 overflow-hidden">
        <div className="h-full overflow-auto px-6 py-8">
          <GrowthCommandCenter />
        </div>
      </main>
    </div>
  );
}
