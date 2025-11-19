# Epiko Shows - Mobile App

React Native mobile application for booking movie tickets.

## Features

### Implemented
- User authentication (Login/Signup)
- Movie browsing (Now Showing / Coming Soon)
- Movie details with cast, synopsis, and ratings
- Theatre and showtime selection
- Interactive seat map with real-time selection
- Multiple payment modes (Wallet, UPI, Card)
- Digital wallet with add money functionality
- Loyalty points system
- Booking management (View upcoming and past bookings)
- QR code ticket generation
- Mock payment integration

## Tech Stack

- **Framework**: React Native + Expo
- **Navigation**: Expo Router v3.5
- **Styling**: NativeWind (TailwindCSS for React Native)
- **State Management**: Context API
- **Storage**: AsyncStorage

## Project Structure

```
mobile/
├── app/                      # Expo Router screens
│   ├── _layout.tsx          # Root layout with providers
│   ├── index.tsx            # Home screen (movie list)
│   ├── auth/                # Authentication screens
│   │   ├── login.tsx
│   │   └── signup.tsx
│   ├── movie/               # Movie screens
│   │   └── [id].tsx         # Movie details
│   ├── booking/             # Booking flow screens
│   │   ├── theatre-selection.tsx
│   │   ├── seat-selection.tsx
│   │   ├── payment.tsx
│   │   └── confirmation.tsx
│   └── profile/             # User profile screens
│       ├── wallet.tsx
│       └── bookings.tsx
├── components/              # Reusable components
│   ├── common/             # Common UI components
│   ├── movie/              # Movie-specific components
│   ├── booking/            # Booking components
│   └── seat/               # Seat map components
├── context/                # Context API providers
│   ├── AuthContext.tsx
│   ├── WalletContext.tsx
│   └── BookingContext.tsx
├── utils/                  # Utilities
│   └── mockData.ts        # Mock data for development
└── services/              # API services (future)
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS) or Android Emulator (for Android)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Run on platform:
```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## User Flows

### 1. Authentication Flow
Login/Signup → Home Screen

**Demo credentials**: Use any email and password (mock auth)

### 2. Movie Booking Flow
1. Browse movies on home screen
2. Select a movie → View details
3. Click "Book Tickets"
4. Select theatre, date, and showtime
5. Select seats from interactive seat map
6. Choose payment method
7. Complete payment
8. View confirmation with QR code

### 3. Wallet Management
1. Navigate to wallet from home or bottom nav
2. View balance and loyalty points
3. Add money using quick amounts or custom amount
4. View transaction history

### 4. Booking Management
1. Navigate to bookings from bottom nav
2. View upcoming/past bookings
3. View ticket details
4. Cancel booking (upcoming only)

## Mock Data

The app currently uses mock data from `utils/mockData.ts`:
- 4 sample movies
- 3 theatres in Mumbai
- Multiple showtimes
- Pre-populated seat layouts with some booked seats

## Features to Connect (Backend Integration)

When backend is ready, replace mock calls in:
- `context/AuthContext.tsx` - login, signup
- `context/WalletContext.tsx` - transactions, add money
- `context/BookingContext.tsx` - create booking, get bookings
- `utils/mockData.ts` - fetch from API instead

## Environment Variables

Create a `.env` file:
```
API_URL=http://localhost:3000/api
```

## Design System

### Colors
- Primary: #e74c3c (Red)
- Background: #1a1a2e (Dark Blue)
- Card Background: #0f3460
- Success: #28a745
- Gold (Loyalty): #ffd700

### Typography
- System default fonts
- Bold for headings
- Regular for body text

## Known Issues

- Backend integration pending
- Real payment gateway not integrated (using mock)
- Push notifications not implemented
- Offline mode not available

## Next Steps

1. Connect to backend APIs
2. Implement real payment gateway (Razorpay recommended)
3. Add push notifications for booking reminders
4. Implement ticket cancellation flow
5. Add social sharing for bookings
6. Implement reviews and ratings

## License

MIT
