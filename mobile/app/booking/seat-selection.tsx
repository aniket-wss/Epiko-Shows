import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useBooking } from '../../context/BookingContext';
import { SeatMap } from '../../components/seat/SeatMap';
import { Button } from '../../components/common/Button';

export default function SeatSelectionScreen() {
  const router = useRouter();
  const { selectedMovie, selectedShowtime, selectedSeats, setSelectedSeats } = useBooking();
  const [localSeats, setLocalSeats] = useState<string[]>(selectedSeats);

  if (!selectedMovie || !selectedShowtime) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <Text className="text-white">Please select a movie and showtime first</Text>
      </View>
    );
  }

  const handleSeatSelect = (seatId: string) => {
    if (localSeats.includes(seatId)) {
      setLocalSeats(localSeats.filter(s => s !== seatId));
    } else {
      if (localSeats.length >= 10) {
        // Max 10 seats per booking
        return;
      }
      setLocalSeats([...localSeats, seatId]);
    }
  };

  const calculateTotal = () => {
    // Simplified: assuming all seats are same price
    const seatPrice = Object.values(selectedShowtime.price_map)[0] || 0;
    return seatPrice * localSeats.length;
  };

  const handleProceedToPayment = () => {
    if (localSeats.length === 0) {
      return;
    }
    setSelectedSeats(localSeats);
    router.push('/booking/payment');
  };

  const total = calculateTotal();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1">
        {/* Movie Info Header */}
        <View className="bg-background-card p-4">
          <Text className="text-white text-lg font-bold">{selectedMovie.title}</Text>
          <Text className="text-text-secondary text-sm mt-1">
            {selectedShowtime.theatre.name}
          </Text>
          <Text className="text-text-secondary text-xs mt-1">
            {new Date(selectedShowtime.date).toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'short'
            })} • {selectedShowtime.time} • {selectedShowtime.screen_name}
          </Text>
        </View>

        {/* Seat Map */}
        <ScrollView className="flex-1 p-4">
          <SeatMap
            layout={selectedShowtime.seat_layout}
            selectedSeats={localSeats}
            onSeatSelect={handleSeatSelect}
            priceMap={selectedShowtime.price_map}
          />
        </ScrollView>

        {/* Bottom Bar */}
        <View className="bg-background-card p-4 border-t border-background">
          {localSeats.length > 0 ? (
            <>
              <View className="flex-row justify-between items-center mb-3">
                <View>
                  <Text className="text-text-secondary text-sm">
                    {localSeats.length} {localSeats.length === 1 ? 'Seat' : 'Seats'}
                  </Text>
                  <Text className="text-white text-xs mt-1">{localSeats.join(', ')}</Text>
                </View>
                <View>
                  <Text className="text-text-secondary text-sm text-right">Total</Text>
                  <Text className="text-white text-xl font-bold">₹{total}</Text>
                </View>
              </View>
              <Button
                title="Proceed to Payment"
                onPress={handleProceedToPayment}
                fullWidth
                size="large"
              />
            </>
          ) : (
            <View className="py-2">
              <Text className="text-text-secondary text-center">
                Select your seats to continue
              </Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
