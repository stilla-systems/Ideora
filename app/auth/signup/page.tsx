import { AuthLayout } from '@/components/auth/auth-layout';
import { SignUpForm } from '@/components/auth/signup-form';

export const metadata = {
  title: 'Sign Up - Ideora',
  description: 'Create your Ideora account',
};

export default function SignUpPage() {
  return (
    <AuthLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Create your account</h2>
          <p className="mt-2 text-foreground/60">Join thousands of creators discovering trends</p>
        </div>
        <SignUpForm />
      </div>
    </AuthLayout>
  );
}
