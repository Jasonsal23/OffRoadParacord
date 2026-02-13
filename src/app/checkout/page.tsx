'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, MapPin, Package } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { ShippingAddress } from '@/types';
import SquarePaymentForm from '@/components/SquarePaymentForm';

const US_STATES = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'US',
  });

  const [formErrors, setFormErrors] = useState<Partial<Record<keyof ShippingAddress, string>>>({});

  // Calculate totals
  const subtotal = cart.totalPrice;
  const shippingCost = 0; // Free shipping
  const taxRate = 0; // No tax for now (can be calculated based on state)
  const tax = subtotal * taxRate;
  const totalAmount = subtotal + shippingCost + tax;

  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof ShippingAddress, string>> = {};

    if (!shippingAddress.firstName.trim()) errors.firstName = 'First name is required';
    if (!shippingAddress.lastName.trim()) errors.lastName = 'Last name is required';
    if (!shippingAddress.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shippingAddress.email)) {
      errors.email = 'Invalid email address';
    }
    if (!shippingAddress.phone.trim()) errors.phone = 'Phone number is required';
    if (!shippingAddress.addressLine1.trim()) errors.addressLine1 = 'Address is required';
    if (!shippingAddress.city.trim()) errors.city = 'City is required';
    if (!shippingAddress.state) errors.state = 'State is required';
    if (!shippingAddress.postalCode.trim()) {
      errors.postalCode = 'ZIP code is required';
    } else if (!/^\d{5}(-\d{4})?$/.test(shippingAddress.postalCode)) {
      errors.postalCode = 'Invalid ZIP code';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field: keyof ShippingAddress, value: string) => {
    setShippingAddress((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handlePaymentSuccess = async (token: string) => {
    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourceId: token,
          items: cart.items.map((item) => ({
            productId: item.product.id,
            productName: item.product.name,
            quantity: item.quantity,
            unitPrice: item.product.price,
            primaryColor: item.primaryColor,
            secondaryColor: item.secondaryColor,
            customNote: item.customNote,
          })),
          shippingAddress,
          subtotal,
          shippingCost,
          tax,
          totalAmount,
        }),
      });

      const data = await response.json();

      if (data.success) {
        clearCart();
        router.push(`/order-confirmation?orderNumber=${data.orderNumber}`);
      } else {
        setError(data.error || 'Payment failed. Please try again.');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaymentError = (errorMessage: string) => {
    setError(errorMessage);
  };

  const isFormValid =
    shippingAddress.firstName &&
    shippingAddress.lastName &&
    shippingAddress.email &&
    shippingAddress.phone &&
    shippingAddress.addressLine1 &&
    shippingAddress.city &&
    shippingAddress.state &&
    shippingAddress.postalCode;

  if (cart.items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <Package className="w-16 h-16 text-sage mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-offwhite mb-4">Your cart is empty</h1>
        <p className="text-sand mb-8">Add some items to your cart before checking out.</p>
        <Link
          href="/shop"
          className="inline-block bg-paracord hover:bg-paracord-light text-offwhite font-bold px-6 py-3 rounded-lg transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        href="/cart"
        className="inline-flex items-center gap-2 text-sand hover:text-offwhite transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Cart
      </Link>

      <h1 className="text-3xl font-bold text-offwhite tracking-widest mb-8">CHECKOUT</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Shipping & Payment */}
        <div className="space-y-6">
          {/* Shipping Address */}
          <div className="bg-forest-light p-6 rounded-xl border border-sage">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-paracord" />
              <h2 className="text-offwhite font-bold text-lg">Shipping Address</h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sand text-sm mb-1">First Name *</label>
                <input
                  type="text"
                  value={shippingAddress.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className={`w-full bg-forest border ${formErrors.firstName ? 'border-red-500' : 'border-sage'} rounded-lg px-4 py-3 text-offwhite focus:border-paracord focus:outline-none`}
                />
                {formErrors.firstName && (
                  <p className="text-red-400 text-xs mt-1">{formErrors.firstName}</p>
                )}
              </div>
              <div>
                <label className="block text-sand text-sm mb-1">Last Name *</label>
                <input
                  type="text"
                  value={shippingAddress.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className={`w-full bg-forest border ${formErrors.lastName ? 'border-red-500' : 'border-sage'} rounded-lg px-4 py-3 text-offwhite focus:border-paracord focus:outline-none`}
                />
                {formErrors.lastName && (
                  <p className="text-red-400 text-xs mt-1">{formErrors.lastName}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sand text-sm mb-1">Email *</label>
                <input
                  type="email"
                  value={shippingAddress.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full bg-forest border ${formErrors.email ? 'border-red-500' : 'border-sage'} rounded-lg px-4 py-3 text-offwhite focus:border-paracord focus:outline-none`}
                />
                {formErrors.email && (
                  <p className="text-red-400 text-xs mt-1">{formErrors.email}</p>
                )}
              </div>
              <div>
                <label className="block text-sand text-sm mb-1">Phone *</label>
                <input
                  type="tel"
                  value={shippingAddress.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="(555) 555-5555"
                  className={`w-full bg-forest border ${formErrors.phone ? 'border-red-500' : 'border-sage'} rounded-lg px-4 py-3 text-offwhite focus:border-paracord focus:outline-none`}
                />
                {formErrors.phone && (
                  <p className="text-red-400 text-xs mt-1">{formErrors.phone}</p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sand text-sm mb-1">Street Address *</label>
              <input
                type="text"
                value={shippingAddress.addressLine1}
                onChange={(e) => handleInputChange('addressLine1', e.target.value)}
                className={`w-full bg-forest border ${formErrors.addressLine1 ? 'border-red-500' : 'border-sage'} rounded-lg px-4 py-3 text-offwhite focus:border-paracord focus:outline-none`}
              />
              {formErrors.addressLine1 && (
                <p className="text-red-400 text-xs mt-1">{formErrors.addressLine1}</p>
              )}
            </div>

            <div className="mt-4">
              <label className="block text-sand text-sm mb-1">
                Apt, Suite, etc. <span className="text-sand/60">(optional)</span>
              </label>
              <input
                type="text"
                value={shippingAddress.addressLine2}
                onChange={(e) => handleInputChange('addressLine2', e.target.value)}
                className="w-full bg-forest border border-sage rounded-lg px-4 py-3 text-offwhite focus:border-paracord focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <label className="block text-sand text-sm mb-1">City *</label>
                <input
                  type="text"
                  value={shippingAddress.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className={`w-full bg-forest border ${formErrors.city ? 'border-red-500' : 'border-sage'} rounded-lg px-4 py-3 text-offwhite focus:border-paracord focus:outline-none`}
                />
                {formErrors.city && (
                  <p className="text-red-400 text-xs mt-1">{formErrors.city}</p>
                )}
              </div>
              <div>
                <label className="block text-sand text-sm mb-1">State *</label>
                <select
                  value={shippingAddress.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  className={`w-full bg-forest border ${formErrors.state ? 'border-red-500' : 'border-sage'} rounded-lg px-4 py-3 text-offwhite focus:border-paracord focus:outline-none`}
                >
                  <option value="">Select</option>
                  {US_STATES.map((state) => (
                    <option key={state.value} value={state.value}>
                      {state.value}
                    </option>
                  ))}
                </select>
                {formErrors.state && (
                  <p className="text-red-400 text-xs mt-1">{formErrors.state}</p>
                )}
              </div>
              <div>
                <label className="block text-sand text-sm mb-1">ZIP *</label>
                <input
                  type="text"
                  value={shippingAddress.postalCode}
                  onChange={(e) => handleInputChange('postalCode', e.target.value)}
                  maxLength={10}
                  className={`w-full bg-forest border ${formErrors.postalCode ? 'border-red-500' : 'border-sage'} rounded-lg px-4 py-3 text-offwhite focus:border-paracord focus:outline-none`}
                />
                {formErrors.postalCode && (
                  <p className="text-red-400 text-xs mt-1">{formErrors.postalCode}</p>
                )}
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <SquarePaymentForm
            onPaymentSuccess={handlePaymentSuccess}
            onPaymentError={handlePaymentError}
            isProcessing={isProcessing}
            disabled={!isFormValid}
          />

          {error && (
            <div className="p-4 bg-red-900/30 border border-red-500/50 rounded-lg">
              <p className="text-red-400">{error}</p>
            </div>
          )}
        </div>

        {/* Right Column - Order Summary */}
        <div>
          <div className="bg-forest-light p-6 rounded-xl border border-sage sticky top-24">
            <h2 className="text-offwhite font-bold text-lg mb-4">Order Summary</h2>

            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
              {cart.items.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-paracord text-offwhite text-xs font-bold rounded-full flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-offwhite font-medium text-sm">{item.product.name}</p>
                    <p className="text-sand text-xs">
                      {item.primaryColor} / {item.secondaryColor}
                    </p>
                    {item.customNote && (
                      <p className="text-sand/70 text-xs italic mt-1">Note: {item.customNote}</p>
                    )}
                  </div>
                  <p className="text-offwhite font-medium">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-sage pt-4 space-y-2">
              <div className="flex justify-between text-sand">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sand">
                <span>Shipping</span>
                <span className="text-green-500">FREE</span>
              </div>
              {tax > 0 && (
                <div className="flex justify-between text-sand">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-offwhite font-bold text-lg pt-2 border-t border-sage">
                <span>Total</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-forest rounded-lg">
              <p className="text-sand text-sm">
                <span className="font-semibold text-offwhite">Processing Time:</span> 5-7 business
                days
              </p>
              <p className="text-sand text-sm mt-1">
                <span className="font-semibold text-offwhite">Shipping:</span> USPS Ground Advantage
                (3-5 days)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
