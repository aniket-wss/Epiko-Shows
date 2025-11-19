import React from 'react';
import { View, Text, ScrollView, SafeAreaView, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useBooking } from '../../context/BookingContext';
import { Button } from '../../components/common/Button';

export default function BookingConfirmationScreen() {
  const router = useRouter();
  const { bookingId } = useLocalSearchParams();
  const { selectedMovie, selectedShowtime, selectedSeats } = useBooking();

  // Mock booking data (in real app, fetch using bookingId)
  const booking = {
    id: bookingId || Date.now().toString(),
    qr_code_url: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=EPIKO-${bookingId}`,
    created_at: new Date().toISOString()
  };

  const calculateTotal = () => {
    if (!selectedShowtime) return 0;
    const seatPrice = Object.values(selectedShowtime.price_map)[0] || 0;
    return seatPrice * selectedSeats.length;
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1">
        {/* Success Message */}
        <View className="items-center py-8">
          <View className="w-20 h-20 bg-accent-success rounded-full items-center justify-center mb-4">
            <Text className="text-white text-4xl">✓</Text>
          </View>
          <Text className="text-white text-2xl font-bold mb-2">Booking Confirmed!</Text>
          <Text className="text-text-secondary text-center px-8">
            Your tickets have been booked successfully
          </Text>
        </View>

        {/* QR Code */}
        <View className="items-center mb-6">
          <View className="bg-white p-4 rounded-lg">
            <Image
              source={{ uri: booking.qr_code_url }}
              className="w-64 h-64"
              resizeMode="contain"
            />
          </View>
          <Text className="text-text-secondary text-sm mt-3">
            Show this QR code at the theatre entrance
          </Text>
        </View>

        {/* Booking Details */}
        <View className="bg-background-card p-4 mx-4 rounded-lg mb-4">
          <Text className="text-white text-lg font-bold mb-4">Booking Details</Text>

          <View className="flex-row justify-between py-2 border-b border-background">
            <Text className="text-text-secondary">Booking ID</Text>
            <Text className="text-white font-mono">{booking.id.slice(-8)}</Text>
          </View>

          {selectedMovie && (
            <View className="flex-row justify-between py-2 border-b border-background">
              <Text className="text-text-secondary">Movie</Text>
              <Text className="text-white font-semibold">{selectedMovie.title}</Text>
            </View>
          )}

          {selectedShowtime && (
            <>
              <View className="flex-row justify-between py-2 border-b border-background">
                <Text className="text-text-secondary">Theatre</Text>
                <Text className="text-white text-right flex-1 ml-4">
                  {selectedShowtime.theatre.name}
                </Text>
              </View>

              <View className="flex-row justify-between py-2 border-b border-background">
                <Text className="text-text-secondary">Date & Time</Text>
                <Text className="text-white">
                  {new Date(selectedShowtime.date).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })} • {selectedShowtime.time}
                </Text>
              </View>

              <View className="flex-row justify-between py-2 border-b border-background">
                <Text className="text-text-secondary">Screen</Text>
                <Text className="text-white">{selectedShowtime.screen_name}</Text>
              </View>
            </>
          )}

          <View className="flex-row justify-between py-2 border-b border-background">
            <Text className="text-text-secondary">Seats</Text>
            <Text className="text-white font-semibold">{selectedSeats.join(', ')}</Text>
          </View>

          <View className="flex-row justify-between py-2 border-b border-background">
            <Text className="text-text-secondary">Number of Tickets</Text>
            <Text className="text-white">{selectedSeats.length}</Text>
          </View>

          <View className="flex-row justify-between py-3 mt-2">
            <Text className="text-white font-bold text-lg">Total Paid</Text>
            <Text className="text-primary text-xl font-bold">₹{calculateTotal()}</Text>
          </View>
        </View>

        {/* Instructions */}
        <View className="bg-background-card p-4 mx-4 rounded-lg mb-6">
          <Text className="text-white font-semibold mb-2">Important Instructions</Text>
          <Text className="text-text-secondary text-sm leading-5 mb-2">
            • Please arrive at the theatre 15 minutes before showtime
          </Text>
          <Text className="text-text-secondary text-sm leading-5 mb-2">
            • Carry a valid ID proof for verification
          </Text>
          <Text className="text-text-secondary text-sm leading-5 mb-2">
            • Show the QR code at the entrance for entry
          </Text>
          <Text className="text-text-secondary text-sm leading-5">
            • Outside food and beverages are not allowed
          </Text>
        </View>

        {/* Action Buttons */}
        <View className="px-4 pb-6">
          <Button
            title="View My Bookings"
            onPress={() => router.replace('/profile/bookings')}
            fullWidth
            size="large"
            variant="primary"
          />
          <View className="mt-3">
            <Button
              title="Back to Home"
              onPress={() => router.replace('/')}
              fullWidth
              size="large"
              variant="outline"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
