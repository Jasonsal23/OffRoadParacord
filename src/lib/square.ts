import { SquareClient, SquareEnvironment } from 'square';

// Initialize Square client
export const squareClient = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN,
  environment:
    process.env.NEXT_PUBLIC_SQUARE_ENVIRONMENT === 'production'
      ? SquareEnvironment.Production
      : SquareEnvironment.Sandbox,
});

export const SQUARE_LOCATION_ID = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID!;
export const SQUARE_APP_ID = process.env.NEXT_PUBLIC_SQUARE_APP_ID!;

// Generate a unique order number (ORP = Off Road Paracord)
export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ORP-${timestamp}-${random}`;
}

// Convert dollars to cents (Square uses cents)
export function dollarsToCents(dollars: number): bigint {
  return BigInt(Math.round(dollars * 100));
}

// Convert cents to dollars
export function centsToDollars(cents: bigint | number): number {
  return Number(cents) / 100;
}
