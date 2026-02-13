'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const formatPrice = (price: number): string => {
    return `$${price.toFixed(2)}`;
  };

  // Empty cart state
  if (cart.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <ShoppingBag className="w-16 h-16 text-sage mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-offwhite mb-4">Your cart is empty</h1>
        <p className="text-sand mb-8">
          Browse our shop to find the perfect paracord accessories for your rig.
        </p>
        <Link
          href="/shop"
          className="inline-block bg-paracord hover:bg-paracord-light text-offwhite font-bold px-8 py-3 rounded-lg transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-offwhite tracking-widest">YOUR CART</h1>
        <div className="w-16 h-1 bg-paracord mx-auto mt-4 mb-4 rounded" />
        <p className="text-sand">
          {cart.totalItems} item{cart.totalItems !== 1 ? 's' : ''} in your cart
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cart.items.map((item) => (
              <div
                key={`${item.product.id}-${item.primaryColor}-${item.secondaryColor}`}
                className="bg-forest-light rounded-xl p-4 border border-sage flex gap-4"
              >
                {/* Product Image */}
                <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-grow">
                  <h3 className="text-offwhite font-bold">{item.product.name}</h3>
                  <div className="text-sand text-sm mt-1">
                    <p>
                      Primary: <span className="text-offwhite">{item.primaryColor}</span>
                    </p>
                    <p>
                      Secondary: <span className="text-offwhite">{item.secondaryColor}</span>
                    </p>
                  </div>
                  {item.customNote && (
                    <p className="text-sand/80 text-sm mt-2 italic">
                      Note: <span className="text-offwhite/80">{item.customNote}</span>
                    </p>
                  )}
                  <p className="text-paracord font-semibold mt-1">
                    {formatPrice(item.product.price)}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center bg-forest rounded-lg">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.primaryColor,
                            item.secondaryColor,
                            item.quantity - 1
                          )
                        }
                        className="p-2 text-offwhite hover:text-paracord transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 text-offwhite font-bold">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.primaryColor,
                            item.secondaryColor,
                            item.quantity + 1
                          )
                        }
                        className="p-2 text-offwhite hover:text-paracord transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() =>
                        removeFromCart(item.product.id, item.primaryColor, item.secondaryColor)
                      }
                      className="p-2 text-red-400 hover:text-red-300 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Item Total */}
                <div className="text-right flex-shrink-0">
                  <p className="text-sand text-xs">Total</p>
                  <p className="text-offwhite font-bold">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}

            {/* Clear Cart */}
            <button
              onClick={clearCart}
              className="text-sand hover:text-offwhite underline text-sm transition-colors"
            >
              Clear Cart
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-forest-light rounded-xl p-6 border border-sage h-fit sticky top-24">
          <h2 className="text-offwhite font-bold text-lg tracking-wider mb-6">ORDER SUMMARY</h2>

          {/* Items summary */}
          <div className="space-y-3 mb-4">
            {cart.items.map((item) => (
              <div
                key={`${item.product.id}-${item.primaryColor}-${item.secondaryColor}`}
                className="text-sm"
              >
                <div className="flex justify-between">
                  <span className="text-sand">
                    {item.product.name} x{item.quantity}
                  </span>
                  <span className="text-offwhite">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
                <p className="text-sand/60 text-xs">
                  {item.primaryColor} / {item.secondaryColor}
                </p>
                {item.customNote && (
                  <p className="text-sand/60 text-xs italic truncate">Note: {item.customNote}</p>
                )}
              </div>
            ))}
          </div>

          <div className="border-t border-sage pt-4 space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="text-sand">Subtotal</span>
              <span className="text-offwhite">{formatPrice(cart.totalPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sand">Shipping</span>
              <span className="text-green-500">FREE</span>
            </div>
          </div>

          <div className="border-t border-sage pt-4 mb-6">
            <div className="flex justify-between">
              <span className="text-offwhite font-bold text-lg">Total</span>
              <span className="text-paracord font-bold text-2xl">
                {formatPrice(cart.totalPrice)}
              </span>
            </div>
          </div>

          <Link
            href="/checkout"
            className="w-full flex items-center justify-center gap-2 bg-paracord hover:bg-paracord-light text-offwhite font-bold py-4 rounded-lg transition-colors"
          >
            Proceed to Checkout
            <ArrowRight className="w-5 h-5" />
          </Link>

          <Link
            href="/shop"
            className="block text-center text-sand hover:text-offwhite mt-4 text-sm transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
