'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { Filter } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { ProductCategory } from '@/types';

type CategoryFilter = 'all' | ProductCategory;

const filterOptions: { key: CategoryFilter; label: string }[] = [
  { key: 'all', label: 'All Products' },
  { key: 'headrest-handles', label: 'Headrest Handles' },
  { key: 'roof-rack-handles', label: 'Roof-Rack Handles'},
  { key: 'pets', label: 'Pets' },
  { key: 'accessories', label: 'Accessories' },
  { key: 'jeep-wrangler', label: 'Jeep Wrangler'}
];

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get category from URL, default to 'all'
  const categoryParam = searchParams.get('category');
  const selectedCategory: CategoryFilter =
    categoryParam && filterOptions.some(opt => opt.key === categoryParam)
      ? (categoryParam as CategoryFilter)
      : 'all';

  const handleCategoryChange = (category: CategoryFilter) => {
    if (category === 'all') {
      router.push('/shop', { scroll: false });
    } else {
      router.push(`/shop?category=${category}`, { scroll: false });
    }
  };

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((product) => product.categories.includes(selectedCategory));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-offwhite tracking-widest">SHOP</h1>
        <div className="w-16 h-1 bg-paracord mx-auto mt-4 mb-4 rounded" />
        <p className="text-sand">Browse our complete collection of handcrafted paracord accessories</p>
      </div>

      {/* Filter Section */}
      <div className="mb-8 border-b border-sage pb-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-offwhite" />
          <span className="text-offwhite font-semibold">Filter by Category</span>
        </div>
        <div className="flex flex-wrap gap-3">
          {filterOptions.map((option) => (
            <button
              key={option.key}
              onClick={() => handleCategoryChange(option.key)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === option.key
                  ? 'bg-paracord text-offwhite'
                  : 'bg-forest-light border border-sage text-offwhite hover:border-paracord'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <p className="text-sand/80 text-sm mb-6">
        Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
      </p>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-offwhite text-xl font-bold mb-2">No products found</p>
          <p className="text-sand">Try selecting a different category</p>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-offwhite tracking-widest">SHOP</h1>
          <div className="w-16 h-1 bg-paracord mx-auto mt-4 mb-4 rounded" />
          <p className="text-sand">Loading products...</p>
        </div>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
