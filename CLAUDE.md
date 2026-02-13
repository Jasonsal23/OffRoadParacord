# Project: Off-Road Paracord E-commerce App

## 1. Design System (Derived from Logo)

- **Primary Green:** #5E6D54 (Sage/Olive Green)
- **Deep Forest:** #2D362E (Backgrounds/Footers)
- **Highlight Blue:** #3A78B5 (Paracord accent color)
- **Sand/Dirt:** #C2A884 (Secondary accents/buttons)
- **Text:** Off-White (#F4F4F4) for readability on dark backgrounds.

## 2. Technical Stack

- **Framework:** React Native + Expo (for seamless Web/iOS/Android support)
- **Language:** TypeScript
- **Styling:** NativeWind (Tailwind CSS for React Native)
- **State Management:** React Context API or Zustand (for Cart functionality)
- **Payments:** Stripe Integration (Standard for secure checkout)

## 3. App Architecture & File Structure

```text
/src
  /assets
    - logo.png
    - hero-loop.mp4
  /components
    - Header.tsx (Logo + Navigation)
    - HeroVideo.tsx (Video overlay + Brand text)
    - ProductCard.tsx (Individual listing)
    - Footer.tsx (Links + Policy)
  /screens
    - HomeScreen.tsx
    - ShopScreen.tsx
    - StoryScreen.tsx
    - CartScreen.tsx
  /navigation
    - TabNavigator.tsx

## 4. Key Components Implementation
A. Hero Video Overlay
Uses expo-av for the looping background.

Visuals: 2-door Jeep Wrangler and Tacoma overlanding footage.

Overlay: Position: Absolute text container with "OFF-ROAD PARACORD" in bold, heavy sans-serif.

B. Shop Functionality (7 Current Listings)
Products will include:

Front Grab Handles (Pair)

Rear Passenger Handles (Pair)

Headrest Grab Handles ...and other custom paracord accessories.

C. The Footer
Sections: - Contact: Email/Social Links.

Policies: Shipping, Returns (30-day), Terms of Service.

Accessibility: WCAG 2.1 compliance statement.

5. Implementation Roadmap (Phase 1)
Initialize Expo project with TypeScript template.

Configure NativeWind for the Olive/Forest color palette.

Build Navigation: Bottom tabs for mobile, Top-bar for Web.

Mock Product Data: Define the Product interface in TS.

Secure Checkout: Set up Stripe's Payment Sheet for mobile and Stripe Elements for web.
```
