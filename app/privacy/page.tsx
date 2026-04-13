import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy - Ideora',
  description: 'Privacy Policy for Ideora',
};

export default function PrivacyPage() {
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
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Privacy Policy</h1>
            <p className="text-foreground/60">Last updated: January 2024</p>
          </div>

          <section className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-3">1. Introduction</h2>
              <p className="text-foreground/80 leading-relaxed">
                Ideora ("we", "us", "our", or "Company") operates the Ideora website. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our service and the choices you have associated with that data.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-3">2. Information Collection and Use</h2>
              <p className="text-foreground/80 leading-relaxed mb-3">
                We collect several different types of information for various purposes to provide and improve our service to you.
              </p>
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Types of Data Collected:</h3>
                  <ul className="list-disc list-inside space-y-1 text-foreground/80">
                    <li>Email address</li>
                    <li>First and last name</li>
                    <li>Cookies and usage data</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-3">3. Use of Data</h2>
              <p className="text-foreground/80 leading-relaxed">
                Ideora uses the collected data for various purposes:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-2 text-foreground/80">
                <li>To provide and maintain our service</li>
                <li>To notify you about changes to our service</li>
                <li>To provide customer support</li>
                <li>To gather analysis or valuable information so we can improve our service</li>
                <li>To monitor the usage of our service</li>
                <li>To detect, prevent and address technical issues</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-3">4. Cookies and Tracking Technologies</h2>
              <p className="text-foreground/80 leading-relaxed">
                We use cookies and similar tracking technologies to track activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-3">5. Security of Data</h2>
              <p className="text-foreground/80 leading-relaxed">
                The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-3">6. Service Providers</h2>
              <p className="text-foreground/80 leading-relaxed">
                We may employ third party companies and individuals to facilitate our service ("Service Providers"), to provide the service on our behalf, to perform service-related services, or to assist us in analyzing how our service is used.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-3">7. Links to Other Sites</h2>
              <p className="text-foreground/80 leading-relaxed">
                Our service may contain links to other sites that are not operated by us. If you click on a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-3">8. Children's Privacy</h2>
              <p className="text-foreground/80 leading-relaxed">
                Our service does not address anyone under the age of 18 ("Children"). We do not knowingly collect personally identifiable information from anyone under the age of 18.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-3">9. Changes to This Privacy Policy</h2>
              <p className="text-foreground/80 leading-relaxed">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "effective date" at the top of this Privacy Policy.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-3">10. Contact Us</h2>
              <p className="text-foreground/80 leading-relaxed">
                If you have any questions about this Privacy Policy, please <Link href="/contact" className="text-indigo-600 hover:text-indigo-700 font-medium">contact us</Link>.
              </p>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
