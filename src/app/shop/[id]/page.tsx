'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ShoppingCart, Check, ArrowLeft, Minus, Plus } from 'lucide-react';
import { products, getProductById } from '@/data/products';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const product = getProductById(params.id as string);

  const [primaryColor, setPrimaryColor] = useState(product?.colors[0] || '');
  const [secondaryColor, setSecondaryColor] = useState(product?.colors[1] || product?.colors[0] || '');
  const [customPrimaryColor, setCustomPrimaryColor] = useState('');
  const [customSecondaryColor, setCustomSecondaryColor] = useState('');
  const [customNote, setCustomNote] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleCustomColorChange = (value: string): string => {
    // Only allow letters, spaces, and hyphens (no numbers)
    return value.replace(/[^a-zA-Z\s-]/g, '');
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-forest flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-offwhite mb-4">Product Not Found</h1>
          <Link href="/shop" className="text-paracord hover:underline">
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    const finalPrimary = primaryColor === 'Custom' ? customPrimaryColor : primaryColor;
    const finalSecondary = secondaryColor === 'Custom' ? customSecondaryColor : secondaryColor;
    addToCart(product, quantity, finalPrimary, finalSecondary, customNote || undefined);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const formatPrice = (price: number): string => {
    return `$${price.toFixed(2)}`;
  };

  // Get related products (exclude current product, limit to 3)
  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-forest">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sand hover:text-paracord transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        {/* Product Details */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="relative aspect-square rounded-xl overflow-hidden bg-forest-light border border-sage">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            {product.featured && (
              <span className="absolute top-4 left-4 bg-paracord text-offwhite text-sm font-bold px-4 py-2 rounded tracking-wider">
                FEATURED
              </span>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-bold text-offwhite mb-4">
              {product.name}
            </h1>

            <p className="text-paracord text-3xl font-bold mb-6">
              {formatPrice(product.price)}
            </p>

            <p className="text-sand text-lg leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Vehicle Compatibility */}
            <div className="mb-6">
              <p className="text-offwhite/70 text-sm mb-2">Compatible with:</p>
              <div className="flex flex-wrap gap-2">
                {product.vehicleCompatibility.map((vehicle) => (
                  <span
                    key={vehicle}
                    className="px-3 py-1 bg-forest border border-sage rounded text-offwhite text-sm"
                  >
                    {vehicle}
                  </span>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-6 bg-forest-light p-4 rounded-lg border border-sage">
              <p className="text-offwhite font-semibold mb-3">Choose Your Colors</p>
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <label className="text-offwhite/70 text-sm block mb-2">Primary Color</label>
                  <select
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-full bg-forest border border-sage rounded-lg px-4 py-3 text-offwhite focus:border-paracord focus:outline-none"
                  >
                    {product.colors.map((color) => (
                      <option key={color} value={color}>{color}</option>
                    ))}
                    <option value="Custom">Custom</option>
                  </select>
                  {primaryColor === 'Custom' && (
                    <input
                      type="text"
                      value={customPrimaryColor}
                      onChange={(e) => setCustomPrimaryColor(handleCustomColorChange(e.target.value))}
                      placeholder="Enter custom color"
                      className="w-full mt-2 bg-forest border border-sage rounded-lg px-4 py-3 text-offwhite focus:border-paracord focus:outline-none placeholder:text-sand/50"
                    />
                  )}
                </div>
                <div>
                  <label className="text-offwhite/70 text-sm block mb-2">Secondary Color</label>
                  <select
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    className="w-full bg-forest border border-sage rounded-lg px-4 py-3 text-offwhite focus:border-paracord focus:outline-none"
                  >
                    {product.colors.map((color) => (
                      <option key={color} value={color}>{color}</option>
                    ))}
                    <option value="Custom">Custom</option>
                  </select>
                  {secondaryColor === 'Custom' && (
                    <input
                      type="text"
                      value={customSecondaryColor}
                      onChange={(e) => setCustomSecondaryColor(handleCustomColorChange(e.target.value))}
                      placeholder="Enter custom color"
                      className="w-full mt-2 bg-forest border border-sage rounded-lg px-4 py-3 text-offwhite focus:border-paracord focus:outline-none placeholder:text-sand/50"
                    />
                  )}
                </div>
              </div>
              <p className="text-sand/80 text-sm">
                <span className="font-semibold">Primary:</span> runs down the center of the handle<br />
                <span className="font-semibold">Secondary:</span> runs along the sides and inside
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <p className="text-offwhite/70 text-sm mb-2">Quantity:</p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 bg-forest border border-sage rounded hover:border-paracord transition-colors"
                >
                  <Minus className="w-5 h-5 text-offwhite" />
                </button>
                <span className="text-offwhite text-xl font-bold w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 bg-forest border border-sage rounded hover:border-paracord transition-colors"
                >
                  <Plus className="w-5 h-5 text-offwhite" />
                </button>
              </div>
            </div>

            {/* Custom Note */}
            <div className="mb-8">
              <label className="text-offwhite/70 text-sm block mb-2">
                Custom Note <span className="text-sand/60">(optional)</span>
              </label>
              <textarea
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="Add any special requests, custom length, or additional instructions..."
                rows={3}
                className="w-full bg-forest border border-sage rounded-lg px-4 py-3 text-offwhite focus:border-paracord focus:outline-none placeholder:text-sand/50 resize-none"
              />
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`w-full flex items-center justify-center gap-3 py-4 rounded-lg font-bold text-lg transition-colors ${
                addedToCart
                  ? 'bg-green-600 text-offwhite'
                  : product.inStock
                  ? 'bg-paracord hover:bg-paracord-light text-offwhite'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              {addedToCart ? (
                <>
                  <Check className="w-6 h-6" />
                  Added to Cart!
                </>
              ) : product.inStock ? (
                <>
                  <ShoppingCart className="w-6 h-6" />
                  Add to Cart - {formatPrice(product.price * quantity)}
                </>
              ) : (
                'Out of Stock'
              )}
            </button>

            {/* Stock Status */}
            {product.inStock && (
              <p className="text-green-500 text-sm mt-4 text-center">
                In Stock - Ready to Ship
              </p>
            )}
          </div>
        </div>

        {/* You Might Also Enjoy Section */}
        <section className="mt-16 pt-12 border-t border-sage">
          <h2 className="text-2xl md:text-3xl font-bold text-offwhite mb-8">
            You Might Also Enjoy
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
