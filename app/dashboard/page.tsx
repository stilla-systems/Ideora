'use client';

import { DashboardShell } from '@/components/dashboard/dashboard-shell';
import { GrowthCommandCenter } from '@/components/dashboard/growth-command-center';

export default function DashboardPage() {
  return (
    <DashboardShell>
      <div className="h-full overflow-auto px-4 md:px-6 py-6 md:py-8">
        <GrowthCommandCenter />
      </div>
    </DashboardShell>
  );
}
