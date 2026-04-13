'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth-context';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

function ThemeToggleButton() {
  const [theme, setThemeState] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme =
      (typeof window !== 'undefined' && (localStorage.getItem('theme') as 'light' | 'dark')) ||
      'dark';
    setThemeState(savedTheme);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    document.documentElement.classList.toggle('light', newTheme === 'light');
  };

  if (!mounted) return null;

  return (
    <Button
      variant="ghost"
      className="w-full justify-start gap-3 font-medium transition-all text-foreground/70 hover:text-foreground hover:bg-white/10 dark:hover:bg-white/5 text-xs sm:text-sm h-9 sm:h-10"
      onClick={toggleTheme}
    >
      <span className="text-base">{theme === 'dark' ? '☀️' : '🌙'}</span>
      <span className="hidden sm:inline">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
    </Button>
  );
}

const menuItems = [
  { href: '/dashboard', label: 'Command Center', icon: '⚡' },
  { href: '/dashboard/insights', label: 'Weekly Insights', icon: '📈' },
  { href: '/dashboard/idea-lab', label: 'Idea Lab', icon: '💡' },
  { href: '/dashboard/trend-radar', label: 'Trend Radar', icon: '🔥' },
  { href: '/dashboard/live-engine', label: 'Live Engine', icon: '📡' },
  { href: '/dashboard/analytics', label: 'Analytics', icon: '📊' },
  { href: '/dashboard/growth-forecast', label: 'Growth Forecast', icon: '🚀' },
  { href: '/dashboard/profile-intelligence', label: 'Profile Intel', icon: '🧠' },
  { href: '/dashboard/billing', label: 'Billing', icon: '💳' },
  { href: '/dashboard/settings', label: 'Settings', icon: '⚙️' },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <div className="flex flex-col h-full">
      <Link href="/" className="mb-4 flex items-center gap-2.5 group shrink-0 px-1">
        <Image
          src="/ideora-icon.png"
          alt="Ideora"
          width={32}
          height={32}
          className="h-7 sm:h-8 w-7 sm:w-8 group-hover:scale-110 transition-transform flex-shrink-0"
        />
        <span className="hidden sm:inline text-base sm:text-lg font-bold text-white">Ideora</span>
      </Link>

      <nav className="flex-1 space-y-0.5 overflow-y-auto">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            title={item.label}
            className="block"
            onClick={onNavigate}
          >
            <Button
              variant={pathname === item.href ? 'default' : 'ghost'}
              className={`w-full justify-center sm:justify-start gap-2 sm:gap-3 font-medium transition-all text-xs sm:text-sm h-9 sm:h-10 ${
                pathname === item.href
                  ? 'bg-gradient-to-r from-violet-600 via-pink-500 to-cyan-500 text-white shadow-lg shadow-violet-500/20'
                  : 'text-foreground/70 hover:text-foreground hover:bg-white/10 dark:hover:bg-white/5'
              }`}
            >
              <span className="text-base">{item.icon}</span>
              <span className="hidden sm:inline">{item.label}</span>
            </Button>
          </Link>
        ))}
      </nav>

      <div className="flex flex-col gap-1 mt-auto pt-4 border-t border-foreground/10">
        <ThemeToggleButton />
        <Button
          variant="ghost"
          className="w-full justify-center sm:justify-start gap-2 sm:gap-3 text-red-500 hover:text-red-400 hover:bg-red-950/20 text-xs sm:text-sm h-9 sm:h-10"
          onClick={handleLogout}
          title="Sign Out"
        >
          <span className="text-base">🚪</span>
          <span className="hidden sm:inline">Sign Out</span>
        </Button>
      </div>
    </div>
  );
}

export function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile hamburger toggle */}
      <button
        className="fixed top-4 left-4 z-50 sm:hidden p-2 rounded-lg bg-slate-900/90 border border-white/10 text-white"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle sidebar"
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 sm:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 p-4 sm:hidden transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          background: 'linear-gradient(135deg, rgba(15, 15, 21, 0.98) 0%, rgba(26, 31, 53, 0.95) 100%)',
          backdropFilter: 'blur(12px)',
          borderRight: '1px solid rgba(167, 139, 250, 0.2)',
        }}
      >
        <SidebarContent onNavigate={() => setMobileOpen(false)} />
      </aside>

      {/* Desktop sidebar */}
      <aside
        className="hidden sm:flex flex-col w-14 sm:w-48 md:w-56 lg:w-64 h-screen p-3 sm:p-4 sticky top-0 border-r overflow-y-auto shrink-0"
        style={{
          background: 'linear-gradient(135deg, rgba(15, 15, 21, 0.95) 0%, rgba(26, 31, 53, 0.9) 100%)',
          backdropFilter: 'blur(12px)',
          borderColor: 'rgba(167, 139, 250, 0.2)',
        }}
      >
        <SidebarContent />
      </aside>
    </>
  );
}
