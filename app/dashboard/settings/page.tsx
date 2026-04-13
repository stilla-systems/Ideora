'use client';

import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/dashboard/sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/lib/auth-context';
import { getUserPreferences, saveUserPreferences, updateUserPlatforms, updateUserNiches } from '@/lib/user-preferences';
import { toast } from 'sonner';

const PLATFORMS = ['TikTok', 'YouTube', 'X', 'Threads', 'Facebook'];
const NICHES = ['Entertainment', 'Education', 'News & Opinion', 'Creator Content', 'Community', 'Wellness', 'Comedy', 'Technology'];

export default function SettingsPage() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    platform: 'TikTok',
    niche: '',
    notifications: false,
    weeklyDigest: false,
  });
  const [preferences, setPreferences] = useState(
    user ? getUserPreferences(user.id) : {
      userId: '',
      selectedPlatforms: [] as string[],
      selectedNiches: [] as string[],
      updateFrequency: 'daily' as 'daily' | 'weekly' | 'monthly',
      emailNotifications: true,
    }
  );

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name,
        email: user.email,
      }));
      const userPrefs = getUserPreferences(user.id);
      setPreferences(userPrefs);
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const togglePlatform = (platform: string) => {
    const newPlatforms = preferences.selectedPlatforms.includes(platform)
      ? preferences.selectedPlatforms.filter((p) => p !== platform)
      : [...preferences.selectedPlatforms, platform];
    const updated = { ...preferences, selectedPlatforms: newPlatforms };
    setPreferences(updated);
    if (user) updateUserPlatforms(user.id, newPlatforms);
  };

  const toggleNiche = (niche: string) => {
    const newNiches = preferences.selectedNiches.includes(niche)
      ? preferences.selectedNiches.filter((n) => n !== niche)
      : [...preferences.selectedNiches, niche];
    const updated = { ...preferences, selectedNiches: newNiches };
    setPreferences(updated);
    if (user) updateUserNiches(user.id, newNiches);
  };

  const handlePreferenceChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const updated = {
      ...preferences,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    };
    setPreferences(updated);
    if (user) saveUserPreferences(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      saveUserPreferences(preferences);
      toast.success('Profile saved', { description: 'Your settings have been updated.' });
    } else {
      toast.error('Not signed in', { description: 'Sign in to save your settings.' });
    }
  };

  const handleDeleteAccount = () => {
    toast.error('Account deletion', {
      description: 'Please contact hello@ideora.com to delete your account.',
      duration: 6000,
    });
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        <div className="px-4 sm:px-8 py-6 space-y-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Settings</h1>
            <p className="mt-2 text-foreground/60">Manage your account and preferences</p>
          </div>

          {/* Profile Settings */}
          <div className="max-w-2xl">
            <h2 className="mb-4 text-xl font-bold">Profile Information</h2>
            <div className="p-6 rounded-2xl shadow-lg border border-white/10 bg-card">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="border-white/10 rounded-lg border bg-white/5"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="border-white/10 rounded-lg border bg-white/5"
                    />
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="platform">Primary Platform</Label>
                    <select
                      id="platform"
                      name="platform"
                      value={formData.platform}
                      onChange={handleChange}
                      className="border-white/10 rounded-lg px-3 py-2 text-sm w-full bg-white/5 border"
                    >
                      {PLATFORMS.map((p) => <option key={p}>{p}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="niche">Content Niche</Label>
                    <Input
                      id="niche"
                      name="niche"
                      placeholder="e.g. Tech, Lifestyle…"
                      value={formData.niche}
                      onChange={handleChange}
                      className="border-white/10 rounded-lg border bg-white/5"
                    />
                  </div>
                </div>

                <Button type="submit" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg">
                  Save Profile
                </Button>
              </form>
            </div>
          </div>

          {/* Platform Selection */}
          <div className="max-w-4xl">
            <h2 className="mb-4 text-xl font-bold">Active Platforms</h2>
            <div className="p-6 rounded-2xl border border-white/10 bg-card">
              <div className="flex flex-wrap gap-3">
                {PLATFORMS.map((platform) => (
                  <button
                    key={platform}
                    type="button"
                    onClick={() => togglePlatform(platform)}
                    className={`px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200 border ${
                      preferences.selectedPlatforms.includes(platform)
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-500/20'
                        : 'bg-white/5 text-foreground/70 border-white/10 hover:bg-white/10 hover:text-foreground'
                    }`}
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Niche Selection */}
          <div className="max-w-4xl">
            <h2 className="mb-4 text-xl font-bold">Content Niches</h2>
            <div className="p-6 rounded-2xl border border-white/10 bg-card">
              <div className="flex flex-wrap gap-3">
                {NICHES.map((niche) => (
                  <button
                    key={niche}
                    type="button"
                    onClick={() => toggleNiche(niche)}
                    className={`px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200 border ${
                      preferences.selectedNiches.includes(niche)
                        ? 'bg-cyan-600 text-white border-cyan-600 shadow-lg shadow-cyan-500/20'
                        : 'bg-white/5 text-foreground/70 border-white/10 hover:bg-white/10 hover:text-foreground'
                    }`}
                  >
                    {niche}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="max-w-2xl">
            <h2 className="mb-4 text-xl font-bold">Notifications</h2>
            <div className="p-6 space-y-6 rounded-2xl border border-white/10 bg-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">Email Notifications</p>
                  <p className="text-sm text-foreground/60">Get notified when new trends match your niche</p>
                </div>
                <input
                  type="checkbox"
                  name="emailNotifications"
                  checked={preferences.emailNotifications}
                  onChange={handlePreferenceChange}
                  className="h-5 w-5 rounded accent-indigo-600"
                />
              </div>

              <div className="border-t border-white/10 pt-6 flex items-center justify-between">
                <div>
                  <p className="font-semibold">Update Frequency</p>
                  <p className="text-sm text-foreground/60">How often you receive recommendations</p>
                </div>
                <select
                  name="updateFrequency"
                  value={preferences.updateFrequency}
                  onChange={handlePreferenceChange}
                  className="px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-sm"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="max-w-2xl pb-8">
            <h2 className="mb-4 text-xl font-bold text-red-400">Danger Zone</h2>
            <div className="p-6 rounded-2xl border border-red-500/20 bg-red-500/5">
              <p className="font-semibold mb-2">Delete Account</p>
              <p className="text-sm text-foreground/60 mb-4">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <Button
                variant="destructive"
                className="bg-red-600 hover:bg-red-700"
                onClick={handleDeleteAccount}
                type="button"
              >
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
