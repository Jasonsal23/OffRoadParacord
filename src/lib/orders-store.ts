import { Order } from '@/types';

// Simple in-memory order store
// In production, replace this with a real database (Supabase, Firebase, MongoDB, etc.)

const orders: Map<string, Order> = new Map();

export function saveOrder(order: Order): void {
  orders.set(order.id, order);
  // Also index by order number for easy lookup
  orders.set(order.orderNumber, order);
}

export function getOrderById(id: string): Order | undefined {
  return orders.get(id);
}

export function getOrderByNumber(orderNumber: string): Order | undefined {
  return orders.get(orderNumber);
}

export function updateOrder(id: string, updates: Partial<Order>): Order | undefined {
  const order = orders.get(id);
  if (!order) return undefined;

  const updatedOrder: Order = {
    ...order,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  orders.set(id, updatedOrder);
  orders.set(order.orderNumber, updatedOrder);

  return updatedOrder;
}

export function updateOrderTracking(
  orderNumber: string,
  trackingNumber: string,
  carrier: string,
  estimatedDelivery?: string
): Order | undefined {
  const order = orders.get(orderNumber);
  if (!order) return undefined;

  return updateOrder(order.id, {
    trackingNumber,
    trackingCarrier: carrier,
    estimatedDelivery,
    status: 'shipped',
    shippedAt: new Date().toISOString(),
  });
}

export function getAllOrders(): Order[] {
  // Return unique orders (avoid duplicates from double-indexing)
  const uniqueOrders = new Map<string, Order>();
  orders.forEach((order) => {
    uniqueOrders.set(order.id, order);
  });
  return Array.from(uniqueOrders.values());
}
