import Link from 'next/link';

export default function ReturnsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-offwhite tracking-widest mb-4">30-DAY RETURNS</h1>
      <div className="w-16 h-1 bg-paracord mb-10 rounded" />

      <div className="space-y-8 text-offwhite/90">
        <section>
          <h2 className="text-paracord font-bold text-xl mb-3">Our Promise</h2>
          <p className="leading-relaxed">
            We stand behind the quality of our handcrafted products. If you&apos;re not completely
            satisfied with your purchase, we offer a <strong>30-day return policy</strong> from the
            date of delivery.
          </p>
        </section>

        <section>
          <h2 className="text-paracord font-bold text-xl mb-3">Return Eligibility</h2>
          <p className="leading-relaxed mb-4">To be eligible for a return, items must be:</p>
          <ul className="list-disc list-inside space-y-2 text-sand">
            <li>Unused and in original condition</li>
            <li>Returned within 30 days of delivery</li>
            <li>Accompanied by proof of purchase</li>
          </ul>
        </section>

        <section>
          <h2 className="text-paracord font-bold text-xl mb-3">Custom Orders</h2>
          <p className="leading-relaxed">
            Since all of our products are custom-made to your specifications (color choices, length adjustments, etc.),
            we cannot accept returns on custom orders unless there is a defect in craftsmanship.
            If you receive a defective item, please contact us immediately and we will make it right.
          </p>
        </section>

        <section>
          <h2 className="text-paracord font-bold text-xl mb-3">How to Return</h2>
          <p className="leading-relaxed mb-4">To initiate a return:</p>
          <ol className="list-decimal list-inside space-y-2 text-sand">
            <li>Email us at <a href="mailto:contactoffroadparacord@gmail.com" className="text-paracord hover:underline">contactoffroadparacord@gmail.com</a></li>
            <li>Include your order number and reason for return</li>
            <li>We&apos;ll provide you with return instructions</li>
            <li>Ship the item back to us (customer pays return shipping)</li>
          </ol>
        </section>

        <section>
          <h2 className="text-paracord font-bold text-xl mb-3">Refunds</h2>
          <p className="leading-relaxed">
            Once we receive your return, we&apos;ll inspect the item and process your refund within
            5-7 business days. Refunds will be issued to the original payment method.
          </p>
        </section>

        <section>
          <h2 className="text-paracord font-bold text-xl mb-3">Exchanges</h2>
          <p className="leading-relaxed">
            Need a different color or size? We&apos;re happy to work with you on exchanges.
            Contact us and we&apos;ll help you get exactly what you need.
          </p>
        </section>

        <section className="bg-forest-light p-6 rounded-xl border border-sage">
          <h2 className="text-offwhite font-bold text-lg mb-2">Need Help?</h2>
          <p className="text-sand">
            Questions about returns? Reach out at{' '}
            <a href="mailto:contactoffroadparacord@gmail.com" className="text-paracord hover:underline">
              contactoffroadparacord@gmail.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
