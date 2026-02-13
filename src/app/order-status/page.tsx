'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Search,
  Package,
  CheckCircle,
  Truck,
  MapPin,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { Order, OrderStatus } from '@/types';

const STATUS_STEPS: { status: OrderStatus; label: string; icon: typeof Package }[] = [
  { status: 'confirmed', label: 'Order Confirmed', icon: CheckCircle },
  { status: 'processing', label: 'Being Crafted', icon: Package },
  { status: 'shipped', label: 'Shipped', icon: Truck },
  { status: 'delivered', label: 'Delivered', icon: MapPin },
];

function getStatusIndex(status: OrderStatus): number {
  const index = STATUS_STEPS.findIndex((step) => step.status === status);
  return index >= 0 ? index : 0;
}

function getTrackingUrl(carrier: string, trackingNumber: string): string {
  const carrierLower = carrier.toLowerCase();
  if (carrierLower.includes('usps')) {
    return `https://tools.usps.com/go/TrackConfirmAction?tLabels=${trackingNumber}`;
  }
  if (carrierLower.includes('ups')) {
    return `https://www.ups.com/track?tracknum=${trackingNumber}`;
  }
  if (carrierLower.includes('fedex')) {
    return `https://www.fedex.com/fedextrack/?trknbr=${trackingNumber}`;
  }
  return '#';
}

