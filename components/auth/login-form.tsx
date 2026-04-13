'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { logIn } from '@/lib/auth';
import { toast } from 'sonner';

export function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { user, error: authError } = await logIn(formData.email, formData.password);

    if (authError) {
      setError(authError);
      toast.error('Sign in failed', { description: authError });
      setLoading(false);
      return;
    }

    if (user) {
      toast.success('Welcome back!', { description: `Signed in as ${user.email}` });
      router.push('/dashboard');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
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
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          className="border-white/20 bg-white/50 dark:bg-white/5 rounded-lg border"
          disabled={loading}
          required
          autoComplete="current-password"
        />
      </div>

      <div className="flex items-center justify-between">
        <Link href="/contact" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
          Forgot password?
        </Link>
      </div>

      {error && (
        <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
        disabled={loading}
      >
        {loading ? 'Signing in…' : 'Sign In'}
      </Button>

      <p className="text-center text-sm text-foreground/60">
        Don&apos;t have an account?{' '}
        <Link href="/auth/signup" className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
          Sign up
        </Link>
      </p>
    </form>
  );
}
