-- Sample data for testing Epiko Shows

-- Sample users (password: "password123" - hashed with bcrypt)
INSERT INTO users (name, email, password_hash, phone, role, wallet_balance, loyalty_points) VALUES
('John Doe', 'john@example.com', '$2a$10$rXKj4bZnKJZ9YLqYqZ9YqeZqZqZqZqZqZqZqZqZqZqZqZqZqZqZq', '+919876543210', 'user', 500.00, 50),
('Theatre Admin', 'admin@example.com', '$2a$10$rXKj4bZnKJZ9YLqYqZ9YqeZqZqZqZqZqZqZqZqZqZqZqZqZqZqZq', '+919876543211', 'theatre_owner', 0.00, 0),
('Jane Smith', 'jane@example.com', '$2a$10$rXKj4bZnKJZ9YLqYqZ9YqeZqZqZqZqZqZqZqZqZqZqZqZqZqZqZq', '+919876543212', 'user', 1000.00, 120);

-- Sample movies
INSERT INTO movies (title, poster_url, language, genres, certificate, duration, synopsis, release_date, cast, status) VALUES
(
    'The Dark Universe',
    'https://image.tmdb.org/t/p/w500/sample1.jpg',
    'English',
    ARRAY['Action', 'Sci-Fi', 'Thriller'],
    'UA',
    150,
    'An epic journey through space and time as humanity fights for survival against an unknown cosmic threat.',
    '2024-01-15',
    ARRAY['Chris Evans', 'Zendaya', 'Idris Elba'],
    'now_showing'
),
(
    'Mumbai Nights',
    'https://image.tmdb.org/t/p/w500/sample2.jpg',
    'Hindi',
    ARRAY['Drama', 'Romance'],
    'A',
    135,
    'A love story set in the bustling streets of Mumbai, exploring the lives of two strangers who meet by chance.',
    '2024-02-01',
    ARRAY['Ranbir Kapoor', 'Alia Bhatt'],
    'now_showing'
),
(
    'Cosmic Warriors',
    'https://image.tmdb.org/t/p/w500/sample3.jpg',
    'English',
    ARRAY['Action', 'Adventure', 'Fantasy'],
    'UA',
    165,
    'The ultimate battle between good and evil unfolds across multiple dimensions.',
    '2024-03-20',
    ARRAY['Tom Holland', 'Florence Pugh', 'Benedict Cumberbatch'],
    'upcoming'
);

-- Sample theatre
INSERT INTO theatres (name, location, city, admin_id)
SELECT 'PVR Cinemas - Phoenix Mall', 'Lower Parel, Mumbai', 'Mumbai', id
FROM users WHERE email = 'admin@example.com';

-- Sample screens
INSERT INTO screens (theatre_id, name, seat_layout)
SELECT
    t.id,
    'Screen 1',
    '{
        "rows": [
            {"row": "A", "seats": 10, "category": "gold", "start": 1},
            {"row": "B", "seats": 12, "category": "gold", "start": 1},
            {"row": "C", "seats": 12, "category": "silver", "start": 1},
            {"row": "D", "seats": 14, "category": "silver", "start": 1},
            {"row": "E", "seats": 14, "category": "silver", "start": 1},
            {"row": "F", "seats": 16, "category": "normal", "start": 1},
            {"row": "G", "seats": 16, "category": "normal", "start": 1}
        ],
        "aisles": [2, 10]
    }'::jsonb
FROM theatres t
WHERE t.name = 'PVR Cinemas - Phoenix Mall';

INSERT INTO screens (theatre_id, name, seat_layout)
SELECT
    t.id,
    'Screen 2',
    '{
        "rows": [
            {"row": "A", "seats": 8, "category": "platinum", "start": 1},
            {"row": "B", "seats": 8, "category": "platinum", "start": 1},
            {"row": "C", "seats": 12, "category": "gold", "start": 1},
            {"row": "D", "seats": 12, "category": "gold", "start": 1},
            {"row": "E", "seats": 14, "category": "silver", "start": 1},
            {"row": "F", "seats": 14, "category": "silver", "start": 1}
        ],
        "aisles": [4, 8]
    }'::jsonb
