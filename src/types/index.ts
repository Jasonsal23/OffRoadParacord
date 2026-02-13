// Product Types
export type ProductCategory = 'headrest-handles' | 'pets' | 'accessories' | 'roof-rack-handles' | 'jeep-wrangler';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categories: ProductCategory[];
  inStock: boolean;
  featured: boolean;
  colors: string[];
  vehicleCompatibility: ('Prinsu Roof Rack' | 'Jeep Wrangler' | 'Toyota Tacoma' | 'Universal')[];
}

// Cart Types
export interface CartItem {
  product: Product;
  quantity: number;
  primaryColor: string;
  secondaryColor: string;
  customNote?: string;
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

// Shipping Address
export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

// Order Types
export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderLineItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  primaryColor: string;
  secondaryColor: string;
  customNote?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  squareOrderId?: string;
  squarePaymentId?: string;
  items: OrderLineItem[];
  shippingAddress: ShippingAddress;
  subtotal: number;
  shippingCost: number;
  tax: number;
  totalAmount: number;
  status: OrderStatus;
  trackingNumber?: string;
  trackingCarrier?: string;
  estimatedDelivery?: string;
  createdAt: string;
  updatedAt: string;
  paidAt?: string;
  shippedAt?: string;
  deliveredAt?: string;
}

// Checkout Types
export interface CheckoutFormData {
  shippingAddress: ShippingAddress;
  billingAddressSame: boolean;
  billingAddress?: ShippingAddress;
}

export interface PaymentResult {
  success: boolean;
  orderId?: string;
  orderNumber?: string;
  error?: string;
}
