'use client';

import Link from 'next/link';
/* eslint-disable @next/next/no-img-element */
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

const Header = () => {
  const { cart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '/story', label: 'Our Story' },
  ];

  return (
    <header className="bg-forest border-b border-sage sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/logo.png?v=3"
              alt="Off-Road Paracord"
              className="w-14 h-14 md:w-16 md:h-16 object-contain"
            />
            <div className="hidden sm:block">
              <p className="text-offwhite font-bold tracking-wider text-sm">OFF-ROAD</p>
              <p className="text-sand text-xs tracking-widest">PARACORD</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-offwhite hover:text-paracord transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center gap-4">
            <Link
              href="/cart"
              className="relative p-2 text-offwhite hover:text-paracord transition-colors"
              aria-label={`Shopping cart with ${cart.totalItems} items`}
            >
              <ShoppingCart className="w-6 h-6" />
              {cart.totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-paracord text-offwhite text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.totalItems > 99 ? '99+' : cart.totalItems}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-offwhite"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-sage">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-3 text-offwhite hover:text-paracord transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
