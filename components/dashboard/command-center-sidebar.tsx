'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { useEffect, useState } from 'react';
import { getUnreadAlerts } from '@/lib/mock-data';
import {
  LayoutDashboard,
  Radar,
  LayoutGrid,
  FlaskConical,
  Eye,
  CalendarDays,
  BellDot,
  Settings,
  LogOut,
  CreditCard,
  ChevronRight,
  Zap,
} from 'lucide-react';

const navItems = [
  {
    href: '/dashboard',
    label: 'Command Center',
    icon: LayoutDashboard,
    description: 'Daily intelligence hub',
    color: '#00D9FF',
  },
  {
    href: '/dashboard/signals',
    label: 'Signal Explorer',
    icon: Radar,
    description: 'Discover trending signals',
    color: '#B026FF',
  },
  {
    href: '/dashboard/opportunities',
    label: 'Opportunity Grid',
    icon: LayoutGrid,
    description: 'Scored content ideas',
    color: '#F72585',
  },
  {
    href: '/dashboard/lab',
    label: 'Creator Lab',
    icon: FlaskConical,
    description: 'Hooks & angle generator',
    color: '#FF6B35',
  },
  {
    href: '/dashboard/watch',
    label: 'Signal Watch',
    icon: Eye,
    description: 'Track topics & niches',
    color: '#10B981',
  },
  {
    href: '/dashboard/flow',
    label: 'Content Flow',
    icon: CalendarDays,
    description: 'Plan & schedule content',
    color: '#F59E0B',
  },
  {
    href: '/dashboard/alerts',
    label: 'Pulse Alerts',
    icon: BellDot,
    description: 'Real-time notifications',
    color: '#EF4444',
    badge: true,
  },
];

const toolItems = [
  { href: '/dashboard/billing', label: 'Billing', icon: CreditCard },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export function CommandCenterSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    setMounted(true);
    setUnreadCount(getUnreadAlerts().length);
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  if (!mounted) return null;

  return (
    <aside
      className="w-[240px] flex-shrink-0 flex flex-col h-screen sticky top-0 overflow-hidden"
      style={{
        background: 'rgba(10, 12, 28, 0.97)',
        borderRight: '1px solid rgba(0, 217, 255, 0.08)',
      }}
    >
      {/* Logo */}
      <div className="px-5 py-5 flex items-center gap-3" style={{ borderBottom: '1px solid rgba(0, 217, 255, 0.07)' }}>
        <div className="relative flex-shrink-0">
          <div className="absolute inset-0 rounded-xl blur-md opacity-40" style={{ background: 'linear-gradient(135deg, #7C3AED, #EC4899, #06B6D4)' }} />
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/file_000000008ac871f59ede0f812917b6ce-8XEVvquPGbljY0q6kyKqAOz12XiklF.png"
            alt="Ideora"
            width={36}
            height={36}
            className="relative h-9 w-9 object-contain"
          />
        </div>
        <div>
          <p className="text-sm font-bold text-white tracking-tight">Ideora</p>
          <p className="text-[10px] font-mono" style={{ color: '#00D9FF' }}>Content Intelligence</p>
        </div>
      </div>

      {/* Daily Brief Banner */}
      <div className="mx-3 mt-3 mb-1 rounded-xl px-3 py-2.5 cursor-pointer group transition-all duration-200"
        style={{
          background: 'linear-gradient(135deg, rgba(0,217,255,0.08), rgba(176,38,255,0.08))',
          border: '1px solid rgba(0,217,255,0.18)',
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#00D9FF' }} />
            <span className="text-[11px] font-semibold" style={{ color: '#00D9FF' }}>Daily Brief Ready</span>
          </div>
          <ChevronRight className="w-3 h-3 text-slate-500 group-hover:text-slate-300 transition-colors" />
        </div>
        <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">10 signals · 6 opportunities · 3 alerts</p>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">
        <p className="text-[9px] font-mono font-semibold text-slate-600 tracking-widest uppercase px-2 pb-1.5">Platform</p>
        {navItems.map(({ href, label, icon: Icon, color, badge }) => {
          const isActive = pathname === href;
          return (
            <Link key={href} href={href}>
              <div
                className="group relative flex items-center gap-3 px-2.5 py-2.5 rounded-xl transition-all duration-150 cursor-pointer"
                style={isActive ? {
                  background: `linear-gradient(135deg, ${color}14, ${color}08)`,
                  border: `1px solid ${color}30`,
                } : {
                  background: 'transparent',
                  border: '1px solid transparent',
                }}
              >
                {isActive && (
                  <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r"
                    style={{ background: color }}
                  />
                )}
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-150"
                  style={{
                    background: isActive ? `${color}20` : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${isActive ? color + '30' : 'rgba(255,255,255,0.06)'}`,
                  }}
                >
                  <Icon className="w-3.5 h-3.5 transition-colors duration-150" style={{ color: isActive ? color : '#64748B' }} />
                </div>
                <span
                  className="text-[13px] font-medium flex-1 transition-colors duration-150"
                  style={{ color: isActive ? '#F1F5F9' : '#64748B' }}
                >
                  {label}
                </span>
                {badge && unreadCount > 0 && (
                  <span
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0"
                    style={{ background: '#EF444420', color: '#EF4444', border: '1px solid #EF444430' }}
                  >
                    {unreadCount}
                  </span>
                )}
              </div>
            </Link>
          );
        })}

        <div className="pt-3 pb-1">
          <p className="text-[9px] font-mono font-semibold text-slate-600 tracking-widest uppercase px-2 pb-1.5">Account</p>
          {toolItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link key={href} href={href}>
                <div
                  className="flex items-center gap-3 px-2.5 py-2 rounded-xl transition-all duration-150 cursor-pointer"
                  style={{
                    background: isActive ? 'rgba(255,255,255,0.05)' : 'transparent',
                    border: '1px solid transparent',
                  }}
                >
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <Icon className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                  <span className="text-[13px] font-medium text-slate-500">{label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Agent Status Strip */}
      <div className="mx-3 mb-3 rounded-xl px-3 py-2.5"
        style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <Zap className="w-3 h-3" style={{ color: '#10B981' }} />
            <span className="text-[10px] font-semibold text-slate-400">6 Agents Active</span>
          </div>
          <div className="flex gap-1">
            {['#00D9FF', '#B026FF', '#F72585', '#10B981', '#EF4444', '#F59E0B'].map((color, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: color, opacity: 0.8 }}
              />
            ))}
          </div>
        </div>
        <div className="text-[10px] text-slate-600 font-mono">2.1K signals/hr · Last scan: 2m ago</div>
      </div>

      {/* User Footer */}
      <div className="px-3 pb-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="flex items-center gap-3 px-2.5 py-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #7C3AED, #EC4899)', color: 'white' }}
          >
            U
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-medium text-slate-300 truncate">Creator Pro</p>
            <p className="text-[10px] text-slate-600">Growth Plan</p>
          </div>
          <button
            onClick={handleLogout}
            className="p-1.5 rounded-lg transition-colors hover:bg-red-500/10 group"
            title="Logout"
          >
            <LogOut className="w-3.5 h-3.5 text-slate-600 group-hover:text-red-400 transition-colors" />
          </button>
        </div>
      </div>
    </aside>
  );
}
