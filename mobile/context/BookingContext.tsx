import React, { createContext, useState, useContext } from 'react';

interface Movie {
  id: string;
  title: string;
  poster_url: string;
  language: string;
  genres: string[];
  certificate: string;
  duration: number;
  synopsis: string;
  release_date: string;
  cast: string[];
  status: string;
}

interface Theatre {
  id: string;
  name: string;
  location: string;
  city: string;
}

interface Showtime {
  id: string;
  movie_id: string;
  theatre: Theatre;
  date: string;
  time: string;
  price_map: Record<string, number>;
  screen_name: string;
  seat_layout: any;
}

interface Booking {
  id: string;
  movie: Movie;
  showtime: Showtime;
  seats: string[];
  total_price: number;
  status: string;
  qr_code_url?: string;
  created_at: string;
}

interface BookingContextType {
  selectedMovie: Movie | null;
  selectedShowtime: Showtime | null;
  selectedSeats: string[];
  setSelectedMovie: (movie: Movie) => void;
  setSelectedShowtime: (showtime: Showtime) => void;
  setSelectedSeats: (seats: string[]) => void;
  clearBooking: () => void;
  createBooking: (paymentMode: string) => Promise<Booking>;
  getUserBookings: () => Promise<Booking[]>;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedShowtime, setSelectedShowtime] = useState<Showtime | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const clearBooking = () => {
    setSelectedMovie(null);
    setSelectedShowtime(null);
    setSelectedSeats([]);
  };

  const createBooking = async (paymentMode: string): Promise<Booking> => {
    if (!selectedMovie || !selectedShowtime || selectedSeats.length === 0) {
      throw new Error('Invalid booking data');
    }

    // Mock booking creation
    const booking: Booking = {
      id: Date.now().toString(),
      movie: selectedMovie,
      showtime: selectedShowtime,
      seats: selectedSeats,
      total_price: calculateTotal(),
      status: 'booked',
      qr_code_url: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=BOOKING-${Date.now()}`,
      created_at: new Date().toISOString()
    };

    return booking;
  };

  const getUserBookings = async (): Promise<Booking[]> => {
    // Mock bookings
    const mockBookings: Booking[] = [];
    return mockBookings;
  };

  const calculateTotal = (): number => {
    if (!selectedShowtime || selectedSeats.length === 0) return 0;

    // Simple calculation - assumes all seats are same price
    const seatPrice = Object.values(selectedShowtime.price_map)[0] || 0;
    return seatPrice * selectedSeats.length;
  };

  return (
    <BookingContext.Provider
      value={{
        selectedMovie,
        selectedShowtime,
        selectedSeats,
        setSelectedMovie,
        setSelectedShowtime,
        setSelectedSeats,
        clearBooking,
        createBooking,
        getUserBookings
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
