import HeroVideo from '@/components/HeroVideo';
import ProductCard from '@/components/ProductCard';
import FadeInSection from '@/components/FadeInSection';
import { getFeaturedProducts } from '@/data/products';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const featuredProducts = getFeaturedProducts();

  return (
    <>
      {/* Hero Section */}
      <HeroVideo />

      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <FadeInSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-offwhite tracking-wider">
              FEATURED ITEMS
            </h2>
            <div className="w-16 h-1 bg-paracord mx-auto mt-4 mb-4 rounded" />
            <p className="text-sand">Our most popular paracord grab handles</p>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {featuredProducts.map((product, index) => (
            <FadeInSection key={product.id} delay={index * 100}>
              <ProductCard product={product} />
            </FadeInSection>
          ))}
        </div>

        <FadeInSection delay={400}>
          <div className="text-center mt-10">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-paracord hover:bg-paracord-light text-offwhite font-bold px-8 py-3 rounded-lg transition-colors"
            >
              View All Products
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </FadeInSection>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-forest-dark py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-offwhite tracking-wider">
                WHY OFF-ROAD PARACORD?
              </h2>
              <div className="w-16 h-1 bg-paracord mx-auto mt-4 rounded" />
            </div>
          </FadeInSection>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {[
              {
                icon: '💪',
                title: '550 Paracord',
                description: 'Military-grade paracord rated for 550 lbs breaking strength',
              },
              {
                icon: '🛠️',
                title: 'Easy Install',
                description: 'No tools required – installs in minutes on most vehicles',
              },
              {
                icon: '🇺🇸',
                title: 'Made in USA',
                description: 'Handcrafted with care right here in the United States',
              },
              {
                icon: '🔄',
                title: '30-Day Returns',
                description: 'Not satisfied? Return within 30 days for a full refund',
              },
            ].map((feature, index) => (
              <FadeInSection key={index} delay={index * 100}>
                <div className="bg-sage/30 rounded-xl p-4 sm:p-6 text-center hover:bg-sage/50 transition-colors h-full">
                  <span className="text-3xl sm:text-4xl mb-3 sm:mb-4 block">{feature.icon}</span>
                  <h3 className="text-offwhite font-bold text-sm sm:text-lg mb-1 sm:mb-2">{feature.title}</h3>
                  <p className="text-sand text-xs sm:text-sm">{feature.description}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-paracord py-16">
        <FadeInSection>
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-offwhite tracking-wider mb-4">
              READY TO UPGRADE YOUR RIDE?
            </h2>
            <p className="text-offwhite/90 mb-8">
              Browse our full collection of handcrafted paracord accessories
            </p>
            <Link
              href="/shop"
              className="inline-block bg-forest hover:bg-forest-light text-offwhite font-bold px-10 py-4 rounded-lg transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </FadeInSection>
      </section>
    </>
  );
}
