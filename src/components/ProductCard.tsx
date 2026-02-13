'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [primaryColor, setPrimaryColor] = useState(product.colors[0]);
  const [secondaryColor, setSecondaryColor] = useState(product.colors[1] || product.colors[0]);
  const [customPrimaryColor, setCustomPrimaryColor] = useState('');
  const [customSecondaryColor, setCustomSecondaryColor] = useState('');
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const finalPrimary = primaryColor === 'Custom' ? customPrimaryColor : primaryColor;
    const finalSecondary = secondaryColor === 'Custom' ? customSecondaryColor : secondaryColor;
    addToCart(product, 1, finalPrimary, finalSecondary);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.stopPropagation();
  };

  const handleCustomColorChange = (value: string): string => {
    // Only allow letters, spaces, and hyphens (no numbers)
    return value.replace(/[^a-zA-Z\s-]/g, '');
  };

  const formatPrice = (price: number): string => {
    return `$${price.toFixed(2)}`;
  };

  return (
    <Link href={`/shop/${product.id}`} className="block">
      <div className="bg-forest-light rounded-xl overflow-hidden border border-sage hover:border-paracord transition-colors group cursor-pointer">
        {/* Product Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          {product.featured && (
            <span className="absolute top-1 left-1 sm:top-3 sm:left-3 bg-paracord text-offwhite text-[10px] sm:text-xs font-bold px-1.5 sm:px-3 py-0.5 sm:py-1 rounded tracking-wider">
              FEATURED
            </span>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-offwhite font-bold tracking-wider">OUT OF STOCK</span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-2 sm:p-4 flex flex-col">
          <h3 className="text-offwhite font-bold text-sm sm:text-lg mb-2 sm:mb-3 line-clamp-2">{product.name}</h3>

          {/* Color Selection */}
          <div className="mb-2 sm:mb-3 flex-shrink-0">
            <div className="grid grid-cols-2 gap-1 sm:gap-2 mb-1 sm:mb-2">
              <div>
                <label className="text-offwhite/70 text-[10px] sm:text-xs block mb-0.5 sm:mb-1">Primary</label>
                <select
                  value={primaryColor}
                  onChange={(e) => { handleSelectChange(e); setPrimaryColor(e.target.value); }}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full bg-forest border border-sage rounded px-1 sm:px-2 py-1 sm:py-1.5 text-offwhite text-[10px] sm:text-xs focus:border-paracord focus:outline-none"
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
                    onClick={(e) => e.stopPropagation()}
                    placeholder="Enter color"
                    className="w-full mt-1 bg-forest border border-sage rounded px-1 sm:px-2 py-1 sm:py-1.5 text-offwhite text-[10px] sm:text-xs focus:border-paracord focus:outline-none placeholder:text-sand/50"
                  />
                )}
              </div>
              <div>
                <label className="text-offwhite/70 text-[10px] sm:text-xs block mb-0.5 sm:mb-1">Secondary</label>
                <select
                  value={secondaryColor}
                  onChange={(e) => { handleSelectChange(e); setSecondaryColor(e.target.value); }}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full bg-forest border border-sage rounded px-1 sm:px-2 py-1 sm:py-1.5 text-offwhite text-[10px] sm:text-xs focus:border-paracord focus:outline-none"
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
                    onClick={(e) => e.stopPropagation()}
                    placeholder="Enter color"
                    className="w-full mt-1 bg-forest border border-sage rounded px-1 sm:px-2 py-1 sm:py-1.5 text-offwhite text-[10px] sm:text-xs focus:border-paracord focus:outline-none placeholder:text-sand/50"
                  />
                )}
              </div>
            </div>
            <p className="text-sand/60 text-[8px] sm:text-[10px] leading-tight hidden sm:block">
              Primary: center of handle • Secondary: sides & inside
            </p>
          </div>

          {/* Price and Add to Cart */}
          <div className="flex items-center justify-between mt-auto gap-1">
            <span className="text-paracord text-base sm:text-xl font-bold">{formatPrice(product.price)}</span>
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg font-semibold text-xs sm:text-base transition-colors ${
                addedToCart
                  ? 'bg-green-600 text-offwhite'
                  : product.inStock
                  ? 'bg-sage hover:bg-sage-light text-offwhite'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              {addedToCart ? (
                <>
                  <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Added!</span>
                  <span className="sm:hidden">✓</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Add</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
