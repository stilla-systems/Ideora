'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signUp } from '@/lib/auth';
import { toast } from 'sonner';

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
      const msg = 'Passwords do not match';
      setError(msg);
      toast.error(msg);
      return;
    }

    if (formData.password.length < 6) {
      const msg = 'Password must be at least 6 characters';
      setError(msg);
      toast.error(msg);
      return;
    }

    setLoading(true);
    const { user, error: authError } = await signUp(
      formData.email,
      formData.password,
      formData.name
    );

    if (authError) {
      setError(authError);
      toast.error('Sign up failed', { description: authError });
      setLoading(false);
      return;
    }

    if (user) {
      toast.success('Account created!', {
        description: 'Welcome to Ideora. Taking you to your dashboard.',
      });
      router.push('/dashboard');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      {mounted && selectedPlan && (
        <div className="rounded-lg bg-violet-500/10 border border-violet-500/20 p-3 text-sm text-foreground">
          <span className="font-medium">Selected Plan: </span>
          <span className="text-violet-400">{selectedPlan}</span>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Jane Smith"
          value={formData.name}
          onChange={handleChange}
          className="border-white/20 bg-white/50 dark:bg-white/5 rounded-lg border"
          disabled={loading}
          required
          autoComplete="name"
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
          required
          autoComplete="email"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="At least 6 characters"
          value={formData.password}
          onChange={handleChange}
          className="border-white/20 bg-white/50 dark:bg-white/5 rounded-lg border"
          disabled={loading}
          required
          autoComplete="new-password"
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
          required
          autoComplete="new-password"
        />
      </div>

      {error && (
        <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 text-white font-semibold transition-all duration-300 disabled:opacity-50"
        disabled={loading}
        aria-busy={loading}
      >
        {loading ? 'Creating account…' : 'Create Account'}
      </Button>

      <p className="text-center text-sm text-foreground/60">
        Already have an account?{' '}
        <Link href="/auth/login" className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
          Sign in
        </Link>
      </p>
    </form>
  );
}
