'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Header } from '@/components/landing/header';
import { HeroSection } from '@/components/landing/hero';
import { IntelligencePreview } from '@/components/landing/intelligence-preview';
import { AuthoritySection } from '@/components/landing/authority-section';
import { DashboardPreview } from '@/components/landing/dashboard-preview';
import { PricingSection } from '@/components/landing/pricing';
import { Footer } from '@/components/landing/footer';

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  return (
    <main className="w-full min-h-screen overflow-x-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex flex-col">
      <Header />
      <HeroSection />
      <IntelligencePreview />
      <AuthoritySection />
      <DashboardPreview />
      <section id="pricing" className="w-full">
        <PricingSection />
      </section>
      <Footer />
    </main>
  );
}
