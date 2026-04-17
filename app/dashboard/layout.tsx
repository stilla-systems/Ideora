'use client';

import React from 'react';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { CommandCenterSidebar } from '@/components/dashboard/command-center-sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="flex h-screen overflow-hidden" style={{ background: '#080A1A' }}>
        <CommandCenterSidebar />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
