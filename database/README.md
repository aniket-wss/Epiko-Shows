# Database Schema

Supabase PostgreSQL schema for Epiko Shows.

## Setup Instructions

1. Create a new project in [Supabase](https://supabase.com)
2. Go to SQL Editor in your Supabase dashboard
3. Run `schema.sql` to create tables and indexes
4. Run `seed.sql` to populate with sample data (optional)

## Tables

### users
User accounts with authentication and wallet details

### movies
Movie catalog with metadata, cast, and release info

### theatres
Theatre locations managed by admins

### screens
Individual screens within theatres with seat layouts

### showtimes
Movie shows scheduled at specific date/time

### seat_locks
Temporary seat holds (5-minute expiry)

### bookings
Confirmed ticket bookings

### payments
Payment transaction records

### offers
Promotional codes and discounts

## Key Features

- UUID primary keys
- Automatic `updated_at` timestamps
- Indexed queries for performance
- Seat lock cleanup function
- JSONB for flexible data (seat layouts, price maps)

## Sample Credentials

Test user (from seed.sql):
- Email: `john@example.com`
- Password: `password123`

Admin user:
- Email: `admin@example.com`
- Password: `password123`

## Maintenance

Run the seat lock cleanup periodically:
```sql
SELECT cleanup_expired_locks();
```

You can set this up as a Supabase cron job or run it from your backend every minute.
