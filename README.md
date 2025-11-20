Epiko Shows - Ticket Booking MVP

Epiko Shows is a mobile-first movie ticket booking application designed for a seamless user experience. It features real-time seat selection, wallet integration, and a loyalty rewards system.

🚀 Tech Stack

Frontend: React (Mobile-First Design), Tailwind CSS, Lucide React Icons

Backend: Node.js, Express.js

Database: PostgreSQL (Supabase)

Authentication: JWT & Bcrypt (Mocked in prototype, ready for Supabase Auth)

✨ Key Features

🎬 Discovery: Browse "Now Showing" and "Upcoming" movies with filters.

💺 Seat Selection: Interactive seat map with "Available", "Sold", and "Selected" states.

💳 Payments: Integrated Mock Payment Gateway (Credit Card & Wallet).

🎟️ Booking Management: QR Code generation for tickets.

💰 Wallet & Loyalty: Add funds and redeem loyalty points for rewards.

🎫 Coupons: Apply promo codes (e.g., WELCOME50, BLOCKBUSTER).

📂 Project Structure

├── client/              # Frontend Application
│   ├── src/
│   │   └── App.jsx      # Main Application Logic (Single File Prototype)
│   └── package.json
├── server/              # Backend API
│   ├── server.js        # Express Server & API Endpoints
│   └── package.json
└── database/
    └── schema.sql       # Supabase/PostgreSQL Database Schema


🛠️ Setup Instructions

Prerequisites

Node.js (v16+)

npm or yarn

A Supabase project (for the backend)

1. Database Setup

Go to your Supabase Dashboard.

Open the SQL Editor.

Copy and paste the content of database/schema.sql and run it to create the tables.

2. Backend Setup

cd server
npm install express cors helmet dotenv @supabase/supabase-js bcryptjs jsonwebtoken express-validator
# Create a .env file with SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
node server.js


3. Frontend Setup

cd client
npm install react react-dom lucide-react tailwindcss
npm start


🛡️ API Endpoints

POST /auth/login - User login

GET /movies - Fetch all movies

GET /theatres - Fetch theatres

POST /seats/lock - Lock seats temporarily

POST /booking - Confirm booking

📝 License

Copyright © 2025 Wharf Street Studios. All rights reserved.