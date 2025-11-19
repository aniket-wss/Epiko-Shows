import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useBooking } from '../../context/BookingContext';
import { useWallet } from '../../context/WalletContext';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';

export default function PaymentScreen() {
  const router = useRouter();
  const { selectedMovie, selectedShowtime, selectedSeats, createBooking, clearBooking } = useBooking();
  const { balance, deductMoney } = useWallet();
  const { user, updateUser } = useAuth();
  const [selectedPaymentMode, setSelectedPaymentMode] = useState<'wallet' | 'upi' | 'card'>('wallet');
  const [loading, setLoading] = useState(false);

  if (!selectedMovie || !selectedShowtime || selectedSeats.length === 0) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <Text className="text-white">Incomplete booking details</Text>
      </View>
    );
  }

  const calculateTotal = () => {
    const seatPrice = Object.values(selectedShowtime.price_map)[0] || 0;
    return seatPrice * selectedSeats.length;
  };

  const total = calculateTotal();
  const pointsToEarn = Math.floor(total); // 1 point per rupee

  const handlePayment = async () => {
    setLoading(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (selectedPaymentMode === 'wallet') {
        if (balance < total) {
          Alert.alert('Insufficient Balance', 'Please add money to your wallet or choose another payment method.');
          setLoading(false);
          return;
        }
        await deductMoney(total);
      }

      // Award loyalty points
      if (user) {
        updateUser({
          ...user,
          loyalty_points: user.loyalty_points + pointsToEarn
        });
      }

      // Create booking
      const booking = await createBooking(selectedPaymentMode);

      // Navigate to confirmation
      router.replace({
        pathname: '/booking/confirmation',
        params: { bookingId: booking.id }
      });

      // Clear booking state
      clearBooking();
    } catch (error: any) {
      Alert.alert('Payment Failed', error.message || 'Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  const paymentModes = [
    {
      id: 'wallet' as const,
      name: 'Wallet',
      icon: '💰',
      subtitle: `Balance: ₹${balance.toFixed(0)}`,
      available: balance >= total
    },
    {
      id: 'upi' as const,
      name: 'UPI',
      icon: '📱',
      subtitle: 'Pay using UPI apps',
      available: true
    },
    {
      id: 'card' as const,
      name: 'Credit/Debit Card',
      icon: '💳',
      subtitle: 'Visa, Mastercard, Rupay',
      available: true
    }
  ];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1">
        {/* Booking Summary */}
        <View className="bg-background-card p-4 m-4 rounded-lg">
          <Text className="text-white text-lg font-bold mb-3">Booking Summary</Text>

          <View className="flex-row justify-between py-2">
            <Text className="text-text-secondary">Movie</Text>
            <Text className="text-white font-semibold">{selectedMovie.title}</Text>
          </View>

          <View className="flex-row justify-between py-2">
            <Text className="text-text-secondary">Theatre</Text>
            <Text className="text-white text-right flex-1 ml-4">
              {selectedShowtime.theatre.name}
            </Text>
          </View>

          <View className="flex-row justify-between py-2">
            <Text className="text-text-secondary">Date & Time</Text>
            <Text className="text-white">
              {new Date(selectedShowtime.date).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short'
              })} • {selectedShowtime.time}
            </Text>
          </View>

          <View className="flex-row justify-between py-2">
            <Text className="text-text-secondary">Seats</Text>
            <Text className="text-white">{selectedSeats.join(', ')}</Text>
          </View>

          <View className="flex-row justify-between py-2">
            <Text className="text-text-secondary">Screen</Text>
            <Text className="text-white">{selectedShowtime.screen_name}</Text>
          </View>

          <View className="border-t border-background my-2" />

          <View className="flex-row justify-between py-2">
            <Text className="text-white font-semibold">Total Amount</Text>
            <Text className="text-primary text-xl font-bold">₹{total}</Text>
          </View>

          <View className="bg-accent-success/20 p-3 rounded-lg mt-2">
            <Text className="text-accent-success text-sm text-center">
              🎉 You'll earn {pointsToEarn} loyalty points with this booking!
            </Text>
          </View>
        </View>

        {/* Payment Methods */}
        <View className="px-4 pb-4">
          <Text className="text-white text-lg font-bold mb-3">Select Payment Method</Text>

          {paymentModes.map(mode => (
            <TouchableOpacity
              key={mode.id}
              onPress={() => setSelectedPaymentMode(mode.id)}
              disabled={!mode.available}
              className={`bg-background-card p-4 rounded-lg mb-3 flex-row items-center ${
                !mode.available ? 'opacity-50' : ''
              }`}
            >
              <Text className="text-3xl mr-4">{mode.icon}</Text>
              <View className="flex-1">
                <Text className="text-white font-semibold">{mode.name}</Text>
                <Text className={`text-sm mt-1 ${
                  mode.id === 'wallet' && !mode.available ? 'text-accent-danger' : 'text-text-secondary'
                }`}>
                  {mode.subtitle}
                </Text>
              </View>
              <View
                className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
                  selectedPaymentMode === mode.id
                    ? 'border-primary bg-primary'
                    : 'border-text-secondary'
                }`}
              >
                {selectedPaymentMode === mode.id && (
                  <View className="w-3 h-3 bg-white rounded-full" />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Pay Button */}
      <View className="bg-background-card p-4 border-t border-background">
        <Button
          title={`Pay ₹${total}`}
          onPress={handlePayment}
          loading={loading}
          fullWidth
          size="large"
        />
      </View>
    </SafeAreaView>
  );
}