function OrderStatusContent() {
  const searchParams = useSearchParams();
  const initialOrderNumber = searchParams.get('orderNumber') || '';

  const [orderNumber, setOrderNumber] = useState(initialOrderNumber);
  const [searchInput, setSearchInput] = useState(initialOrderNumber);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(!!initialOrderNumber);

  useEffect(() => {
    if (initialOrderNumber) {
      fetchOrder(initialOrderNumber);
    }
  }, [initialOrderNumber]);

  const fetchOrder = async (number: string) => {
    if (!number.trim()) return;

    setLoading(true);
    setError(null);
    setSearched(true);

    try {
      const response = await fetch(`/api/orders/${number.toUpperCase()}`);
      const data = await response.json();

      if (data.success) {
        setOrder(data.order);
        setOrderNumber(number.toUpperCase());
      } else {
        setOrder(null);
        setError(data.error || 'Order not found');
      }
    } catch (err) {
      console.error('Error fetching order:', err);
      setOrder(null);
      setError('Failed to look up order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrder(searchInput);
  };

  const currentStatusIndex = order ? getStatusIndex(order.status) : -1;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-offwhite tracking-widest mb-2">ORDER STATUS</h1>
      <p className="text-sand mb-8">Track your order and see its current status.</p>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sand" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value.toUpperCase())}
              placeholder="Enter your order number (e.g., ORP-XXXXX-XXXX)"
              className="w-full bg-forest-light border border-sage rounded-lg pl-12 pr-4 py-3 text-offwhite placeholder:text-sand/50 focus:border-paracord focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !searchInput.trim()}
            className="bg-paracord hover:bg-paracord-light disabled:bg-sage/50 text-offwhite font-bold px-6 py-3 rounded-lg transition-colors disabled:cursor-not-allowed"
          >
            {loading ? 'Searching...' : 'Track'}
          </button>
        </div>
      </form>

      {/* Error State */}
      {error && searched && (
        <div className="bg-forest-light p-8 rounded-xl border border-sage text-center">
          <Package className="w-16 h-16 text-sage mx-auto mb-4" />
          <h2 className="text-xl font-bold text-offwhite mb-2">Order Not Found</h2>
          <p className="text-sand mb-4">
            We couldn&apos;t find an order with that number. Please check and try again.
          </p>
          <p className="text-sand/70 text-sm">
            Order numbers start with &quot;ORP-&quot; and are included in your confirmation email.
          </p>
        </div>
      )}

      {/* Order Details */}
      {order && (
        <div className="space-y-6">
          {/* Order Header */}
          <div className="bg-forest-light p-6 rounded-xl border border-sage">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-sand text-sm">Order Number</p>
                <p className="text-xl font-bold text-paracord">{order.orderNumber}</p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-sand text-sm">Order Date</p>
                <p className="text-offwhite">
                  {new Date(order.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Status Timeline */}
          <div className="bg-forest-light p-6 rounded-xl border border-sage">
            <h2 className="text-offwhite font-bold text-lg mb-6">Order Progress</h2>

            <div className="relative">
              {/* Progress Line */}
              <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-sage" />
              <div
                className="absolute left-5 top-0 w-0.5 bg-paracord transition-all duration-500"
                style={{
                  height: `${(currentStatusIndex / (STATUS_STEPS.length - 1)) * 100}%`,
                }}
              />

              {/* Status Steps */}
              <div className="space-y-8">
                {STATUS_STEPS.map((step, index) => {
                  const isCompleted = index <= currentStatusIndex;
                  const isCurrent = index === currentStatusIndex;
                  const Icon = step.icon;

                  return (
                    <div key={step.status} className="flex gap-4 relative">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10 transition-colors ${
                          isCompleted ? 'bg-paracord' : 'bg-sage'
                        } ${isCurrent ? 'ring-4 ring-paracord/30' : ''}`}
                      >
                        <Icon
                          className={`w-5 h-5 ${isCompleted ? 'text-offwhite' : 'text-offwhite/50'}`}
                        />
                      </div>
                      <div className="flex-1 pt-1">
                        <p
                          className={`font-medium ${isCompleted ? 'text-offwhite' : 'text-sand/70'}`}
                        >
                          {step.label}
                        </p>
                        {isCurrent && order.status !== 'delivered' && (
                          <p className="text-sand text-sm mt-1">
                            {order.status === 'confirmed' &&
                              'Your order has been received and will begin processing soon.'}
                            {order.status === 'processing' &&
                              'Your items are being handcrafted with care.'}
                            {order.status === 'shipped' &&
                              'Your order is on its way!'}
                          </p>
                        )}
                        {step.status === 'shipped' && order.shippedAt && (
                          <p className="text-sand/70 text-sm">
                            Shipped on{' '}
                            {new Date(order.shippedAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </p>
                        )}
                        {step.status === 'delivered' && order.deliveredAt && (
                          <p className="text-sand/70 text-sm">
                            Delivered on{' '}
                            {new Date(order.deliveredAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Tracking Info */}
          {order.trackingNumber && (
            <div className="bg-forest-light p-6 rounded-xl border border-sage">
              <h2 className="text-offwhite font-bold text-lg mb-4">Tracking Information</h2>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className="text-sand text-sm">Carrier</p>
                  <p className="text-offwhite">{order.trackingCarrier}</p>
                </div>
                <div>
                  <p className="text-sand text-sm">Tracking Number</p>
                  <p className="text-offwhite font-mono">{order.trackingNumber}</p>
                </div>
                <a
                  href={getTrackingUrl(order.trackingCarrier || 'USPS', order.trackingNumber)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-paracord hover:bg-paracord-light text-offwhite font-bold px-4 py-2 rounded-lg transition-colors"
                >
                  Track Package
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {order.estimatedDelivery && (
                <div className="mt-4 pt-4 border-t border-sage flex items-center gap-2">
                  <Clock className="w-4 h-4 text-paracord" />
                  <p className="text-sand">
                    Estimated delivery:{' '}
                    <span className="text-offwhite">{order.estimatedDelivery}</span>
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Order Items */}
          <div className="bg-forest-light p-6 rounded-xl border border-sage">
            <h2 className="text-offwhite font-bold text-lg mb-4">Order Items</h2>

            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-start py-2">
                  <div>
                    <p className="text-offwhite">
                      {item.productName} <span className="text-sand">x{item.quantity}</span>
                    </p>
                    <p className="text-sand text-sm">
                      {item.primaryColor} / {item.secondaryColor}
                    </p>
                  </div>
                  <p className="text-offwhite">${item.totalPrice.toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-sage mt-4 pt-4">
              <div className="flex justify-between text-offwhite font-bold">
                <span>Total</span>
                <span>${order.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          {order.shippingAddress && (
            <div className="bg-forest-light p-6 rounded-xl border border-sage">
              <h2 className="text-offwhite font-bold text-lg mb-4">Shipping Address</h2>
              <p className="text-offwhite">
                {order.shippingAddress.firstName} {order.shippingAddress.lastName}
              </p>
              <p className="text-sand">
                {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                {order.shippingAddress.postalCode}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Initial State */}
      {!searched && !order && (
        <div className="bg-forest-light p-8 rounded-xl border border-sage text-center">
          <Search className="w-16 h-16 text-sage mx-auto mb-4" />
          <h2 className="text-xl font-bold text-offwhite mb-2">Track Your Order</h2>
          <p className="text-sand">
            Enter your order number above to see the current status of your order.
          </p>
        </div>
      )}

      {/* Help Section */}
      <div className="mt-12 text-center">
        <p className="text-sand mb-2">Need help with your order?</p>
        <Link href="/faq" className="text-paracord hover:underline mr-4">
          View FAQ
        </Link>
        <a href="mailto:contactoffroadparacord@gmail.com" className="text-paracord hover:underline">
          Contact Support
        </a>
      </div>
    </div>
  );
}

export default function OrderStatusPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="animate-pulse">
            <div className="h-8 bg-sage rounded w-48 mb-4" />
            <div className="h-4 bg-sage rounded w-64 mb-8" />
            <div className="h-12 bg-sage rounded mb-8" />
          </div>
        </div>
      }
    >
      <OrderStatusContent />
    </Suspense>
  );
}
