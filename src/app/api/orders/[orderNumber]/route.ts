import { NextRequest, NextResponse } from 'next/server';
import { getOrderByNumber, updateOrderTracking } from '@/lib/orders-store';

// GET order by order number
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ orderNumber: string }> }
) {
  try {
    const { orderNumber } = await params;

    if (!orderNumber) {
      return NextResponse.json(
        { success: false, error: 'Order number is required' },
        { status: 400 }
      );
    }

    const order = getOrderByNumber(orderNumber.toUpperCase());

    if (!order) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    // Return order without sensitive payment details
    return NextResponse.json({
      success: true,
      order: {
        orderNumber: order.orderNumber,
        status: order.status,
        items: order.items,
        shippingAddress: {
          firstName: order.shippingAddress.firstName,
          lastName: order.shippingAddress.lastName,
          city: order.shippingAddress.city,
          state: order.shippingAddress.state,
          postalCode: order.shippingAddress.postalCode,
        },
        subtotal: order.subtotal,
        shippingCost: order.shippingCost,
        tax: order.tax,
        totalAmount: order.totalAmount,
        trackingNumber: order.trackingNumber,
        trackingCarrier: order.trackingCarrier,
        estimatedDelivery: order.estimatedDelivery,
        createdAt: order.createdAt,
        shippedAt: order.shippedAt,
        deliveredAt: order.deliveredAt,
      },
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch order' },
      { status: 500 }
    );
  }
}

// PATCH to update tracking information (for admin use)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ orderNumber: string }> }
) {
  try {
    const { orderNumber } = await params;
    const body = await request.json();
    const { trackingNumber, carrier, estimatedDelivery, adminKey } = body;

    // Simple admin key check (in production, use proper authentication)
    if (adminKey !== process.env.ADMIN_SECRET_KEY) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (!orderNumber) {
      return NextResponse.json(
        { success: false, error: 'Order number is required' },
        { status: 400 }
      );
    }

    if (!trackingNumber || !carrier) {
      return NextResponse.json(
        { success: false, error: 'Tracking number and carrier are required' },
        { status: 400 }
      );
    }

    const updatedOrder = updateOrderTracking(
      orderNumber.toUpperCase(),
      trackingNumber,
      carrier,
      estimatedDelivery
    );

    if (!updatedOrder) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Tracking information updated',
      order: {
        orderNumber: updatedOrder.orderNumber,
        status: updatedOrder.status,
        trackingNumber: updatedOrder.trackingNumber,
        trackingCarrier: updatedOrder.trackingCarrier,
        estimatedDelivery: updatedOrder.estimatedDelivery,
        shippedAt: updatedOrder.shippedAt,
      },
    });
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update order' },
      { status: 500 }
    );
  }
}
