# Epiko Shows - Ticket Booking MVP

A mobile-first ticket booking platform similar to BookMyShow, built with React Native, Node.js, and Supabase.

## Project Structure

```
epiko-shows/
├── mobile/          # React Native app (iOS & Android)
├── backend/         # Node.js + Express REST API
├── database/        # Supabase SQL schema & migrations
└── README.md
```

## Tech Stack

### Mobile App
- React Native
- React Router v7
- Context API for state management
- TailwindCSS (NativeWind)

### Backend
- Node.js + Express
- Supabase (PostgreSQL)
- JWT Authentication
- Passport.js (OAuth)

### Database
- Supabase (PostgreSQL)
- Real-time subscriptions ready

## Features

### User Features
- Browse movies (Now Showing / Coming Soon)
- Select theatre, date, and showtime
- Interactive seat selection
- Multiple payment modes (Wallet, UPI, Card)
- Wallet & loyalty points
- Booking management

### Admin Features
- Theatre & screen management
- Showtime creation
- Booking overview
- Offers & promotions

## Getting Started

### Prerequisites
- Node.js 18+
- React Native development environment
- Supabase account

### Setup

1. **Database Setup**
   ```bash
   cd database
   # Run migrations in your Supabase SQL editor
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Add your Supabase credentials
   npm run dev
   ```

3. **Mobile App Setup**
   ```bash
   cd mobile
   npm install
   cp .env.example .env
   # Add backend URL
   npm start
   ```

## Environment Variables

### Backend (.env)
```
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
JWT_SECRET=your_jwt_secret
PORT=3000
```

### Mobile (.env)
```
API_URL=http://localhost:3000
```

## License

MIT
