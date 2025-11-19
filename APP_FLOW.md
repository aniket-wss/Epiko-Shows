# Epiko Shows - App Flow Diagram

## Screen Navigation Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         APP LAUNCH                               │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
              ┌──────────────────────┐
              │   Authentication     │
              │      Check           │
              └──────────┬───────────┘
                         │
         ┌───────────────┴───────────────┐
         ▼                               ▼
    ┌─────────┐                    ┌──────────┐
    │  Login  │◄───────────────────┤   Home   │
    └────┬────┘                    └────┬─────┘
         │                              │
         │  New User?                   │
         ▼                              │
    ┌─────────┐                         │
    │ Sign Up │                         │
    └────┬────┘                         │
         │                              │
         └──────────────┬───────────────┘
                        │
                        ▼
         ┌──────────────────────────┐
         │      HOME SCREEN         │
         │  ┌────────────────────┐  │
         │  │  Now Showing Tab   │  │
         │  │  Coming Soon Tab   │  │
         │  │  Search Bar        │  │
         │  │  Wallet Display    │  │
         │  │  Movie Grid        │  │
         │  └────────────────────┘  │
         └──────────┬───────────────┘
                    │
          ┌─────────┼──────────┬──────────┐
          ▼         ▼          ▼          ▼
     ┌────────┐ ┌────────┐ ┌──────┐ ┌────────┐
     │ Movie  │ │Bookings│ │Wallet│ │Profile │
     │Details │ │        │ │      │ │        │
     └───┬────┘ └────────┘ └──────┘ └────────┘
         │
         │ Book Tickets
         ▼
┌────────────────────────┐
│ BOOKING FLOW           │
│  ┌──────────────────┐  │
│  │ 1. Theatre       │  │
│  │    Selection     │  │
│  │    - Date        │  │
│  │    - Theatre     │  │
│  │    - Showtime    │  │
│  └────────┬─────────┘  │
│           ▼            │
│  ┌──────────────────┐  │
│  │ 2. Seat          │  │
│  │    Selection     │  │
│  │    - Interactive │  │
│  │      Seat Map    │  │
│  │    - Categories  │  │
│  └────────┬─────────┘  │
│           ▼            │
│  ┌──────────────────┐  │
│  │ 3. Payment       │  │
│  │    - Summary     │  │
│  │    - Method      │  │
│  │    - Process     │  │
│  └────────┬─────────┘  │
│           ▼            │
│  ┌──────────────────┐  │
│  │ 4. Confirmation  │  │
│  │    - QR Code     │  │
│  │    - Details     │  │
│  │    - Actions     │  │
│  └──────────────────┘  │
└────────────────────────┘
```

---

## Detailed Screen Breakdown

### 1. **Authentication Screens**

#### Login (`/auth/login`)
- Email input
- Password input
- Login button
- Link to signup
- Mock authentication (accepts any credentials)

#### Signup (`/auth/signup`)
- Full name input
- Email input
- Phone number input
- Password input
- Confirm password input
- Create account button
- Link back to login

---

### 2. **Home Screen** (`/`)

**Header:**
- Welcome message with user name
- Wallet balance card (clickable)

**Search:**
- Search bar for movies

**Tabs:**
- Now Showing
- Coming Soon

**Movie Grid:**
- Movie cards (2 columns)
- Poster, title, rating, genres
- Tap to view details

**Bottom Navigation:**
- Home (active)
- Bookings
- Wallet
- Profile

---

### 3. **Movie Details** (`/movie/[id]`)

**Content:**
- Full poster image
- Movie title
- Certificate, duration, language badges
- Genres chips
- Rating (star + number)
- Synopsis
- Cast list
- Release date

**Actions:**
- "Book Tickets" button (for now showing)
- "Tickets available soon" (for upcoming)

---

### 4. **Theatre Selection** (`/booking/theatre-selection`)

**Header:**
- Movie info card (title, certificate, duration, language)

**Date Selection:**
- Horizontal scroll of 7 days
- Today/Tomorrow labels
- Active date highlighted

**Theatres List:**
- Theatre name and location
- Available showtimes (chips)
- Screen name per showtime
- Price range display

**Actions:**
- Tap showtime → Go to seat selection

---

### 5. **Seat Selection** (`/booking/seat-selection`)

**Header:**
- Movie title
- Theatre name
- Date, time, screen

**Seat Map:**
- Screen indicator at top
- Interactive seat grid
- Row labels (A, B, C...)
- Seat numbers
- Color coding:
  - Gray: Booked
  - Green: Selected
  - Default: Available
- Aisles for spacing

**Legend:**
- Available
- Selected
- Booked

**Price Categories:**
- Shows categories and prices

**Bottom Bar:**
- Selected seats display
- Total amount
- "Proceed to Payment" button

---

### 6. **Payment** (`/booking/payment`)

**Booking Summary Card:**
- Movie title
- Theatre and location
- Date and time
- Seats list
- Screen
- Total amount
- Loyalty points to earn

**Payment Methods:**
- Wallet (shows balance)
- UPI
- Credit/Debit Card
- Radio button selection

**Action:**
- "Pay ₹XXX" button

---

### 7. **Confirmation** (`/booking/confirmation`)

**Success Indicator:**
- Green checkmark icon
- "Booking Confirmed!" message

**QR Code:**
- Large QR code for ticket
- "Show at entrance" instruction

**Booking Details Card:**
- Booking ID
- Movie
- Theatre
- Date & time
- Screen
- Seats
- Total paid

**Instructions Card:**
- Arrival time
- ID proof requirement
- QR code usage
- Outside food policy

**Actions:**
- "View My Bookings" button
- "Back to Home" button

---

### 8. **Wallet** (`/profile/wallet`)

**Balance Card:**
- Available balance (large)
- "Add Money" button
- Loyalty points display

**Transaction History:**
- List of transactions
- Type (credit/debit)
- Description
- Date & time
- Amount (+ or -)

**Add Money Modal:**
- Amount input (₹)
- Quick amount buttons (₹100, ₹200, etc.)
- "Add Money" button

---

### 9. **Bookings** (`/profile/bookings`)

**Tabs:**
- Upcoming
- Past

**Booking Cards:**
- Movie poster
- Movie title
- Theatre name
- Date, time, screen
- Seats
- Total amount

**Actions (Upcoming):**
- View Ticket
- Cancel

**Actions (Past):**
- Book Again

**Empty State:**
- Icon
- Message
- "Browse Movies" button (for upcoming tab)

---

## State Flow

```
┌──────────────────────┐
│   AuthContext        │
│  - user              │
│  - token             │
│  - login()           │
│  - signup()          │
│  - logout()          │
└──────────────────────┘

