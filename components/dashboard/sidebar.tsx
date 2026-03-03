'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth-context';
import { useEffect, useState } from 'react';

function ThemeToggleButton() {
  const [theme, setThemeState] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = (typeof window !== 'undefined' && localStorage.getItem('theme') as 'light' | 'dark') || 'dark';
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
      className="w-full justify-start gap-3 font-medium transition-all text-gray-300 hover:text-white"
      onClick={toggleTheme}
    >
      <span className="text-lg">{theme === 'dark' ? '☀️' : '🌙'}</span>
      {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
    </Button>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const menuItems = [
    { href: '/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/dashboard/insights', label: 'Weekly Insights', icon: '📈' },
    { href: '/dashboard/billing', label: 'Billing', icon: '💳' },
    { href: '/dashboard/settings', label: 'Settings', icon: '⚙️' },
  ];

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <aside 
      className="border-r h-screen w-48 sm:w-56 md:w-64 flex flex-col p-4 sm:p-6 sticky top-0 border-violet-500/30 transition-all duration-300 overflow-y-auto"
      style={{
        background: 'linear-gradient(135deg, rgba(15, 15, 21, 0.95) 0%, rgba(26, 31, 53, 0.9) 100%)',
        backdropFilter: 'blur(12px)',
        borderColor: 'rgba(167, 139, 250, 0.2)',
      }}
    >
      <Link href="/" className="mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3 group">
        <Image 
          src="/ideora-icon.png" 
          alt="Ideora" 
          width={32}
          height={32}
          className="h-7 sm:h-8 w-7 sm:w-8 group-hover:scale-110 transition-transform flex-shrink-0" 
        />
        <span className="hidden sm:inline text-base sm:text-lg font-bold text-white">Ideora</span>
      </Link>

      <nav className="flex-1 space-y-1 sm:space-y-2">
        {menuItems.map((item) => (
          <Link key={item.href} href={item.href} title={item.label} className="block">
            <Button
              variant={pathname === item.href ? 'default' : 'ghost'}
              className={`w-full justify-center sm:justify-start gap-2 sm:gap-3 font-medium transition-all text-xs sm:text-sm h-9 sm:h-10 ${
                pathname === item.href
                  ? 'bg-gradient-to-r from-violet-600 via-pink-500 to-cyan-500 text-white shadow-lg shadow-violet-500/20'
                  : 'text-foreground/70 hover:text-foreground hover:bg-white/10 dark:hover:bg-white/5'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="hidden sm:inline">{item.label}</span>
            </Button>
          </Link>
        ))}
      </nav>

      <div className="flex flex-col gap-1 sm:gap-2 mt-auto pt-4 sm:pt-6 border-t border-foreground/10">
        <ThemeToggleButton />
        <Button
          variant="ghost"
          className="w-full justify-center sm:justify-start gap-2 sm:gap-3 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20 text-xs sm:text-sm h-9 sm:h-10"
          onClick={handleLogout}
          title="Sign Out"
        >
          <span className="text-lg">🚪</span>
          <span className="hidden sm:inline">Sign Out</span>
        </Button>
      </div>
    </aside>
  );
}
