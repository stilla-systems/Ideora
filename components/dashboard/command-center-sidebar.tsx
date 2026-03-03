'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth-context';
import { useEffect, useState } from 'react';
import { BarChart3, Zap, TrendingUp, Radio, LineChart, Gauge, User, Settings, LogOut } from 'lucide-react';

export function CommandCenterSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const menuItems = [
    { href: '/dashboard', label: 'Command Center', icon: BarChart3 },
    { href: '/dashboard/idea-lab', label: 'Idea Lab', icon: Zap },
    { href: '/dashboard/trend-radar', label: 'Trend Radar', icon: TrendingUp },
    { href: '/dashboard/live-engine', label: 'Live Engine', icon: Radio },
    { href: '/dashboard/analytics', label: 'Analytics', icon: LineChart },
    { href: '/dashboard/growth-forecast', label: 'Growth Forecast', icon: Gauge },
    { href: '/dashboard/profile-intelligence', label: 'Profile Intelligence', icon: User },
  ];

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  if (!mounted) return null;

  return (
    <aside className="w-64 border-r border-gray-800 bg-slate-950 flex flex-col h-full sticky top-0">
      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        <h2 className="text-xs font-mono font-bold text-gray-300 tracking-widest">IDEORA</h2>
        <p className="text-xs font-mono text-gray-500 mt-1">GROWTH COMMAND CENTER</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
        {menuItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link key={href} href={href}>
              <Button
                variant="ghost"
                className={`w-full justify-start gap-3 font-mono text-xs transition-all ${
                  isActive
                    ? 'bg-slate-800 text-cyan-400 border-l-2 border-cyan-400'
                    : 'text-gray-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800 space-y-2">
        <Link href="/dashboard/settings">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 font-mono text-xs text-gray-400 hover:text-white"
          >
            <Settings className="w-4 h-4" />
            Settings
          </Button>
        </Link>
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start gap-3 font-mono text-xs text-gray-400 hover:text-red-400"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
