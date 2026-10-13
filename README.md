# React Native Expo Take-Home Project 🚀

A modern React Native app built with **Expo SDK & Expo Router**, fetching and displaying live data from the public [DummyJSON Products API](https://dummyjson.com/docs/products).

---

## 📱 Features

1. **List Screen (`app/(tabs)/index.tsx`)**:
   - Fetches live product data from `https://dummyjson.com/products`.
   - Real-time keyword search across products.
   - Horizontal category filter pills (All, Beauty, Fragrances, Furniture, Groceries, etc.).
   - Card layout with product image, title, brand, price discount badge, rating, and stock status.
   - Pull-to-refresh (`RefreshControl`).
   - Loading state with skeleton placeholders.
   - Error state with clear "Try Again" retry logic.
   - **"Test Error" toggle button**: Located in the top header, allowing reviewers to simulate network failures on demand and test the error state & retry flow with one tap.

2. **Detail Screen (`app/item/[id].tsx`)**:
   - Opens smoothly when tapping any product card.
   - High-resolution hero image gallery with interactive thumbnail switcher (`expo-image`).
   - Pricing section with discount percentage and original price calculation.
   - Product specifications grid (SKU, Warranty, Shipping Information, Return Policy).
   - Customer reviews section with ratings and reviewer feedback.
   - Interactive "Add to Cart" button with haptic feedback (`expo-haptics`).
   - Pull-to-refresh and full error recovery.

3. **Loading, Error & Pull-to-Refresh States**:
   - Activity indicators and skeleton mockups during data fetching.
   - Error view with descriptive messages and a "Try Again" button.
   - Native pull-to-refresh gesture supported on both List and Detail screens.

4. **Architecture & Design**:
   - Strictly typed with **TypeScript**.
   - Modular structure: separation of API service (`services/api.ts`), custom hooks (`hooks/use-products.ts`, `hooks/use-product-detail.ts`), and reusable UI components (`components/`).
   - Full dark and light theme support (`useColorScheme`).

---

## 🛠️ Prerequisites

- **Node.js** (v18 or newer recommended)
- **npm** or **yarn**
- **Expo Go** app installed on your physical iOS or Android device, OR:
  - iOS Simulator (macOS with Xcode)
  - Android Emulator (Android Studio)
  - Web browser (Chrome, Edge, Safari, Firefox)

---

## 🚀 How to Run the App

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the Expo development server**:
   ```bash
   npx expo start
   ```

3. **Open the app**:
   - **Physical Device (Fastest)**: Scan the QR code displayed in the terminal using the **Expo Go** app (Android) or **Camera** app (iOS).
   - **Android Emulator**: Press `a` in the terminal.
   - **iOS Simulator**: Press `i` in the terminal (macOS only).
   - **Web Browser**: Press `w` in the terminal to view in your web browser.

---

## 📂 Project Structure

```
├── app/
│   ├── (tabs)/
│   │   ├── _layout.tsx         # Bottom tab navigator configuration
│   │   ├── index.tsx           # (1) Products List Screen
│   │   └── explore.tsx         # App Overview & Requirements summary
│   ├── item/
│   │   └── [id].tsx            # (2) Product Detail Screen (shown on tap)
│   ├── _layout.tsx             # Root stack navigator & theme provider
│   └── modal.tsx               # Modal screen
├── components/
│   ├── product/
│   │   ├── category-filter.tsx # Horizontal category selection chips
│   │   └── product-card.tsx    # List item card with image, price & rating
│   └── ui/
│       ├── empty-view.tsx      # Empty state display
│       ├── error-view.tsx      # (3) Error screen with retry button
│       ├── loading-indicator.tsx # (3) Loading screen with skeleton
│       └── search-bar.tsx      # Search input with clear button
├── hooks/
│   ├── use-products.ts         # Hook for products fetching, search & filter
│   ├── use-product-detail.ts   # Hook for product detail fetching
│   └── use-color-scheme.ts     # Dark/light theme detection
├── services/
│   └── api.ts                  # DummyJSON API service client
└── types/
    └── product.ts              # TypeScript interfaces for products & reviews
```

---

## 🧪 Testing the Requirements

- **Pull-to-Refresh**: Drag down from the top of the list or detail screen.
- **Error State & Retry**: Tap the **"Test Error"** button in the header of the List Screen or the bug icon in the Detail Screen header, then tap **"Try Again"** to verify error handling and recovery.
- **Detail Screen**: Tap any product card to view full specifications, images, and reviews.
