import { Header } from '@/components/landing/header';
import { PricingSection } from '@/components/landing/pricing';
import { Footer } from '@/components/landing/footer';

export const metadata = {
  title: 'Pricing - Ideora',
  description: 'Simple, transparent pricing for content and live growth direction',
};

export default function PricingPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-20 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
              Content & Live Growth Direction
            </h1>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Simple pricing for what to post, when to go live, and why it matters for your growth
            </p>
          </div>
        </div>
      </div>
      <section>
        <PricingSection />
      </section>
      <Footer />
    </main>
  );
}
