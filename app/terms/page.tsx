import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service - Ideora',
  description: 'Terms of Service for Ideora',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="mx-auto max-w-4xl px-4 py-12 md:py-20">
        <div className="mb-8">
          <Link href="/" className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">
            ← Back to home
          </Link>
        </div>

        <div
          className="rounded-2xl border p-8 md:p-12 space-y-8"
          style={{
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(10px) saturate(200%)',
            borderColor: 'rgba(255, 255, 255, 0.3)',
          }}
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Terms of Service</h1>
            <p className="text-foreground/60">Last updated: January 2024</p>
          </div>

          <section className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-3">1. Acceptance of Terms</h2>
              <p className="text-foreground/80 leading-relaxed">
                By accessing and using StillaTrends, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-3">2. Use License</h2>
              <p className="text-foreground/80 leading-relaxed">
                Permission is granted to temporarily download one copy of the materials (information or software) on StillaTrends for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-2 text-foreground/80">
                <li>Modifying or copying the materials</li>
                <li>Using the materials for any commercial purpose or for any public display</li>
                <li>Attempting to decompile or reverse engineer any software contained on the site</li>
                <li>Removing any copyright or other proprietary notations from the materials</li>
                <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-3">3. Disclaimer</h2>
              <p className="text-foreground/80 leading-relaxed">
                The materials on StillaTrends are provided "as is". StillaTrends makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-3">4. Limitations</h2>
              <p className="text-foreground/80 leading-relaxed">
                In no event shall StillaTrends or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on StillaTrends.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-3">5. Accuracy of Materials</h2>
              <p className="text-foreground/80 leading-relaxed">
                The materials appearing on StillaTrends could include technical, typographical, or photographic errors. StillaTrends does not warrant that any of the materials on the site are accurate, complete, or current.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-3">6. Links</h2>
              <p className="text-foreground/80 leading-relaxed">
                StillaTrends has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by StillaTrends of the site. Use of any such linked website is at the user's own risk.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-3">7. Modifications</h2>
              <p className="text-foreground/80 leading-relaxed">
                StillaTrends may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-3">8. Governing Law</h2>
              <p className="text-foreground/80 leading-relaxed">
                These terms and conditions are governed by and construed in accordance with the laws of the United States, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </div>
          </section>

          <div className="pt-6 border-t border-white/20">
            <p className="text-sm text-foreground/60">
              Questions about our Terms of Service? Please <Link href="/contact" className="text-indigo-600 hover:text-indigo-700 font-medium">contact us</Link>.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
