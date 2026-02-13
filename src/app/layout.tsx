import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Off-Road Paracord | Handcrafted Grab Handles for Jeeps & Tacomas',
  description:
    'Premium handcrafted 550 paracord grab handles for Jeep Wranglers and Toyota Tacomas. Made in the USA with military-grade materials.',
  keywords: ['paracord', 'grab handles', 'Jeep', 'Tacoma', 'off-road', 'accessories'],
  openGraph: {
    title: 'Off-Road Paracord',
    description: 'Handcrafted Grab Handles for the Trail',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-forest text-offwhite min-h-screen flex flex-col gap-0">
        <CartProvider>
          <Header />
          <main className="flex-grow m-0 p-0">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
