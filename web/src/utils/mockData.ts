// Mock data for development

export const mockMovies = [
  {
    id: '1',
    title: 'The Dark Universe',
    poster_url: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
    language: 'English',
    genres: ['Action', 'Sci-Fi', 'Thriller'],
    certificate: 'UA',
    duration: 150,
    synopsis: 'An epic journey through space and time as humanity fights for survival against an unknown cosmic threat. A team of astronauts must navigate through the darkest corners of the universe to save Earth from imminent destruction.',
    release_date: '2024-01-15',
    cast: ['Chris Evans', 'Zendaya', 'Idris Elba', 'Lupita Nyongo'],
    status: 'now_showing',
    rating: 8.5
  },
  {
    id: '2',
    title: 'Mumbai Nights',
    poster_url: 'https://image.tmdb.org/t/p/w500/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg',
    language: 'Hindi',
    genres: ['Drama', 'Romance'],
    certificate: 'A',
    duration: 135,
    synopsis: 'A love story set in the bustling streets of Mumbai, exploring the lives of two strangers who meet by chance and discover that fate has bigger plans for them.',
    release_date: '2024-02-01',
    cast: ['Ranbir Kapoor', 'Alia Bhatt', 'Rajkummar Rao'],
    status: 'now_showing',
    rating: 7.8
  },
  {
    id: '3',
    title: 'Cosmic Warriors',
    poster_url: 'https://image.tmdb.org/t/p/w500/5VTN0pR8gcqV3EPUHHfMGnJYN9L.jpg',
    language: 'English',
    genres: ['Action', 'Adventure', 'Fantasy'],
    certificate: 'UA',
    duration: 165,
    synopsis: 'The ultimate battle between good and evil unfolds across multiple dimensions. Heroes from different worlds must unite to defeat an ancient evil that threatens all of existence.',
    release_date: '2024-03-20',
    cast: ['Tom Holland', 'Florence Pugh', 'Benedict Cumberbatch'],
    status: 'upcoming',
    rating: 0
  },
  {
    id: '4',
    title: 'Silent Echo',
    poster_url: 'https://image.tmdb.org/t/p/w500/qJeU7KM4nT2C1WpOrwPcSDGFUWE.jpg',
    language: 'English',
    genres: ['Horror', 'Thriller'],
    certificate: 'A',
    duration: 105,
    synopsis: 'In a haunted mansion on the outskirts of town, a group of friends uncover dark secrets that should have remained buried forever.',
    release_date: '2024-01-25',
    cast: ['Anya Taylor-Joy', 'Bill Skarsgård'],
    status: 'now_showing',
    rating: 7.2
  }
];

export const mockTheatres = [
  {
    id: '1',
    name: 'PVR Cinemas - Phoenix Mall',
    location: 'Lower Parel, Mumbai',
    city: 'Mumbai'
  },
  {
    id: '2',
    name: 'INOX Megaplex',
    location: 'Inorbit Mall, Malad',
    city: 'Mumbai'
  },
  {
    id: '3',
    name: 'Cinépolis',
    location: 'Viviana Mall, Thane',
    city: 'Mumbai'
  }
];

export const mockShowtimes = [
  {
    id: '1',
    movie_id: '1',
    theatre: mockTheatres[0],
    date: new Date().toISOString().split('T')[0],
    time: '10:00',
    price_map: { gold: 250, silver: 180, normal: 150 },
    screen_name: 'Screen 1',
    seat_layout: {
      rows: [
        { row: 'A', seats: 10, category: 'gold', start: 1 },
        { row: 'B', seats: 12, category: 'gold', start: 1 },
        { row: 'C', seats: 12, category: 'silver', start: 1 },
        { row: 'D', seats: 14, category: 'silver', start: 1 },
        { row: 'E', seats: 14, category: 'silver', start: 1 },
        { row: 'F', seats: 16, category: 'normal', start: 1 },
        { row: 'G', seats: 16, category: 'normal', start: 1 }
      ],
      aisles: [2, 10],
      booked: ['A5', 'A6', 'B3', 'B4', 'C7', 'D8', 'D9', 'F12', 'F13', 'F14']
    }
  },
  {
    id: '2',
    movie_id: '1',
    theatre: mockTheatres[0],
    date: new Date().toISOString().split('T')[0],
    time: '14:00',
    price_map: { gold: 250, silver: 180, normal: 150 },
    screen_name: 'Screen 1',
    seat_layout: {
      rows: [
        { row: 'A', seats: 10, category: 'gold', start: 1 },
        { row: 'B', seats: 12, category: 'gold', start: 1 },
        { row: 'C', seats: 12, category: 'silver', start: 1 },
        { row: 'D', seats: 14, category: 'silver', start: 1 },
        { row: 'E', seats: 14, category: 'silver', start: 1 },
        { row: 'F', seats: 16, category: 'normal', start: 1 },
        { row: 'G', seats: 16, category: 'normal', start: 1 }
      ],
      aisles: [2, 10],
      booked: ['A1', 'A2', 'C5', 'D6']
    }
  },
  {
    id: '3',
    movie_id: '1',
    theatre: mockTheatres[0],
    date: new Date().toISOString().split('T')[0],
    time: '18:30',
    price_map: { gold: 300, silver: 220, normal: 180 },
    screen_name: 'Screen 2',
    seat_layout: {
      rows: [
        { row: 'A', seats: 10, category: 'gold', start: 1 },
        { row: 'B', seats: 12, category: 'gold', start: 1 },
        { row: 'C', seats: 12, category: 'silver', start: 1 },
        { row: 'D', seats: 14, category: 'silver', start: 1 },
        { row: 'E', seats: 14, category: 'silver', start: 1 },
        { row: 'F', seats: 16, category: 'normal', start: 1 },
        { row: 'G', seats: 16, category: 'normal', start: 1 }
      ],
      aisles: [2, 10],
      booked: []
    }
  },
  {
    id: '4',
    movie_id: '2',
    theatre: mockTheatres[1],
    date: new Date().toISOString().split('T')[0],
    time: '11:00',
    price_map: { platinum: 400, gold: 280, silver: 200 },
    screen_name: 'Screen 3',
    seat_layout: {
      rows: [
        { row: 'A', seats: 8, category: 'platinum', start: 1 },
        { row: 'B', seats: 8, category: 'platinum', start: 1 },
        { row: 'C', seats: 12, category: 'gold', start: 1 },
        { row: 'D', seats: 12, category: 'gold', start: 1 },
        { row: 'E', seats: 14, category: 'silver', start: 1 },
        { row: 'F', seats: 14, category: 'silver', start: 1 }
      ],
      aisles: [4, 8],
      booked: ['A3', 'A4', 'C8']
    }
  }
];

export const mockOffers = [
  {
    id: '1',
    code: 'FIRST50',
    description: 'Flat ₹50 off on your first booking',
    discount_type: 'flat',
    discount_value: 50
  },
  {
    id: '2',
    code: 'WEEKEND20',
    description: '20% off on weekend bookings',
    discount_type: 'percent',
    discount_value: 20
  },
  {
    id: '3',
    code: 'WALLET100',
    description: '₹100 cashback when you pay via wallet',
    discount_type: 'flat',
    discount_value: 100
  }
];

export const getMovieById = (id: string) => {
  return mockMovies.find(movie => movie.id === id);
};

export const getShowtimesForMovie = (movieId: string) => {
  return mockShowtimes.filter(showtime => showtime.movie_id === movieId);
};
