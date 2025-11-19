import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useBooking } from '../../context/BookingContext';
import { getShowtimesForMovie, mockTheatres } from '../../utils/mockData';

export default function TheatreSelectionScreen() {
  const router = useRouter();
  const { selectedMovie, setSelectedShowtime } = useBooking();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  if (!selectedMovie) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <Text className="text-white">Please select a movie first</Text>
      </View>
    );
  }

  const showtimes = getShowtimesForMovie(selectedMovie.id);

  // Generate next 7 days
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date.toISOString().split('T')[0];
  });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    if (dateStr === today) return 'Today';
    if (dateStr === tomorrowStr) return 'Tomorrow';

    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
  };

  const handleShowtimeSelect = (showtime: any) => {
    setSelectedShowtime(showtime);
    router.push('/booking/seat-selection');
  };

  // Group showtimes by theatre
  const theatreShowtimes = mockTheatres.map(theatre => ({
    ...theatre,
    showtimes: showtimes.filter(st => st.theatre.id === theatre.id && st.date === selectedDate)
  })).filter(t => t.showtimes.length > 0);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1">
        {/* Movie Info */}
        <View className="bg-background-card p-4">
          <Text className="text-white text-xl font-bold">{selectedMovie.title}</Text>
          <Text className="text-text-secondary text-sm mt-1">
            {selectedMovie.certificate} • {selectedMovie.duration} mins • {selectedMovie.language}
          </Text>
        </View>

        {/* Date Selection */}
        <View className="px-4 py-4">
          <Text className="text-white text-lg font-semibold mb-3">Select Date</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {dates.map(date => (
              <TouchableOpacity
                key={date}
                onPress={() => setSelectedDate(date)}
                className={`mr-3 px-6 py-3 rounded-lg ${
                  selectedDate === date ? 'bg-primary' : 'bg-background-card'
                }`}
              >
                <Text
                  className={`font-semibold ${
                    selectedDate === date ? 'text-white' : 'text-text-secondary'
                  }`}
                >
                  {formatDate(date)}
                </Text>
                <Text
                  className={`text-xs mt-1 ${
                    selectedDate === date ? 'text-white' : 'text-text-secondary'
                  }`}
                >
                  {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Theatres and Showtimes */}
        <View className="px-4 pb-6">
          <Text className="text-white text-lg font-semibold mb-3">Select Theatre & Show</Text>

          {theatreShowtimes.length === 0 ? (
            <View className="bg-background-card p-6 rounded-lg">
              <Text className="text-text-secondary text-center">
                No shows available for this date
              </Text>
            </View>
          ) : (
            theatreShowtimes.map(theatre => (
              <View key={theatre.id} className="bg-background-card p-4 rounded-lg mb-4">
                <Text className="text-white text-base font-semibold">{theatre.name}</Text>
                <Text className="text-text-secondary text-sm mb-3">{theatre.location}</Text>

                <View className="flex-row flex-wrap">
                  {theatre.showtimes.map(showtime => (
                    <TouchableOpacity
                      key={showtime.id}
                      onPress={() => handleShowtimeSelect(showtime)}
                      className="bg-background border border-primary rounded-lg px-4 py-3 mr-3 mb-3"
                      activeOpacity={0.7}
                    >
                      <Text className="text-white font-semibold text-center">
                        {showtime.time}
                      </Text>
                      <Text className="text-text-secondary text-xs text-center mt-1">
                        {showtime.screen_name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Price Info */}
                <View className="mt-2 pt-3 border-t border-background">
                  <Text className="text-text-secondary text-xs">
                    Price: ₹{Object.values(theatre.showtimes[0].price_map).join(' • ₹')}
                  </Text>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
