import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for DROP. — the rules governing your use of our website and services.',
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsPage() {
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
          Terms of Service
        </h1>
        <p className="text-white/40 text-sm font-medium mb-12">
          Last updated: 14 October 2026
        </p>

        <div className="prose prose-invert prose-sm max-w-none space-y-8 text-white/70 leading-relaxed">
          <section>
            <h2 className="text-white text-lg font-black uppercase tracking-wider mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing and using the DROP. website (dropwater.in), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-black uppercase tracking-wider mb-3">2. Description of Service</h2>
            <p>
              DROP. is a premium canned water brand. Our website provides information about our products, lets individuals join our launch waitlist, and lets businesses submit wholesale enquiries through the forms below the product section. You do not need to create an account to browse our products or submit either form. DROP. has not yet launched commercially; all product references are pre-launch.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-black uppercase tracking-wider mb-3">3. Information You Provide Through Our Forms</h2>
            <p>
              Both forms are voluntary. The individual waitlist form collects your name and email address, with optional fields for your city and where you would drink DROP. We use these details to manage your registration and contact you about the product launch. You can ask to leave the waitlist by emailing{' '}
              <a href="mailto:founder@dropwater.in" className="text-[#C9A84C] hover:underline">founder@dropwater.in</a>.
            </p>
            <p className="mt-3">
              Submitting a business enquiry through the form below the product section is voluntary. The form asks for your business name, contact name, work email address, and business type. You may also provide a phone number and estimated monthly volume. Please provide accurate information and only contact details you are authorised to share.
            </p>
            <p className="mt-3">
              We use the information submitted with your business enquiry to respond to your request, discuss wholesale requirements, and follow up on that enquiry. For details about how information is handled, please read our{' '}
              <Link href="/privacy" className="text-[#C9A84C] hover:underline">Privacy Policy</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-black uppercase tracking-wider mb-3">4. Enquiries and Product Availability</h2>
            <p>
              Joining the waitlist or submitting a business enquiry does not constitute a purchase, confirmed order, or binding supply agreement, and does not guarantee product availability. Product details, pricing, availability, and launch timelines may change. Any business order or supply arrangement must be agreed separately with DROP.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-black uppercase tracking-wider mb-3">5. Intellectual Property</h2>
            <p>
              All content on this website — including text, graphics, logos, images, and software — is the property of DROP. and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our written consent.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-black uppercase tracking-wider mb-3">6. Limitation of Liability</h2>
            <p>
              DROP. provides this website on an &quot;as is&quot; basis. We make no warranties, expressed or implied, regarding the accuracy or completeness of the content. To the maximum extent permitted by law, DROP. shall not be liable for any indirect, incidental, or consequential damages arising from your use of this website.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-black uppercase tracking-wider mb-3">7. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-black uppercase tracking-wider mb-3">8. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms of Service at any time. Changes will be posted on this page with an updated revision date. Continued use of the website after changes constitutes acceptance of the modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-black uppercase tracking-wider mb-3">9. Contact</h2>
            <p>
              For questions about these Terms, contact us at{' '}
              <a href="mailto:founder@dropwater.in" className="text-[#C9A84C] hover:underline">founder@dropwater.in</a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
