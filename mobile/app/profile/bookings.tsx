import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function BookingsScreen() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'past'>('upcoming');

  // Mock bookings data
  const mockBookings = [
    {
      id: '1',
      movie: {
        title: 'The Dark Universe',
        poster_url: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg'
      },
      theatre: {
        name: 'PVR Cinemas - Phoenix Mall',
        location: 'Lower Parel, Mumbai'
      },
      date: new Date(Date.now() + 86400000).toISOString(),
      time: '18:30',
      seats: ['A5', 'A6', 'A7'],
      total_price: 750,
      status: 'booked',
      screen_name: 'Screen 1',
      qr_code_url: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=EPIKO-1'
    },
    {
      id: '2',
      movie: {
        title: 'Mumbai Nights',
        poster_url: 'https://image.tmdb.org/t/p/w500/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg'
      },
      theatre: {
        name: 'INOX Megaplex',
        location: 'Inorbit Mall, Malad'
      },
      date: new Date(Date.now() - 172800000).toISOString(),
      time: '21:00',
      seats: ['D8', 'D9'],
      total_price: 500,
      status: 'booked',
      screen_name: 'Screen 3',
      qr_code_url: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=EPIKO-2'
    }
  ];

  const now = new Date();
  const upcomingBookings = mockBookings.filter(b => new Date(b.date) >= now);
  const pastBookings = mockBookings.filter(b => new Date(b.date) < now);

  const bookingsToShow = selectedTab === 'upcoming' ? upcomingBookings : pastBookings;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1">
        {/* Header Tabs */}
        <View className="flex-row p-4">
          <TouchableOpacity
            onPress={() => setSelectedTab('upcoming')}
            className={`flex-1 py-3 rounded-lg mr-2 ${
              selectedTab === 'upcoming' ? 'bg-primary' : 'bg-background-card'
            }`}
          >
            <Text
              className={`text-center font-semibold ${
                selectedTab === 'upcoming' ? 'text-white' : 'text-text-secondary'
              }`}
            >
              Upcoming
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedTab('past')}
            className={`flex-1 py-3 rounded-lg ${
              selectedTab === 'past' ? 'bg-primary' : 'bg-background-card'
            }`}
          >
            <Text
              className={`text-center font-semibold ${
                selectedTab === 'past' ? 'text-white' : 'text-text-secondary'
              }`}
            >
              Past
            </Text>
          </TouchableOpacity>
        </View>

        {/* Bookings List */}
        <View className="px-4 pb-6">
          {bookingsToShow.length === 0 ? (
            <View className="bg-background-card p-8 rounded-lg items-center">
              <Text className="text-4xl mb-3">🎬</Text>
              <Text className="text-white text-lg font-semibold mb-2">No bookings yet</Text>
              <Text className="text-text-secondary text-center mb-4">
                {selectedTab === 'upcoming'
                  ? 'Book your favorite movies and they will appear here'
                  : 'Your past bookings will appear here'}
              </Text>
              {selectedTab === 'upcoming' && (
                <TouchableOpacity
                  onPress={() => router.push('/')}
                  className="bg-primary px-6 py-3 rounded-lg"
                >
                  <Text className="text-white font-semibold">Browse Movies</Text>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            bookingsToShow.map(booking => (
              <View key={booking.id} className="bg-background-card rounded-lg mb-4 overflow-hidden">
                <View className="flex-row">
                  {/* Movie Poster */}
                  <Image
                    source={{ uri: booking.movie.poster_url }}
                    className="w-24 h-36"
                    resizeMode="cover"
                  />

                  {/* Booking Details */}
                  <View className="flex-1 p-4">
                    <Text className="text-white font-bold text-base mb-1">
                      {booking.movie.title}
                    </Text>
                    <Text className="text-text-secondary text-xs mb-2">
                      {booking.theatre.name}
                    </Text>

                    <View className="mb-2">
                      <Text className="text-white text-sm">
                        {formatDate(booking.date)} • {booking.time}
                      </Text>
                      <Text className="text-text-secondary text-xs mt-1">
                        {booking.screen_name}
                      </Text>
                    </View>

                    <View className="flex-row items-center mb-2">
                      <View className="bg-background px-2 py-1 rounded">
                        <Text className="text-text-secondary text-xs">
                          Seats: {booking.seats.join(', ')}
                        </Text>
                      </View>
                    </View>

                    <Text className="text-primary font-bold">₹{booking.total_price}</Text>
                  </View>
                </View>

                {/* Actions */}
                {selectedTab === 'upcoming' && (
                  <View className="border-t border-background p-3 flex-row">
                    <TouchableOpacity className="flex-1 items-center py-2">
                      <Text className="text-primary font-semibold">View Ticket</Text>
                    </TouchableOpacity>
                    <View className="w-px bg-background" />
                    <TouchableOpacity className="flex-1 items-center py-2">
                      <Text className="text-accent-danger font-semibold">Cancel</Text>
                    </TouchableOpacity>
                  </View>
                )}

                {selectedTab === 'past' && (
                  <View className="border-t border-background p-3">
                    <TouchableOpacity className="items-center py-2">
                      <Text className="text-text-secondary font-semibold">Book Again</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
