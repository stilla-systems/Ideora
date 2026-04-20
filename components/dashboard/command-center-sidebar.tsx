'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { useEffect, useState } from 'react';
import {
  LayoutDashboard,
  Zap,
  TrendingUp,
  Radio,
  LineChart,
  Gauge,
  User,
  Settings,
  LogOut,
  ChevronRight,
  BarChart3,
  CreditCard,
  X,
} from 'lucide-react';

const mainNav = [
  { href: '/dashboard', label: 'Command Center', icon: LayoutDashboard, exact: true },
  { href: '/dashboard/idea-lab', label: 'Idea Lab', icon: Zap },
  { href: '/dashboard/trend-radar', label: 'Trend Radar', icon: TrendingUp },
  { href: '/dashboard/live-engine', label: 'Live Engine', icon: Radio },
  { href: '/dashboard/analytics', label: 'Analytics', icon: LineChart },
  { href: '/dashboard/growth-forecast', label: 'Growth Forecast', icon: Gauge },
  { href: '/dashboard/profile-intelligence', label: 'Profile Intelligence', icon: User },
];

const secondaryNav = [
  { href: '/dashboard/insights', label: 'Weekly Insights', icon: BarChart3 },
  { href: '/dashboard/billing', label: 'Billing', icon: CreditCard },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

interface CommandCenterSidebarProps {
  onClose?: () => void;
}

export function CommandCenterSidebar({ onClose }: CommandCenterSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  if (!mounted) return null;

  const NavItem = ({
    href,
    label,
    icon: Icon,
    exact,
  }: {
    href: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    exact?: boolean;
  }) => {
    const isActive = exact ? pathname === href : pathname.startsWith(href);
    return (
      <Link href={href} onClick={onClose}>
        <div
          className={`group flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer relative ${
            isActive
              ? 'text-white'
              : 'text-gray-500 hover:text-gray-200 hover:bg-white/[0.04]'
          }`}
          style={
            isActive
              ? {
                  background: 'rgba(0,217,255,0.08)',
                  boxShadow: 'inset 0 0 0 1px rgba(0,217,255,0.15)',
                }
              : {}
          }
        >
          {isActive && (
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-full"
              style={{ background: '#00D9FF', boxShadow: '0 0 8px rgba(0,217,255,0.6)' }}
            />
          )}
          <Icon
            className={`w-4 h-4 flex-shrink-0 transition-colors ${
              isActive ? 'text-cyan-400' : 'text-gray-600 group-hover:text-gray-400'
            }`}
          />
          <span className="flex-1 truncate">{label}</span>
          {isActive && <ChevronRight className="w-3 h-3 text-cyan-400/50 flex-shrink-0" />}
        </div>
      </Link>
    );
  };

  return (
    <aside
      className="w-56 flex-shrink-0 flex flex-col h-full border-r border-white/[0.05]"
      style={{
        background: 'rgba(10,14,39,0.98)',
        backdropFilter: 'blur(20px)',
      }}
    >
      {/* Logo + mobile close */}
      <div className="px-5 pt-6 pb-5 border-b border-white/[0.05] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group" onClick={onClose}>
          <Image
            src="/ideora-logo.png"
            alt="Ideora"
            width={28}
            height={28}
            className="rounded-lg flex-shrink-0"
            priority
          />
          <div>
            <span className="text-sm font-bold text-white tracking-tight block leading-none">
              Ideora
            </span>
            <span className="text-xs font-mono text-gray-600 tracking-widest block mt-0.5">
              INTELLIGENCE
            </span>
          </div>
        </Link>
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden p-1 rounded-lg hover:bg-white/[0.06] transition-colors"
            aria-label="Close menu"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        )}
      </div>

      {/* Main nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-0.5">
        <p className="text-xs font-mono text-gray-700 tracking-widest px-2 pb-2 pt-1">PLATFORM</p>
        {mainNav.map((item) => (
          <NavItem key={item.href} {...item} />
        ))}

        <div className="h-px bg-white/[0.04] my-3" />
        <p className="text-xs font-mono text-gray-700 tracking-widest px-2 pb-2">ACCOUNT</p>
        {secondaryNav.map((item) => (
          <NavItem key={item.href} {...item} />
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 pb-4 pt-2 border-t border-white/[0.05]">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-gray-500 hover:text-red-400 hover:bg-red-500/[0.06] transition-all duration-150"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
