'use client';

import { useEffect, useRef, useState } from 'react';
import { CreditCard, Lock } from 'lucide-react';

declare global {
  interface Window {
    Square: {
      payments: (appId: string, locationId: string) => Promise<Payments>;
    };
  }
}

interface Payments {
  card: () => Promise<Card>;
}

interface Card {
  attach: (selector: string) => Promise<void>;
  tokenize: () => Promise<TokenizeResult>;
  destroy: () => Promise<void>;
}

interface TokenizeResult {
  status: string;
  token?: string;
  errors?: Array<{ message: string }>;
}

interface SquarePaymentFormProps {
  onPaymentSuccess: (token: string) => void;
  onPaymentError: (error: string) => void;
  isProcessing: boolean;
  disabled: boolean;
}

export default function SquarePaymentForm({
  onPaymentSuccess,
  onPaymentError,
  isProcessing,
  disabled,
}: SquarePaymentFormProps) {
  const cardRef = useRef<Card | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cardError, setCardError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const initializeSquare = async () => {
      try {
        // Wait for the container element to exist
        await new Promise<void>((resolve) => {
          const checkContainer = () => {
            if (document.getElementById('card-container')) {
              resolve();
            } else {
              requestAnimationFrame(checkContainer);
            }
          };
          checkContainer();
        });

        if (!mounted) return;

        // Load Square Web Payments SDK if not already loaded
        if (!window.Square) {
          const script = document.createElement('script');
          script.src =
            process.env.NEXT_PUBLIC_SQUARE_ENVIRONMENT === 'production'
              ? 'https://web.squarecdn.com/v1/square.js'
              : 'https://sandbox.web.squarecdn.com/v1/square.js';
          script.async = true;

          await new Promise<void>((resolve, reject) => {
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('Failed to load Square SDK'));
            document.body.appendChild(script);
          });

          if (!mounted) return;

          // Wait for Square to be available
          await new Promise<void>((resolve) => {
            const check = () => {
              if (window.Square) {
                resolve();
              } else {
                setTimeout(check, 100);
              }
            };
            check();
          });
        }

        if (!mounted) return;

        const appId = process.env.NEXT_PUBLIC_SQUARE_APP_ID;
        const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;

        if (!appId || !locationId) {
          throw new Error('Square configuration missing');
        }

        const payments = await window.Square.payments(appId, locationId);
        const card = await payments.card();

        // Double-check container exists before attaching
        const container = document.getElementById('card-container');
        if (!container) {
          throw new Error('Card container not found');
        }

        await card.attach('#card-container');

        if (mounted) {
          cardRef.current = card;
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Square initialization error:', error);
        if (mounted) {
          setCardError('Failed to load payment form. Please refresh the page.');
          setIsLoading(false);
        }
      }
    };

    initializeSquare();

    return () => {
      mounted = false;
      if (cardRef.current) {
        cardRef.current.destroy();
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cardRef.current || disabled || isProcessing) {
      return;
    }

    setCardError(null);

    try {
      const result = await cardRef.current.tokenize();

      if (result.status === 'OK' && result.token) {
        onPaymentSuccess(result.token);
      } else {
        const errorMessage =
          result.errors?.[0]?.message || 'Payment failed. Please check your card details.';
        setCardError(errorMessage);
        onPaymentError(errorMessage);
      }
    } catch (error) {
      console.error('Tokenization error:', error);
      const errorMessage = 'An error occurred processing your payment.';
      setCardError(errorMessage);
      onPaymentError(errorMessage);
    }
  };

  return (
    <div className="bg-forest-light p-6 rounded-xl border border-sage">
      <div className="flex items-center gap-2 mb-4">
        <CreditCard className="w-5 h-5 text-paracord" />
        <h3 className="text-offwhite font-bold text-lg">Payment Details</h3>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4 relative">
          {isLoading && (
            <div className="absolute inset-0 bg-forest rounded-lg flex items-center justify-center z-10">
              <span className="text-sand/60 text-sm">Loading payment form...</span>
            </div>
          )}
          <div
            id="card-container"
            className="bg-white rounded-lg p-3 min-h-[50px]"
          />
        </div>

        {cardError && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-500/50 rounded-lg">
            <p className="text-red-400 text-sm">{cardError}</p>
          </div>
        )}

        <div className="flex items-center gap-2 text-sand/70 text-xs mb-4">
          <Lock className="w-3 h-3" />
          <span>Your payment is secure and encrypted</span>
        </div>

        <button
          type="submit"
          disabled={isLoading || disabled || isProcessing}
          className={`w-full py-4 rounded-lg font-bold text-lg transition-colors flex items-center justify-center gap-2 ${
            isLoading || disabled || isProcessing
              ? 'bg-sage/50 text-offwhite/50 cursor-not-allowed'
              : 'bg-paracord hover:bg-paracord-light text-offwhite'
          }`}
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-offwhite/30 border-t-offwhite rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Lock className="w-5 h-5" />
              Place Order
            </>
          )}
        </button>
      </form>
    </div>
  );
}