FROM theatres t
WHERE t.name = 'PVR Cinemas - Phoenix Mall';

-- Sample showtimes for today and tomorrow
INSERT INTO showtimes (screen_id, movie_id, date, time, price_map)
SELECT
    s.id,
    m.id,
    CURRENT_DATE,
    '10:00:00',
    '{"gold": 250, "silver": 180, "normal": 150}'::jsonb
FROM screens s
CROSS JOIN movies m
WHERE s.name = 'Screen 1' AND m.title = 'The Dark Universe';

INSERT INTO showtimes (screen_id, movie_id, date, time, price_map)
SELECT
    s.id,
    m.id,
    CURRENT_DATE,
    '14:00:00',
    '{"gold": 250, "silver": 180, "normal": 150}'::jsonb
FROM screens s
CROSS JOIN movies m
WHERE s.name = 'Screen 1' AND m.title = 'The Dark Universe';

INSERT INTO showtimes (screen_id, movie_id, date, time, price_map)
SELECT
    s.id,
    m.id,
    CURRENT_DATE,
    '18:30:00',
    '{"gold": 300, "silver": 220, "normal": 180}'::jsonb
FROM screens s
CROSS JOIN movies m
WHERE s.name = 'Screen 1' AND m.title = 'Mumbai Nights';

INSERT INTO showtimes (screen_id, movie_id, date, time, price_map)
SELECT
    s.id,
    m.id,
    CURRENT_DATE,
    '21:30:00',
    '{"gold": 300, "silver": 220, "normal": 180}'::jsonb
FROM screens s
CROSS JOIN movies m
WHERE s.name = 'Screen 1' AND m.title = 'Mumbai Nights';

INSERT INTO showtimes (screen_id, movie_id, date, time, price_map)
SELECT
    s.id,
    m.id,
    CURRENT_DATE + 1,
    '11:00:00',
    '{"platinum": 400, "gold": 280, "silver": 200}'::jsonb
FROM screens s
CROSS JOIN movies m
WHERE s.name = 'Screen 2' AND m.title = 'The Dark Universe';

-- Sample offers
INSERT INTO offers (code, description, discount_type, discount_value, start_date, end_date, eligibility, active) VALUES
('FIRST50', 'Flat Rs.50 off on your first booking', 'flat', 50.00, CURRENT_DATE - 30, CURRENT_DATE + 30, '{"min_amount": 200, "first_booking": true}'::jsonb, true),
('WEEKEND20', '20% off on weekend bookings', 'percent', 20.00, CURRENT_DATE - 7, CURRENT_DATE + 30, '{"min_amount": 300, "days": ["Saturday", "Sunday"]}'::jsonb, true),
('WALLET100', 'Rs.100 cashback when you pay via wallet', 'flat', 100.00, CURRENT_DATE - 15, CURRENT_DATE + 15, '{"payment_mode": "wallet", "min_amount": 500}'::jsonb, true);

-- Sample booking
INSERT INTO bookings (user_id, showtime_id, seats, total_price, status, points_earned)
SELECT
    u.id,
    st.id,
    ARRAY['A5', 'A6'],
    500.00,
    'booked',
    50
FROM users u
CROSS JOIN showtimes st
WHERE u.email = 'john@example.com'
AND st.time = '10:00:00'
LIMIT 1;

-- Sample payment
INSERT INTO payments (booking_id, user_id, amount, mode, status, transaction_ref)
SELECT
    b.id,
    b.user_id,
    b.total_price,
    'wallet',
    'success',
    'TXN' || SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 10)
FROM bookings b
WHERE b.status = 'booked'
LIMIT 1;
