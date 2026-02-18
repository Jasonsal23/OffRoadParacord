import { NextRequest, NextResponse } from 'next/server';
import { SquareClient, SquareEnvironment } from 'square';
import { randomUUID } from 'crypto';
import { Order, OrderLineItem, ShippingAddress } from '@/types';
import { saveOrder } from '@/lib/orders-store';

// Initialize Square client
const squareClient = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN,
  environment:
    process.env.NEXT_PUBLIC_SQUARE_ENVIRONMENT === 'production'
      ? SquareEnvironment.Production
      : SquareEnvironment.Sandbox,
});

// Generate order number
function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ORP-${timestamp}-${random}`;
}

interface CheckoutRequestBody {
  sourceId: string;
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    primaryColor: string;
    secondaryColor: string;
    customNote?: string;
  }>;
  shippingAddress: ShippingAddress;
  subtotal: number;
  shippingCost: number;
  tax: number;
  totalAmount: number;
}

export async function POST(request: NextRequest) {
  try {
    const body: CheckoutRequestBody = await request.json();
    const { sourceId, items, shippingAddress, subtotal, shippingCost, tax, totalAmount } = body;

    // Validate required fields
    if (!sourceId) {
      return NextResponse.json(
        { success: false, error: 'Payment source is required' },
        { status: 400 }
      );
    }

    if (!items || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Cart is empty' },
        { status: 400 }
      );
    }

    if (!shippingAddress) {
      return NextResponse.json(
        { success: false, error: 'Shipping address is required' },
        { status: 400 }
      );
    }

    if (!process.env.SQUARE_ACCESS_TOKEN) {
      return NextResponse.json(
        { success: false, error: 'Payment system not configured' },
        { status: 500 }
      );
    }

    const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;
    if (!locationId) {
      return NextResponse.json(
        { success: false, error: 'Store location not configured' },
        { status: 500 }
      );
    }

    const idempotencyKey = randomUUID();
    const orderNumber = generateOrderNumber();
    const amountInCents = Math.round(totalAmount * 100);

    // Create Square order first
    const orderResponse = await squareClient.orders.create({
      order: {
        locationId,
        referenceId: orderNumber,
        lineItems: items.map((item) => ({
          name: item.productName,
          quantity: item.quantity.toString(),
          basePriceMoney: {
            amount: BigInt(Math.round(item.unitPrice * 100)),
            currency: 'USD',
          },
          note: [
            `Primary: ${item.primaryColor}`,
            `Secondary: ${item.secondaryColor}`,
            item.customNote ? `Note: ${item.customNote}` : '',
          ]
            .filter(Boolean)
            .join(' | '),
        })),
        fulfillments: [
          {
            type: 'SHIPMENT',
            state: 'PROPOSED',
            shipmentDetails: {
              recipient: {
                displayName: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
                emailAddress: shippingAddress.email,
                phoneNumber: shippingAddress.phone,
                address: {
                  addressLine1: shippingAddress.addressLine1,
                  addressLine2: shippingAddress.addressLine2 || undefined,
                  locality: shippingAddress.city,
                  administrativeDistrictLevel1: shippingAddress.state,
                  postalCode: shippingAddress.postalCode,
                  country: 'US',
                },
              },
            },
          },
        ],
      },
      idempotencyKey: `order-${idempotencyKey}`,
    });

    const squareOrderId = orderResponse.order?.id;

    if (!squareOrderId) {
      return NextResponse.json(
        { success: false, error: 'Failed to create order' },
        { status: 500 }
      );
    }

    // Process payment
    const paymentResponse = await squareClient.payments.create({
      sourceId,
      idempotencyKey: `payment-${idempotencyKey}`,
      amountMoney: {
        amount: BigInt(amountInCents),
        currency: 'USD',
      },
      orderId: squareOrderId,
      locationId,
      buyerEmailAddress: shippingAddress.email,
      shippingAddress: {
        addressLine1: shippingAddress.addressLine1,
        addressLine2: shippingAddress.addressLine2 || undefined,
        locality: shippingAddress.city,
        administrativeDistrictLevel1: shippingAddress.state,
        postalCode: shippingAddress.postalCode,
        country: 'US',
      },
      note: `Order ${orderNumber}`,
    });

    if (!paymentResponse.payment) {
      return NextResponse.json(
        { success: false, error: 'Payment was not processed' },
        { status: 400 }
      );
    }

    const payment = paymentResponse.payment;

    // Create order record
    const orderItems: OrderLineItem[] = items.map((item) => ({
      productId: item.productId,
      productName: item.productName,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      totalPrice: item.unitPrice * item.quantity,
      primaryColor: item.primaryColor,
      secondaryColor: item.secondaryColor,
      customNote: item.customNote,
    }));

    const order: Order = {
      id: randomUUID(),
      orderNumber,
      squareOrderId,
      squarePaymentId: payment.id,
      items: orderItems,
      shippingAddress,
      subtotal,
      shippingCost,
      tax,
      totalAmount,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      paidAt: new Date().toISOString(),
    };

    // Save order to store
    saveOrder(order);

    return NextResponse.json({
      success: true,
      orderId: order.id,
      orderNumber: order.orderNumber,
      paymentId: payment.id,
      status: payment.status,
      receiptUrl: payment.receiptUrl,
    });
  } catch (error: unknown) {
    console.error('Checkout error:', JSON.stringify(error, Object.getOwnPropertyNames(error as object), 2));

    // Handle Square API errors (SDK v44 format)
    const err = error as { errors?: Array<{ detail?: string; code?: string; field?: string; category?: string }>; message?: string; statusCode?: number; body?: string };

    if (err.errors && Array.isArray(err.errors)) {
      const errorDetail = err.errors[0];
      const errorMessage = errorDetail?.detail || err.message || 'Payment failed';

      console.error('Square API error details:', JSON.stringify(err.errors, null, 2));

      if (errorDetail?.code === 'CARD_DECLINED') {
        return NextResponse.json(
          { success: false, error: 'Your card was declined. Please try a different card.' },
          { status: 400 }
        );
      }

      if (errorDetail?.code === 'INVALID_CARD') {
        return NextResponse.json(
          { success: false, error: 'Invalid card details. Please check and try again.' },
          { status: 400 }
        );
      }

      return NextResponse.json({ success: false, error: errorMessage }, { status: 400 });
    }

    // Handle other error formats from SDK v44
    if (err.body) {
      try {
        const bodyError = JSON.parse(err.body);
        console.error('Square API body error:', bodyError);
        const detail = bodyError.errors?.[0]?.detail || 'Payment processing failed';
        return NextResponse.json({ success: false, error: detail }, { status: 400 });
      } catch {
        // body wasn't JSON
      }
    }

    const message = err.message || 'An unexpected error occurred. Please try again.';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
