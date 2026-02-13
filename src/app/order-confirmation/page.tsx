'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Package, Truck, Mail, ArrowRight } from 'lucide-react';
import { Order } from '@/types';

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderNumber) {
      setLoading(false);
      return;
    }

    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders/${orderNumber}`);
        const data = await response.json();

        if (data.success) {
          setOrder(data.order);
        } else {
          setError(data.error);
        }
      } catch (err) {
        console.error('Error fetching order:', err);
        setError('Failed to load order details');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderNumber]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="animate-pulse">
          <div className="w-20 h-20 bg-sage rounded-full mx-auto mb-6" />
          <div className="h-8 bg-sage rounded w-64 mx-auto mb-4" />
          <div className="h-4 bg-sage rounded w-48 mx-auto" />
        </div>
      </div>
    );
  }

  if (!orderNumber) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <Package className="w-16 h-16 text-sage mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-offwhite mb-4">No Order Found</h1>
        <p className="text-sand mb-8">We couldn&apos;t find an order to display.</p>
        <Link
          href="/shop"
          className="inline-block bg-paracord hover:bg-paracord-light text-offwhite font-bold px-6 py-3 rounded-lg transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Success Header */}
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-offwhite" />
        </div>
        <h1 className="text-3xl font-bold text-offwhite mb-2">Order Confirmed!</h1>
        <p className="text-sand text-lg">Thank you for your purchase</p>
      </div>

      {/* Order Number */}
      <div className="bg-forest-light p-6 rounded-xl border border-sage text-center mb-8">
        <p className="text-sand text-sm mb-1">Order Number</p>
        <p className="text-2xl font-bold text-paracord tracking-wider">{orderNumber}</p>
        <p className="text-sand/70 text-sm mt-2">Save this number for your records</p>
      </div>

      {/* What's Next */}
      <div className="bg-forest-light p-6 rounded-xl border border-sage mb-8">
        <h2 className="text-offwhite font-bold text-lg mb-4">What&apos;s Next?</h2>

        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-paracord/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-paracord" />
            </div>
            <div>
              <p className="text-offwhite font-medium">Confirmation Email</p>
              <p className="text-sand text-sm">
                You&apos;ll receive an email confirmation with your order details shortly.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 bg-paracord/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Package className="w-5 h-5 text-paracord" />
            </div>
            <div>
              <p className="text-offwhite font-medium">Handcrafted with Care</p>
              <p className="text-sand text-sm">
                Your order will be handmade within 5-7 business days. Each piece is crafted with
                attention to detail.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 bg-paracord/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Truck className="w-5 h-5 text-paracord" />
            </div>
            <div>
              <p className="text-offwhite font-medium">Shipping Notification</p>
              <p className="text-sand text-sm">
                Once shipped, you&apos;ll receive tracking information via email. Delivery typically
                takes 3-5 business days via USPS.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Details */}
      {order && !error && (
        <div className="bg-forest-light p-6 rounded-xl border border-sage mb-8">
          <h2 className="text-offwhite font-bold text-lg mb-4">Order Details</h2>

          <div className="space-y-3 mb-6">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between items-start">
                <div>
                  <p className="text-offwhite">
                    {item.productName} <span className="text-sand">x{item.quantity}</span>
                  </p>
                  <p className="text-sand text-sm">
                    {item.primaryColor} / {item.secondaryColor}
                  </p>
                  {item.customNote && (
                    <p className="text-sand/70 text-xs italic">Note: {item.customNote}</p>
                  )}
                </div>
                <p className="text-offwhite">${item.totalPrice.toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-sage pt-4 space-y-2">
            <div className="flex justify-between text-sand">
              <span>Subtotal</span>
              <span>${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sand">
              <span>Shipping</span>
              <span className="text-green-500">FREE</span>
            </div>
            <div className="flex justify-between text-offwhite font-bold text-lg pt-2 border-t border-sage">
              <span>Total</span>
              <span>${order.totalAmount.toFixed(2)}</span>
            </div>
          </div>

          {order.shippingAddress && (
            <div className="mt-6 pt-4 border-t border-sage">
              <p className="text-sand text-sm mb-2">Shipping to:</p>
              <p className="text-offwhite">
                {order.shippingAddress.firstName} {order.shippingAddress.lastName}
              </p>
              <p className="text-sand text-sm">
                {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                {order.shippingAddress.postalCode}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href={`/order-status?orderNumber=${orderNumber}`}
          className="flex-1 flex items-center justify-center gap-2 bg-forest-light border border-sage hover:border-paracord text-offwhite font-bold px-6 py-3 rounded-lg transition-colors"
        >
          Track Your Order
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="/shop"
          className="flex-1 flex items-center justify-center gap-2 bg-paracord hover:bg-paracord-light text-offwhite font-bold px-6 py-3 rounded-lg transition-colors"
        >
          Continue Shopping
        </Link>
      </div>

      {/* Contact Info */}
      <div className="mt-12 text-center">
        <p className="text-sand">
          Questions about your order? Contact us at{' '}
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

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="animate-pulse">
            <div className="w-20 h-20 bg-sage rounded-full mx-auto mb-6" />
            <div className="h-8 bg-sage rounded w-64 mx-auto mb-4" />
            <div className="h-4 bg-sage rounded w-48 mx-auto" />
          </div>
        </div>
      }
    >
      <OrderConfirmationContent />
    </Suspense>
  );
}
