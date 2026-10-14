import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for DROP. — how we collect, use, and protect your personal data.',
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <main className="bg-[#0F1112] min-h-screen text-white">
      <div className="max-w-3xl mx-auto px-8 py-24 md:py-32">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white text-xs font-bold tracking-[0.2em] uppercase mb-12 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Home
        </Link>

        <h1
          className="text-white mb-4"
          style={{
            fontFamily: '"Anton", "Bebas Neue", "Druk Condensed", Impact, sans-serif',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 900,
            lineHeight: 1,
          }}
        >
          Privacy Policy
        </h1>
        <p className="text-white/40 text-sm font-medium mb-12">
          Last updated: 14 October 2026
        </p>

        <div className="prose prose-invert prose-sm max-w-none space-y-8 text-white/70 leading-relaxed">
          <section>
            <h2 className="text-white text-lg font-black uppercase tracking-wider mb-3">1. Information We Collect</h2>
            <p>
              You can browse our products without creating an account or submitting a form. If you choose to join the individual waitlist or submit a business enquiry through the forms below the product section, we collect the information you provide:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Name and email address (provided during waitlist signup)</li>
              <li>City and where you would drink DROP. (optional waitlist fields)</li>
              <li>Business name, contact name, work email address, and business type (business enquiry fields)</li>
              <li>Phone number and estimated monthly volume (optional business enquiry fields)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-lg font-black uppercase tracking-wider mb-3">2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Process and manage waitlist registrations</li>
              <li>Send product launch announcements and updates (you can unsubscribe at any time)</li>
              <li>Respond to B2B enquiries and partnership requests</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-lg font-black uppercase tracking-wider mb-3">3. Data Storage and Security</h2>
            <p>
              We store submitted waitlist and business enquiry details to manage registrations and respond to requests. Neither form asks you to create an account or provide a password. To request correction or deletion of your submitted information, contact founder@dropwater.in.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-black uppercase tracking-wider mb-3">4. Third-Party Services</h2>
            <p>We use the following essential services to operate our website:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Vercel for website hosting and deployment</li>
              <li>MongoDB Atlas for secure database storage</li>
              <li>Upstash Redis for security rate-limiting</li>
            </ul>
            <p className="mt-2 text-[#C9A84C] font-bold">
              We do not sell or share your personal data with third parties. We do not use any third-party marketing or tracking SDKs.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-black uppercase tracking-wider mb-3">5. Cookies</h2>
            <p>
              We do not use any third-party tracking cookies or marketing cookies. Any cookies used are strictly essential for website functionality and security rate-limiting.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-black uppercase tracking-wider mb-3">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Request access to your personal data</li>
              <li>Request correction or deletion of your personal data</li>
              <li>Withdraw consent for communications at any time</li>
              <li>Request a copy of your data in a portable format</li>
            </ul>
            <p className="mt-2">
              To exercise any of these rights, contact us at <a href="mailto:founder@dropwater.in" className="text-[#C9A84C] hover:underline">founder@dropwater.in</a>.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-black uppercase tracking-wider mb-3">7. Contact</h2>
            <p>
              For any questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:founder@dropwater.in" className="text-[#C9A84C] hover:underline">founder@dropwater.in</a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
