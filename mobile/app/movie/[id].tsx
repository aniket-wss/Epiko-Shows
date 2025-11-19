import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { getMovieById } from '../../utils/mockData';
import { useBooking } from '../../context/BookingContext';
import { Button } from '../../components/common/Button';

export default function MovieDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { setSelectedMovie } = useBooking();

  const movie = getMovieById(id as string);

  if (!movie) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <Text className="text-white">Movie not found</Text>
      </View>
    );
  }

  const handleBookTickets = () => {
    setSelectedMovie(movie);
    router.push('/booking/theatre-selection');
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1">
        {/* Movie Poster */}
        <Image
          source={{ uri: movie.poster_url }}
          className="w-full h-96"
          resizeMode="cover"
        />

        {/* Movie Info */}
        <View className="p-4">
          <Text className="text-white text-2xl font-bold mb-2">{movie.title}</Text>

          {/* Meta Info */}
          <View className="flex-row items-center mb-4 flex-wrap">
            <View className="bg-background-card px-3 py-1 rounded mr-2 mb-2">
              <Text className="text-white text-sm">{movie.certificate}</Text>
            </View>
            <View className="bg-background-card px-3 py-1 rounded mr-2 mb-2">
              <Text className="text-white text-sm">{movie.duration} mins</Text>
            </View>
            <View className="bg-background-card px-3 py-1 rounded mb-2">
              <Text className="text-white text-sm">{movie.language}</Text>
            </View>
          </View>

          {/* Genres */}
          <View className="flex-row flex-wrap mb-4">
            {movie.genres.map((genre, index) => (
              <View key={index} className="bg-primary/20 px-3 py-1 rounded-full mr-2 mb-2">
                <Text className="text-primary text-xs">{genre}</Text>
              </View>
            ))}
          </View>

          {/* Rating */}
          {movie.rating && movie.rating > 0 && (
            <View className="flex-row items-center mb-4">
              <Text className="text-accent-gold text-3xl">★</Text>
              <Text className="text-white text-2xl font-bold ml-2">{movie.rating.toFixed(1)}</Text>
              <Text className="text-text-secondary text-sm ml-1">/10</Text>
            </View>
          )}

          {/* Synopsis */}
          <View className="mb-4">
            <Text className="text-white text-lg font-semibold mb-2">Synopsis</Text>
            <Text className="text-text-secondary text-base leading-6">
              {movie.synopsis}
            </Text>
          </View>

          {/* Cast */}
          <View className="mb-4">
            <Text className="text-white text-lg font-semibold mb-2">Cast</Text>
            <Text className="text-text-secondary text-base">
              {movie.cast.join(', ')}
            </Text>
          </View>

          {/* Release Date */}
          <View className="mb-6">
            <Text className="text-white text-lg font-semibold mb-2">Release Date</Text>
            <Text className="text-text-secondary text-base">
              {new Date(movie.release_date).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </Text>
          </View>

          {/* Book Tickets Button */}
          {movie.status === 'now_showing' && (
            <Button
              title="Book Tickets"
              onPress={handleBookTickets}
              fullWidth
              size="large"
            />
          )}

          {movie.status === 'upcoming' && (
            <View className="bg-background-card p-4 rounded-lg">
              <Text className="text-center text-text-secondary">
                Tickets will be available soon
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
