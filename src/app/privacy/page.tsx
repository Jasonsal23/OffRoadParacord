export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-offwhite tracking-widest mb-4">PRIVACY POLICY</h1>
      <div className="w-16 h-1 bg-paracord mb-10 rounded" />

      <div className="space-y-8 text-offwhite/90">
        <section>
          <h2 className="text-paracord font-bold text-xl mb-3">Our Commitment</h2>
          <p className="leading-relaxed">
            At Off Road Paracord, we respect your privacy and are committed to protecting your
            personal information. This policy explains how we collect, use, and safeguard your data.
          </p>
        </section>

        <section>
          <h2 className="text-paracord font-bold text-xl mb-3">Information We Collect</h2>
          <p className="leading-relaxed mb-4">When you make a purchase, we collect:</p>
          <ul className="list-disc list-inside space-y-2 text-sand">
            <li>Name and contact information</li>
            <li>Shipping and billing address</li>
            <li>Email address</li>
            <li>Payment information (processed securely by our payment provider)</li>
            <li>Order details and preferences</li>
          </ul>
        </section>

        <section>
          <h2 className="text-paracord font-bold text-xl mb-3">How We Use Your Information</h2>
          <p className="leading-relaxed mb-4">We use your information to:</p>
          <ul className="list-disc list-inside space-y-2 text-sand">
            <li>Process and fulfill your orders</li>
            <li>Send order confirmations and shipping updates</li>
            <li>Respond to your questions and requests</li>
            <li>Improve our products and services</li>
            <li>Send promotional emails (only with your consent)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-paracord font-bold text-xl mb-3">Information Security</h2>
          <p className="leading-relaxed">
            We implement appropriate security measures to protect your personal information.
            Payment information is encrypted and processed through secure payment providers.
            We never store your full credit card details on our servers.
          </p>
        </section>

        <section>
          <h2 className="text-paracord font-bold text-xl mb-3">Third-Party Services</h2>
          <p className="leading-relaxed">
            We may use third-party services for payment processing, shipping, and analytics.
            These services have their own privacy policies and handle your data according to
            their terms. We only share the minimum information necessary to provide our services.
          </p>
        </section>

        <section>
          <h2 className="text-paracord font-bold text-xl mb-3">Cookies</h2>
          <p className="leading-relaxed">
            Our website may use cookies to enhance your browsing experience and remember your
            preferences. You can disable cookies in your browser settings, though this may
            affect some website functionality.
          </p>
        </section>

        <section>
          <h2 className="text-paracord font-bold text-xl mb-3">Your Rights</h2>
          <p className="leading-relaxed mb-4">You have the right to:</p>
          <ul className="list-disc list-inside space-y-2 text-sand">
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt out of marketing communications</li>
          </ul>
        </section>

        <section>
          <h2 className="text-paracord font-bold text-xl mb-3">Contact Us</h2>
          <p className="leading-relaxed">
            If you have questions about this Privacy Policy or wish to exercise your rights,
            please contact us at{' '}
            <a href="mailto:contactoffroadparacord@gmail.com" className="text-paracord hover:underline">
              contactoffroadparacord@gmail.com
            </a>
          </p>
        </section>

        <p className="text-sand text-sm pt-4">
          Last updated: February 2026
        </p>
      </div>
    </div>
  );
}
