'use client';

import React from "react"
import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/dashboard/sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/lib/auth-context';
import { getUserPreferences, saveUserPreferences, updateUserPlatforms, updateUserNiches } from '@/lib/user-preferences';

const PLATFORMS = ['TikTok', 'YouTube', 'X', 'Threads', 'Facebook'];
const NICHES = ['Entertainment', 'Education', 'News & Opinion', 'Creator Content', 'Community', 'Wellness', 'Comedy', 'Technology'];

export default function SettingsPage() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    platform: '',
    niche: '',
    notifications: false,
    weeklyDigest: false,
  });
  const [preferences, setPreferences] = useState(
    user ? getUserPreferences(user.id) : {
      userId: '',
      selectedPlatforms: [],
      selectedNiches: [],
      updateFrequency: 'daily',
      emailNotifications: true,
    }
  );
  const [saved, setSaved] = useState(false); // Declare setSaved variable

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
    setSaved(false);
  };

  const togglePlatform = (platform: string) => {
    const newPlatforms = preferences.selectedPlatforms.includes(platform)
      ? preferences.selectedPlatforms.filter((p) => p !== platform)
      : [...preferences.selectedPlatforms, platform];
    
    const updated = { ...preferences, selectedPlatforms: newPlatforms };
    setPreferences(updated);
    if (user) updateUserPlatforms(user.id, newPlatforms);
    setSaved(false);
  };

  const toggleNiche = (niche: string) => {
    const newNiches = preferences.selectedNiches.includes(niche)
      ? preferences.selectedNiches.filter((n) => n !== niche)
      : [...preferences.selectedNiches, niche];
    
    const updated = { ...preferences, selectedNiches: newNiches };
    setPreferences(updated);
    if (user) updateUserNiches(user.id, newNiches);
    setSaved(false);
  };

  const handlePreferenceChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
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
    <div className="flex h-screen bg-background">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        <div className="px-8 py-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="mt-2 text-foreground/60">Manage your account and preferences</p>
          </div>

          {/* Profile Settings */}
          <div className="mb-8 max-w-2xl">
            <h2 className="mb-4 text-xl font-bold">Profile Information</h2>
            <div 
              className="p-6 rounded-2xl shadow-lg border border-white/30 dark:border-white/10"
              style={{
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(10px) saturate(200%)',
              }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="border-white/20 rounded-lg border bg-white/50 dark:bg-white/5"
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
                      className="border-white/20 rounded-lg border bg-white/50 dark:bg-white/5"
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="platform">Primary Platform</Label>
                    <select
                      id="platform"
                      name="platform"
                      value={formData.platform}
                      onChange={handleChange}
                      className="border-white/20 rounded-lg px-3 py-2 text-sm w-full bg-white/50 dark:bg-white/5 border"
                    >
                      <option>TikTok</option>
                      <option>YouTube</option>
                      <option>X</option>
                      <option>Threads</option>
                      <option>Facebook</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="niche">Content Niche</Label>
                    <Input
                      id="niche"
                      name="niche"
                      value={formData.niche}
                      onChange={handleChange}
                      className="border-white/20 rounded-lg border bg-white/50 dark:bg-white/5"
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
          <div className="mb-8 max-w-4xl">
            <h2 className="mb-4 text-xl font-bold">Select Your Platforms</h2>
            <div 
              className="p-6 rounded-2xl shadow-lg border border-white/30 dark:border-white/10"
              style={{
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(10px) saturate(200%)',
              }}
            >
              <div className="flex flex-wrap gap-3">
                {PLATFORMS.map((platform) => (
                  <button
                    key={platform}
                    onClick={() => togglePlatform(platform)}
                    className={`px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200 border ${
                      preferences.selectedPlatforms.includes(platform)
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg'
                        : 'bg-white/20 text-foreground border-white/30 hover:bg-white/30'
                    }`}
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Niche Selection */}
          <div className="mb-8 max-w-4xl">
            <h2 className="mb-4 text-xl font-bold">Select Your Niches</h2>
            <div 
              className="p-6 rounded-2xl shadow-lg border border-white/30 dark:border-white/10"
              style={{
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(10px) saturate(200%)',
              }}
            >
              <div className="flex flex-wrap gap-3">
                {NICHES.map((niche) => (
                  <button
                    key={niche}
                    onClick={() => toggleNiche(niche)}
                    className={`px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200 border ${
                      preferences.selectedNiches.includes(niche)
                        ? 'bg-cyan-600 text-white border-cyan-600 shadow-lg'
                        : 'bg-white/20 text-foreground border-white/30 hover:bg-white/30'
                    }`}
                  >
                    {niche}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="mb-8 max-w-2xl">
            <h2 className="mb-4 text-xl font-bold">Notifications</h2>
            <div 
              className="p-6 space-y-6 rounded-2xl shadow-lg border border-white/30 dark:border-white/10"
              style={{
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(10px) saturate(200%)',
              }}
            >
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
                  className="h-5 w-5 rounded"
                />
              </div>

              <div className="border-t border-white/10 pt-6 flex items-center justify-between">
                <div>
                  <p className="font-semibold">Update Frequency</p>
                  <p className="text-sm text-foreground/60">How often you want to receive recommendations</p>
                </div>
                <select
                  name="updateFrequency"
                  value={preferences.updateFrequency}
                  onChange={handlePreferenceChange}
                  className="px-3 py-2 rounded-lg border border-white/20 bg-white/50 dark:bg-white/5 text-sm"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="mb-8 max-w-2xl">
            <h2 className="mb-4 text-xl font-bold text-red-600">Danger Zone</h2>
            <div 
              className="p-6 border-red-500/20 rounded-2xl shadow-lg border"
              style={{
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(10px) saturate(200%)',
                borderColor: 'rgba(239, 68, 68, 0.2)',
              }}
            >
              <div className="space-y-4">
                <div>
                  <p className="font-semibold mb-2">Delete Account</p>
                  <p className="text-sm text-foreground/60 mb-4">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <Button
                    variant="destructive"
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Delete Account
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
