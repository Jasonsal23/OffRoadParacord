export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-offwhite tracking-widest mb-4">TERMS OF SERVICE</h1>
      <div className="w-16 h-1 bg-paracord mb-10 rounded" />

      <div className="space-y-8 text-offwhite/90">
        <section>
          <h2 className="text-paracord font-bold text-xl mb-3">Agreement to Terms</h2>
          <p className="leading-relaxed">
            By accessing or using the Off Road Paracord website and purchasing our products,
            you agree to be bound by these Terms of Service. If you do not agree to these terms,
            please do not use our website or services.
          </p>
        </section>

        <section>
          <h2 className="text-paracord font-bold text-xl mb-3">Products and Services</h2>
          <p className="leading-relaxed">
            All products sold by Off Road Paracord are handcrafted accessories designed for
            vehicles. While our products are made with high-quality materials and built to last,
            they are intended as accessories and should be used responsibly. Colors may vary
            slightly due to the handmade nature of our products and monitor display settings.
          </p>
        </section>

        <section>
          <h2 className="text-paracord font-bold text-xl mb-3">Orders and Payment</h2>
          <p className="leading-relaxed">
            All orders are subject to acceptance and availability. We reserve the right to
            refuse or cancel any order for any reason. Payment must be received in full before
            orders are processed. We accept major credit cards and other payment methods as
            displayed at checkout.
          </p>
        </section>

        <section>
          <h2 className="text-paracord font-bold text-xl mb-3">Custom Orders</h2>
          <p className="leading-relaxed">
            Custom orders are made specifically for you based on your color and size selections.
            Please double-check your selections before placing your order, as custom items cannot
            be returned unless defective.
          </p>
        </section>

        <section>
          <h2 className="text-paracord font-bold text-xl mb-3">Intellectual Property</h2>
          <p className="leading-relaxed">
            All content on this website, including images, text, logos, and designs, is the
            property of Off Road Paracord and is protected by copyright laws. You may not
            reproduce, distribute, or use any content without our written permission.
          </p>
        </section>

        <section>
          <h2 className="text-paracord font-bold text-xl mb-3">Limitation of Liability</h2>
          <p className="leading-relaxed">
            Off Road Paracord products are accessories and are not safety equipment. Users assume
            all risk associated with the use of our products. We are not liable for any injuries,
            damages, or losses resulting from the use or misuse of our products.
          </p>
        </section>

        <section>
          <h2 className="text-paracord font-bold text-xl mb-3">Changes to Terms</h2>
          <p className="leading-relaxed">
            We reserve the right to update these Terms of Service at any time. Changes will be
            posted on this page with an updated effective date. Your continued use of our website
            after changes are posted constitutes acceptance of the modified terms.
          </p>
        </section>

        <section>
          <h2 className="text-paracord font-bold text-xl mb-3">Contact</h2>
          <p className="leading-relaxed">
            If you have questions about these Terms of Service, please contact us at{' '}
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
