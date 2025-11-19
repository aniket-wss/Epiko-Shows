-- Epiko Shows Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    phone VARCHAR(20),
    role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin', 'theatre_owner')),
    wallet_balance DECIMAL(10, 2) DEFAULT 0.00,
    loyalty_points INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Movies table
CREATE TABLE movies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    poster_url TEXT,
    language VARCHAR(50),
    genres TEXT[], -- Array of genres
    certificate VARCHAR(10), -- U, UA, A, etc.
    duration INTEGER, -- in minutes
    synopsis TEXT,
    release_date DATE,
    cast TEXT[], -- Array of cast members
    status VARCHAR(20) DEFAULT 'now_showing' CHECK (status IN ('now_showing', 'upcoming', 'archived')),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Theatres table
CREATE TABLE theatres (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    location TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    admin_id UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Screens table
CREATE TABLE screens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    theatre_id UUID REFERENCES theatres(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    seat_layout JSONB NOT NULL, -- Stores seat matrix structure
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Showtimes table
CREATE TABLE showtimes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    screen_id UUID REFERENCES screens(id) ON DELETE CASCADE,
    movie_id UUID REFERENCES movies(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    time TIME NOT NULL,
    price_map JSONB NOT NULL, -- Category-wise pricing: {"gold": 200, "silver": 150}
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Seat locks table (temporary seat holds)
CREATE TABLE seat_locks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    showtime_id UUID REFERENCES showtimes(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id),
    seat_numbers TEXT[], -- Array of seat IDs like ["A1", "A2"]
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Bookings table
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    showtime_id UUID REFERENCES showtimes(id),
    seats TEXT[] NOT NULL, -- Array of seat IDs
    total_price DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'booked' CHECK (status IN ('booked', 'cancelled')),
    qr_code_url TEXT,
    points_earned INTEGER DEFAULT 0,
    points_redeemed INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Payments table
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES bookings(id),
    user_id UUID REFERENCES users(id),
    amount DECIMAL(10, 2) NOT NULL,
    mode VARCHAR(20) CHECK (mode IN ('wallet', 'upi', 'card')),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'success', 'failed')),
    transaction_ref VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Offers table
CREATE TABLE offers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    discount_type VARCHAR(20) CHECK (discount_type IN ('flat', 'percent')),
    discount_value DECIMAL(10, 2) NOT NULL,
    start_date DATE,
    end_date DATE,
    eligibility JSONB, -- Conditions like min_amount, user_type, etc.
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_movies_status ON movies(status);
CREATE INDEX idx_showtimes_date ON showtimes(date);
CREATE INDEX idx_showtimes_movie ON showtimes(movie_id);
CREATE INDEX idx_bookings_user ON bookings(user_id);
CREATE INDEX idx_seat_locks_showtime ON seat_locks(showtime_id);
CREATE INDEX idx_seat_locks_expires ON seat_locks(expires_at);

-- Function to clean expired seat locks (run via cron)
CREATE OR REPLACE FUNCTION cleanup_expired_locks()
RETURNS void AS $$
BEGIN
    DELETE FROM seat_locks WHERE expires_at < NOW();
END;
$$ LANGUAGE plpgsql;

-- Updated at trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to all tables
CREATE TRIGGER users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER movies_updated_at BEFORE UPDATE ON movies
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER theatres_updated_at BEFORE UPDATE ON theatres
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER screens_updated_at BEFORE UPDATE ON screens
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER showtimes_updated_at BEFORE UPDATE ON showtimes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER bookings_updated_at BEFORE UPDATE ON bookings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
