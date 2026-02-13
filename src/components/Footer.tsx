import Link from 'next/link';
import { Mail, Instagram, Facebook } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-forest-dark border-t border-sage mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Contact Section */}
          <div>
            <h3 className="text-paracord font-bold text-sm tracking-widest uppercase mb-4">
              Contact
            </h3>
            <a
              href="mailto:contactoffroadparacord@gmail.com"
              className="flex items-center gap-3 text-sand hover:text-offwhite transition-colors mb-4"
            >
              <Mail className="w-4 h-4" />
              contactoffroadparacord@gmail.com
            </a>
            <div className="flex gap-4 mt-4">
              <a
                href="https://instagram.com/offroadparacord"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-sage rounded-full flex items-center justify-center hover:bg-sage-light transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-5 h-5 text-offwhite" />
              </a>
              <a
                href="https://facebook.com/offroadparacord"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-sage rounded-full flex items-center justify-center hover:bg-sage-light transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="w-5 h-5 text-offwhite" />
              </a>
            </div>
          </div>

          {/* Policies Section */}
          <div>
            <h3 className="text-paracord font-bold text-sm tracking-widest uppercase mb-4">
              Policies & Help
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/order-status" className="text-offwhite hover:text-sand transition-colors">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-offwhite hover:text-sand transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-offwhite hover:text-sand transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-offwhite hover:text-sand transition-colors">
                  30-Day Returns
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-offwhite hover:text-sand transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-offwhite hover:text-sand transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Accessibility Section */}
          <div>
            <h3 className="text-paracord font-bold text-sm tracking-widest uppercase mb-4">
              Accessibility
            </h3>
            <p className="text-offwhite/80 text-sm leading-relaxed mb-3">
              We are committed to making our website accessible to everyone. Our site follows
              WCAG 2.1 guidelines.
            </p>
            <Link
              href="/accessibility"
              className="text-offwhite hover:text-sand transition-colors text-sm"
            >
              Accessibility Statement
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-sage mt-10 pt-6 text-center">
          <p className="text-offwhite/70 text-sm">
            © {currentYear} Off-Road Paracord. All rights reserved.
          </p>
          <p className="text-sand text-sm font-medium tracking-wide mt-1">
            Handcrafted in the USA
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
