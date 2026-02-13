import Link from 'next/link';

export default function ShippingPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-offwhite tracking-widest mb-4">SHIPPING INFO</h1>
      <div className="w-16 h-1 bg-paracord mb-10 rounded" />

      <div className="space-y-8 text-offwhite/90">
        <section>
          <h2 className="text-paracord font-bold text-xl mb-3">Processing Time</h2>
          <p className="leading-relaxed">
            All of our products are handmade to order. Please allow <strong>5-7 business days</strong> for
            your order to be crafted before shipping. During busy seasons, processing may take up to 7 business days.
          </p>
        </section>

        <section>
          <h2 className="text-paracord font-bold text-xl mb-3">Shipping Methods</h2>
          <p className="leading-relaxed mb-4">
            We ship all orders via USPS from Las Vegas, Nevada. Shipping options include:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sand">
            <li><strong className="text-offwhite">USPS Ground Advantage:</strong> 3-5 business days</li>
            <li><strong className="text-offwhite">USPS Priority Mail:</strong> 2-3 business days</li>
          </ul>
        </section>

        <section>
          <h2 className="text-paracord font-bold text-xl mb-3">Free Shipping</h2>
          <p className="leading-relaxed">
            We offer <strong>FREE standard shipping</strong> on all orders within the United States.
            No minimum purchase required.
          </p>
        </section>

        <section>
          <h2 className="text-paracord font-bold text-xl mb-3">Order Tracking</h2>
          <p className="leading-relaxed">
            Once your order ships, you will receive an email with tracking information.
            You can use this to monitor your package&apos;s journey to your door.
          </p>
        </section>

        <section>
          <h2 className="text-paracord font-bold text-xl mb-3">International Shipping</h2>
          <p className="leading-relaxed">
            Currently, we only ship within the United States. If you&apos;re located internationally
            and interested in our products, please <Link href="mailto:contactoffroadparacord@gmail.com" className="text-paracord hover:underline">contact us</Link> and
            we&apos;ll do our best to accommodate your request.
          </p>
        </section>

        <section className="bg-forest-light p-6 rounded-xl border border-sage">
          <h2 className="text-offwhite font-bold text-lg mb-2">Questions?</h2>
          <p className="text-sand">
            If you have any questions about shipping, feel free to reach out at{' '}
            <a href="mailto:contactoffroadparacord@gmail.com" className="text-paracord hover:underline">
              contactoffroadparacord@gmail.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
