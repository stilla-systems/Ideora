'use client';

import { useState, useEffect } from 'react';
import { DashboardShell } from '@/components/dashboard/dashboard-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/lib/auth-context';
import {
  getUserPreferences,
  saveUserPreferences,
  updateUserPlatforms,
  updateUserNiches,
} from '@/lib/user-preferences';
import { Check } from 'lucide-react';

const PLATFORMS = ['TikTok', 'YouTube', 'X', 'Threads', 'Facebook', 'Instagram'];
const NICHES = [
  'Entertainment', 'Education', 'News & Opinion', 'Creator Content',
  'Community', 'Wellness', 'Comedy', 'Technology', 'Finance', 'Lifestyle',
];

const CARD_STYLE = {
  background: 'rgba(255,255,255,0.015)',
  backdropFilter: 'blur(10px)',
} as const;

export default function SettingsPage() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    platform: 'TikTok',
    niche: '',
  });
  const [preferences, setPreferences] = useState({
    userId: '',
    selectedPlatforms: [] as string[],
    selectedNiches: [] as string[],
    updateFrequency: 'daily' as 'daily' | 'weekly' | 'monthly',
    emailNotifications: true,
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name ?? '',
        email: user.email ?? '',
        platform: 'TikTok',
        niche: '',
      });
      setPreferences(getUserPreferences(user.id));
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSaved(false);
  };

  const togglePlatform = (platform: string) => {
    const next = preferences.selectedPlatforms.includes(platform)
      ? preferences.selectedPlatforms.filter((p) => p !== platform)
      : [...preferences.selectedPlatforms, platform];
    setPreferences((prev) => ({ ...prev, selectedPlatforms: next }));
    if (user) updateUserPlatforms(user.id, next);
    setSaved(false);
  };

  const toggleNiche = (niche: string) => {
    const next = preferences.selectedNiches.includes(niche)
      ? preferences.selectedNiches.filter((n) => n !== niche)
      : [...preferences.selectedNiches, niche];
    setPreferences((prev) => ({ ...prev, selectedNiches: next }));
    if (user) updateUserNiches(user.id, next);
    setSaved(false);
  };

  const handlePreferenceChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value, type } = e.target;
    const updated = {
      ...preferences,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    };
    setPreferences(updated);
    if (user) saveUserPreferences(updated);
    setSaved(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      saveUserPreferences(preferences);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  return (
    <DashboardShell>
      <div className="px-4 md:px-6 py-6 md:py-8 space-y-8 max-w-3xl pb-12">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span className="text-xs font-mono text-gray-500 tracking-widest">SETTINGS</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Account Settings</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your profile and preferences</p>
        </div>

        {/* Profile */}
        <section>
          <h2 className="text-sm font-mono text-gray-500 tracking-widest mb-4">PROFILE</h2>
          <div className="p-5 rounded-xl border border-white/[0.06]" style={CARD_STYLE}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-xs font-mono text-gray-500 tracking-wider">
                    FULL NAME
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="h-9 text-sm bg-white/[0.04] border-white/[0.08] text-white placeholder:text-gray-600 focus-visible:border-cyan-500/40 focus-visible:ring-0"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs font-mono text-gray-500 tracking-wider">
                    EMAIL
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="h-9 text-sm bg-white/[0.04] border-white/[0.08] text-white placeholder:text-gray-600 focus-visible:border-cyan-500/40 focus-visible:ring-0"
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="platform" className="text-xs font-mono text-gray-500 tracking-wider">
                    PRIMARY PLATFORM
                  </Label>
                  <select
                    id="platform"
                    name="platform"
                    value={formData.platform}
                    onChange={handleChange}
                    className="w-full h-9 px-3 rounded-md text-sm bg-white/[0.04] border border-white/[0.08] text-white focus:outline-none focus:border-cyan-500/40"
                  >
                    {PLATFORMS.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="niche" className="text-xs font-mono text-gray-500 tracking-wider">
                    PRIMARY NICHE
                  </Label>
                  <Input
                    id="niche"
                    name="niche"
                    value={formData.niche}
                    onChange={handleChange}
                    placeholder="e.g. Tech, Comedy..."
                    className="h-9 text-sm bg-white/[0.04] border-white/[0.08] text-white placeholder:text-gray-600 focus-visible:border-cyan-500/40 focus-visible:ring-0"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <Button
                  type="submit"
                  size="sm"
                  className="text-xs font-mono h-8"
                  style={{ background: 'linear-gradient(135deg, #00D9FF, #0080FF)', color: '#0A0E27' }}
                >
                  Save Profile
                </Button>
                {saved && (
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                    <Check className="w-3.5 h-3.5" />
                    Saved
                  </div>
                )}
              </div>
            </form>
          </div>
        </section>

        {/* Platforms */}
        <section>
          <h2 className="text-sm font-mono text-gray-500 tracking-widest mb-4">PLATFORMS</h2>
          <div className="p-5 rounded-xl border border-white/[0.06]" style={CARD_STYLE}>
            <p className="text-xs text-gray-500 mb-4">Select which platforms to track and get intelligence for</p>
            <div className="flex flex-wrap gap-2">
              {PLATFORMS.map((p) => {
                const active = preferences.selectedPlatforms.includes(p);
                return (
                  <button
                    key={p}
                    onClick={() => togglePlatform(p)}
                    className={`px-4 py-2 rounded-lg text-xs font-medium transition-all duration-150 border ${
                      active
                        ? 'text-cyan-400 border-cyan-500/30'
                        : 'text-gray-500 border-white/[0.06] hover:text-gray-300 hover:border-white/[0.1]'
                    }`}
                    style={active ? { background: 'rgba(0,217,255,0.08)' } : { background: 'rgba(255,255,255,0.02)' }}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Niches */}
        <section>
          <h2 className="text-sm font-mono text-gray-500 tracking-widest mb-4">NICHES</h2>
          <div className="p-5 rounded-xl border border-white/[0.06]" style={CARD_STYLE}>
            <p className="text-xs text-gray-500 mb-4">Select niches to personalize your opportunity feed</p>
            <div className="flex flex-wrap gap-2">
              {NICHES.map((n) => {
                const active = preferences.selectedNiches.includes(n);
                return (
                  <button
                    key={n}
                    onClick={() => toggleNiche(n)}
                    className={`px-4 py-2 rounded-lg text-xs font-medium transition-all duration-150 border ${
                      active
                        ? 'text-violet-400 border-violet-500/30'
                        : 'text-gray-500 border-white/[0.06] hover:text-gray-300 hover:border-white/[0.1]'
                    }`}
                    style={active ? { background: 'rgba(176,38,255,0.08)' } : { background: 'rgba(255,255,255,0.02)' }}
                  >
                    {n}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section>
          <h2 className="text-sm font-mono text-gray-500 tracking-widest mb-4">NOTIFICATIONS</h2>
          <div className="p-5 rounded-xl border border-white/[0.06] space-y-5" style={CARD_STYLE}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-white">Email Notifications</p>
                <p className="text-xs text-gray-500 mt-0.5">Get notified when new trends match your niche</p>
              </div>
              <button
                role="switch"
                aria-checked={preferences.emailNotifications}
                onClick={() => {
                  const updated = { ...preferences, emailNotifications: !preferences.emailNotifications };
                  setPreferences(updated);
                  if (user) saveUserPreferences(updated);
                }}
                className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${
                  preferences.emailNotifications ? 'bg-cyan-500' : 'bg-white/[0.08]'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${
                    preferences.emailNotifications ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/[0.05]">
              <div>
                <p className="text-sm font-semibold text-white">Update Frequency</p>
                <p className="text-xs text-gray-500 mt-0.5">How often you want recommendations</p>
              </div>
              <select
                name="updateFrequency"
                value={preferences.updateFrequency}
                onChange={handlePreferenceChange}
                className="h-8 px-3 rounded-lg text-xs bg-white/[0.04] border border-white/[0.08] text-white focus:outline-none focus:border-cyan-500/40"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="pb-8">
          <h2 className="text-sm font-mono text-red-500/60 tracking-widest mb-4">DANGER ZONE</h2>
          <div
            className="p-5 rounded-xl border border-red-500/15"
            style={{ background: 'rgba(239,68,68,0.03)' }}
          >
            <p className="text-sm font-semibold text-white mb-1">Delete Account</p>
            <p className="text-xs text-gray-500 mb-4 leading-relaxed">
              Permanently delete your account and all data. This cannot be undone.
            </p>
            <Button
              size="sm"
              className="text-xs font-mono h-8 bg-red-600/80 hover:bg-red-600 text-white"
            >
              Delete Account
            </Button>
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
