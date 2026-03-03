import { AuthLayout } from '@/components/auth/auth-layout';
import { LoginForm } from '@/components/auth/login-form';

export const metadata = {
  title: 'Sign In - Ideora',
  description: 'Sign in to your Ideora account',
};

export default function LoginPage() {
  return (
    <AuthLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Welcome back</h2>
          <p className="mt-2 text-foreground/60">Sign in to access your insights</p>
        </div>
        <LoginForm />
      </div>
    </AuthLayout>
  );
}
