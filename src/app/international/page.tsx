import Link from 'next/link';
import { Globe, ExternalLink, ArrowLeft } from 'lucide-react';

export default function InternationalPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sand hover:text-offwhite transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-paracord/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Globe className="w-10 h-10 text-paracord" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-offwhite tracking-widest mb-4">
          INTERNATIONAL CUSTOMERS
        </h1>
        <div className="w-16 h-1 bg-paracord mx-auto rounded" />
      </div>

      <div className="bg-forest-light p-8 rounded-xl border border-sage text-center">
        <p className="text-offwhite text-lg mb-4">
          Thank you for your interest in Off-Road Paracord!
        </p>
        <p className="text-sand mb-6">
          Unfortunately, this website currently only ships within the United States. However, we
          would be glad to process your order for international shipping through our Etsy store.
        </p>
        <p className="text-sand mb-8">
          You&apos;ll find our full product line available with international shipping options
          calculated at checkout.
        </p>

        <a
          href="https://www.etsy.com/shop/OffroadParacord"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-paracord hover:bg-paracord-light text-offwhite font-bold px-8 py-4 rounded-lg transition-colors text-lg"
        >
          Shop on Etsy
          <ExternalLink className="w-5 h-5" />
        </a>

        <p className="text-sand/70 text-sm mt-8">
          Questions? Reach out to us at{' '}
          <a
            href="mailto:contactoffroadparacord@gmail.com"
            className="text-paracord hover:underline"
          >
            contactoffroadparacord@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}
