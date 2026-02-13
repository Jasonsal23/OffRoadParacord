'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product, CartItem, CartState } from '@/types';

// Initial cart state
const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

// Cart action types
type CartAction =
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number; primaryColor: string; secondaryColor: string; customNote?: string } }
  | { type: 'REMOVE_FROM_CART'; payload: { productId: string; primaryColor: string; secondaryColor: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; primaryColor: string; secondaryColor: string; quantity: number } }
  | { type: 'CLEAR_CART' };

// Calculate totals helper
const calculateTotals = (items: CartItem[]): { totalItems: number; totalPrice: number } => {
  return items.reduce(
    (acc, item) => ({
      totalItems: acc.totalItems + item.quantity,
      totalPrice: acc.totalPrice + item.product.price * item.quantity,
    }),
    { totalItems: 0, totalPrice: 0 }
  );
};

// Cart reducer
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, quantity, primaryColor, secondaryColor, customNote } = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.primaryColor === primaryColor &&
          item.secondaryColor === secondaryColor &&
          item.customNote === customNote
      );

      let newItems: CartItem[];

      if (existingItemIndex > -1) {
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [...state.items, { product, quantity, primaryColor, secondaryColor, customNote }];
      }

      const totals = calculateTotals(newItems);
      return { items: newItems, ...totals };
    }

    case 'REMOVE_FROM_CART': {
      const { productId, primaryColor, secondaryColor } = action.payload;
      const newItems = state.items.filter(
        (item) => !(item.product.id === productId && item.primaryColor === primaryColor && item.secondaryColor === secondaryColor)
      );
      const totals = calculateTotals(newItems);
      return { items: newItems, ...totals };
    }

    case 'UPDATE_QUANTITY': {
      const { productId, primaryColor, secondaryColor, quantity } = action.payload;
      if (quantity <= 0) {
        const newItems = state.items.filter(
          (item) => !(item.product.id === productId && item.primaryColor === primaryColor && item.secondaryColor === secondaryColor)
        );
        const totals = calculateTotals(newItems);
        return { items: newItems, ...totals };
      }

      const newItems = state.items.map((item) =>
        item.product.id === productId && item.primaryColor === primaryColor && item.secondaryColor === secondaryColor
          ? { ...item, quantity }
          : item
      );
      const totals = calculateTotals(newItems);
      return { items: newItems, ...totals };
    }

    case 'CLEAR_CART':
      return initialState;

    default:
      return state;
  }
};

// Context type
interface CartContextType {
  cart: CartState;
  addToCart: (product: Product, quantity: number, primaryColor: string, secondaryColor: string, customNote?: string) => void;
  removeFromCart: (productId: string, primaryColor: string, secondaryColor: string) => void;
  updateQuantity: (productId: string, primaryColor: string, secondaryColor: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product: Product, quantity: number, primaryColor: string, secondaryColor: string, customNote?: string) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity, primaryColor, secondaryColor, customNote } });
  };

  const removeFromCart = (productId: string, primaryColor: string, secondaryColor: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { productId, primaryColor, secondaryColor } });
  };

  const updateQuantity = (productId: string, primaryColor: string, secondaryColor: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, primaryColor, secondaryColor, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
