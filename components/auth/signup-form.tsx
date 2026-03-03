'use client';

import React from "react"

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signUp } from '@/lib/auth';

export function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    setMounted(true);
    const plan = searchParams.get('plan');
    if (plan) {
      setSelectedPlan(plan.charAt(0).toUpperCase() + plan.slice(1));
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    const { user, error: authError } = await signUp(formData.email, formData.password, formData.name);

    if (authError) {
      setError(authError);
      setLoading(false);
      return;
    }

    if (user) {
      router.push('/dashboard');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      {mounted && selectedPlan && (
        <div className="rounded-lg bg-violet-500/10 border border-violet-500/20 p-3 text-sm text-foreground">
          <p>
            <span className="font-medium">Selected Plan:</span>{' '}
            <span className="text-violet-400">{selectedPlan}</span>
          </p>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="John Doe"
          value={formData.name}
          onChange={handleChange}
          className="border-white/20 bg-white/50 dark:bg-white/5 rounded-lg border"
          disabled={loading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
          className="border-white/20 bg-white/50 dark:bg-white/5 rounded-lg border"
          disabled={loading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          className="border-white/20 bg-white/50 dark:bg-white/5 rounded-lg border"
          disabled={loading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="••••••••"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="border-white/20 bg-white/50 dark:bg-white/5 rounded-lg border"
          disabled={loading}
        />
      </div>

      {error && (
        <div className="rounded-lg bg-red-100 p-3 text-sm text-red-800 dark:bg-red-900/30 dark:text-red-200">
          {error}
        </div>
      )}

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 text-white font-semibold transition-all duration-300 disabled:opacity-50"
        disabled={loading}
        aria-label={loading ? 'Creating your account' : 'Create account and start free trial'}
        aria-busy={loading}
      >
        {loading ? 'Creating account...' : 'Create Account'}
      </Button>

      <p className="text-center text-sm text-foreground/60">
        Already have an account?{' '}
        <Link href="/auth/login" className="font-semibold text-indigo-600 hover:text-indigo-700">
          Sign in
        </Link>
      </p>
    </form>
  );
}
