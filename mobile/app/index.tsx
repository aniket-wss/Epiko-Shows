import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { MovieCard } from '../components/movie/MovieCard';
import { mockMovies } from '../utils/mockData';

export default function HomeScreen() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [selectedTab, setSelectedTab] = useState<'now_showing' | 'upcoming'>('now_showing');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isLoading && !user) {
      router.replace('/auth/login');
    }
  }, [user, isLoading]);

  const filteredMovies = mockMovies.filter(movie => {
    const matchesTab = movie.status === selectedTab;
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  if (isLoading) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <Text className="text-white">Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="px-4 py-4">
          <View className="flex-row justify-between items-center mb-4">
            <View>
              <Text className="text-text-secondary text-sm">Welcome back,</Text>
              <Text className="text-white text-xl font-bold">{user?.name || 'Guest'}</Text>
            </View>
            <TouchableOpacity
              onPress={() => router.push('/profile/wallet')}
              className="bg-background-card px-4 py-2 rounded-lg"
            >
              <Text className="text-text-secondary text-xs">Wallet</Text>
              <Text className="text-accent-gold text-lg font-bold">
                ₹{user?.wallet_balance?.toFixed(0) || 0}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View className="bg-background-card rounded-lg px-4 py-3 mb-4">
            <TextInput
              placeholder="Search movies..."
              placeholderTextColor="#6c757d"
              value={searchQuery}
              onChangeText={setSearchQuery}
              className="text-white text-base"
            />
          </View>

          {/* Tabs */}
          <View className="flex-row mb-4">
            <TouchableOpacity
              onPress={() => setSelectedTab('now_showing')}
              className={`flex-1 py-3 rounded-lg mr-2 ${
                selectedTab === 'now_showing' ? 'bg-primary' : 'bg-background-card'
              }`}
            >
              <Text
                className={`text-center font-semibold ${
                  selectedTab === 'now_showing' ? 'text-white' : 'text-text-secondary'
                }`}
              >
                Now Showing
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedTab('upcoming')}
              className={`flex-1 py-3 rounded-lg ${
                selectedTab === 'upcoming' ? 'bg-primary' : 'bg-background-card'
              }`}
            >
              <Text
                className={`text-center font-semibold ${
                  selectedTab === 'upcoming' ? 'text-white' : 'text-text-secondary'
                }`}
              >
                Coming Soon
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Movies Grid */}
        <View className="px-4 pb-6">
          <Text className="text-white text-lg font-bold mb-3">
            {selectedTab === 'now_showing' ? 'Movies in Theatres' : 'Upcoming Releases'}
          </Text>
          <View className="flex-row flex-wrap">
            {filteredMovies.map(movie => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                poster_url={movie.poster_url}
                genres={movie.genres}
                certificate={movie.certificate}
                language={movie.language}
                rating={movie.rating}
              />
            ))}
          </View>
          {filteredMovies.length === 0 && (
            <Text className="text-text-secondary text-center mt-8">
              No movies found
            </Text>
          )}
        </View>

        {/* Bottom Navigation Placeholder */}
        <View className="px-4 pb-4">
          <View className="bg-background-card rounded-lg p-4 flex-row justify-around">
            <TouchableOpacity className="items-center">
              <Text className="text-primary text-2xl">🏠</Text>
              <Text className="text-primary text-xs mt-1">Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push('/profile/bookings')}
              className="items-center"
            >
              <Text className="text-text-secondary text-2xl">🎫</Text>
              <Text className="text-text-secondary text-xs mt-1">Bookings</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push('/profile/wallet')}
              className="items-center"
            >
              <Text className="text-text-secondary text-2xl">💰</Text>
              <Text className="text-text-secondary text-xs mt-1">Wallet</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // Profile settings could go here
              }}
              className="items-center"
            >
              <Text className="text-text-secondary text-2xl">👤</Text>
              <Text className="text-text-secondary text-xs mt-1">Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