┌──────────────────────┐
│   WalletContext      │
│  - balance           │
│  - transactions      │
│  - addMoney()        │
│  - deductMoney()     │
└──────────────────────┘

┌──────────────────────┐
│   BookingContext     │
│  - selectedMovie     │
│  - selectedShowtime  │
│  - selectedSeats     │
│  - createBooking()   │
│  - clearBooking()    │
└──────────────────────┘
```

---

## Data Flow Example: Complete Booking

```
1. User taps movie card
   └─> selectedMovie set in BookingContext

2. User taps "Book Tickets"
   └─> Navigate to theatre-selection

3. User selects showtime
   └─> selectedShowtime set in BookingContext
   └─> Navigate to seat-selection

4. User selects seats
   └─> selectedSeats updated locally
   └─> On proceed: selectedSeats set in BookingContext
   └─> Navigate to payment

5. User completes payment
   └─> createBooking() called
   └─> Wallet deducted (if wallet payment)
   └─> Loyalty points added to user
   └─> Navigate to confirmation

6. Confirmation shown
   └─> QR code generated
   └─> Booking ID displayed
   └─> clearBooking() called
```

---

## Component Reusability

```
Common Components:
├─ Button
│  ├─ Primary variant
│  ├─ Secondary variant
│  ├─ Outline variant
│  ├─ Small/Medium/Large sizes
│  └─ Loading state

Movie Components:
└─ MovieCard
   ├─ Poster image
   ├─ Title
   ├─ Genres
   ├─ Rating
   └─ Tap handler

Booking Components:
└─ SeatMap
   ├─ Seat grid rendering
   ├─ Selection logic
   ├─ Booked state
   └─ Price categories
```

---

This flow ensures a smooth, intuitive user experience from browsing to booking confirmation!
