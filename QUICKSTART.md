# Epiko Shows - Quick Start Guide

Get the app running in 5 minutes!

## Option 1: Run Mobile App Only (Recommended for Quick Demo)

### Step 1: Install Dependencies
```bash
cd mobile
npm install
```

### Step 2: Start the App
```bash
npm start
```

### Step 3: Open on Device/Simulator
- Press `i` for iOS Simulator
- Press `a` for Android Emulator
- Scan QR code with Expo Go app on your phone

### Step 4: Login
Use any email and password (mock authentication is enabled)

**That's it!** The app is running with mock data.

---

## Option 2: Full Stack Setup (Database + Backend + Mobile)

### Prerequisites
- Node.js 18+
- Supabase account
- Expo CLI

### Step 1: Setup Database

1. Create a new Supabase project at https://supabase.com
2. Go to SQL Editor
3. Run the SQL from `database/schema.sql`
4. (Optional) Run `database/seed.sql` for sample data

### Step 2: Setup Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` and add your Supabase credentials:
```
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
JWT_SECRET=your_random_secret
PORT=3000
```

Start the backend:
```bash
npm run dev
```

### Step 3: Setup Mobile App

```bash
cd mobile
npm install
cp .env.example .env
```

Edit `.env`:
```
API_URL=http://localhost:3000/api
```

Start the app:
```bash
npm start
```

---

## Default Test Accounts (after running seed.sql)

**User Account:**
- Email: john@example.com
- Password: password123

**Admin Account:**
- Email: admin@example.com
- Password: password123

---

## App Features Tour

### 1. Browse Movies
- Home screen shows Now Showing and Coming Soon movies
- Search functionality
- Wallet balance visible at top

### 2. Book Tickets
1. Tap any movie → View details
2. Tap "Book Tickets"
3. Select date, theatre, and showtime
4. Choose seats from interactive map
5. Select payment method
6. Get QR code confirmation

### 3. Manage Wallet
- Add money using UPI/Card/Wallet
- View transaction history
- Check loyalty points

### 4. View Bookings
- See upcoming shows
- View past bookings
- Cancel tickets (before showtime)

---

## Mock Data Available

The app includes mock data for:
- 4 Movies (2 Now Showing, 2 Upcoming)
- 3 Theatres in Mumbai
- Multiple showtimes for today and tomorrow
- Pre-populated seat layouts
- Sample transactions

---

## Troubleshooting

### "Module not found" errors
```bash
cd mobile
rm -rf node_modules
npm install
```

### Expo won't start
```bash
npm install -g expo-cli
expo start --clear
```

### Backend connection issues
- Make sure backend is running on port 3000
- Check API_URL in mobile/.env
- Use your machine's IP instead of localhost if testing on physical device

### Database connection issues
- Verify Supabase credentials in backend/.env
- Check if Supabase project is active
- Ensure SQL schema has been executed

---

## Next Steps

1. **Customize**: Edit colors in `mobile/tailwind.config.js`
2. **Add Movies**: Update `mobile/utils/mockData.ts`
3. **Connect Backend**: Replace mock calls with API calls
4. **Deploy**: Use Expo EAS Build for production builds

---

## Need Help?

- Check `/mobile/README.md` for detailed documentation
- Check `/database/README.md` for database schema info
- Review the PRD in project root for feature specifications

---

Enjoy building with Epiko Shows! 🎬
